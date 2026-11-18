import { freshness, observationWindow } from '../../assets/js/status-freshness.mjs';

const targets = [
  ['website', 'https://www.aifast.hk/', [200], 'text/html'],
  ['docs', 'https://api.aifast.hk/', [200], 'text/html'],
  ['models', 'https://www.aifast.hk/v1/models', [200, 401, 403], 'application/json'],
];
const key = 'latest-v1';
const archiveUrl = 'https://kkwang4444.github.io/api-status/data/status.json';

export async function checkArchive(request = fetch, now = Date.now) {
  try {
    const r = await request(archiveUrl, { redirect: 'error', signal: AbortSignal.timeout(8000), cache: 'no-store' });
    if (!r.ok) throw Error('存档无法读取');
    const data = await r.json();
    const state = freshness(data.checked_at, now()).state;
    if (state === 'unknown' || data.expires_at !== observationWindow(data.checked_at).expires_at) throw Error('存档日期无效');
    return { state, checked_at: data.checked_at, expires_at: data.expires_at };
  } catch { return { state: 'unknown', checked_at: null, expires_at: null }; }
}

export async function observe(store, request = fetch, now = Date.now) {
  const prior = await store.get(key, 'json');
  const [github_archive, components] = await Promise.all([checkArchive(request, now), Promise.all(targets.map(async ([id, url, expected, mime]) => {
    const start = now();
    try {
      const r = await request(url, { redirect: 'error', signal: AbortSignal.timeout(12000) });
      const content_type = (r.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
      await r.body?.cancel();
      return { id, status: r.status, content_type, ok: expected.includes(r.status) && content_type === mime, elapsed_ms: now() - start };
    } catch {
      return { id, status: null, ok: false, elapsed_ms: now() - start };
    }
  }))]);
  const checked_at = new Date(now()).toISOString();
  const overall = components.every(c => c.ok);
  const record = { source: 'cloudflare-cron', checked_at, ...observationWindow(checked_at), status: overall ? 'operational' : 'degraded', overall, components, github_archive };
  if (prior && Date.parse(prior.checked_at) >= Date.parse(checked_at)) return;
  if (prior && freshness(prior.checked_at, now()).state !== 'fresh') console.warn('HK 公共探测曾超过 60 分钟没有新记录', prior.checked_at, checked_at);
  if (github_archive.state !== 'fresh' && github_archive.state !== prior?.github_archive?.state) console.warn('GitHub 状态存档过期或不可读，不等于 HK API 故障', github_archive);
  await store.put(key, JSON.stringify(record));
}

export function publicResult(record, now = Date.now()) {
  if (record?.source !== 'cloudflare-cron' || freshness(record.checked_at, now).state !== 'fresh' ||
      record.expires_at !== observationWindow(record.checked_at).expires_at || typeof record.overall !== 'boolean' ||
      record.status !== (record.overall ? 'operational' : 'degraded') ||
      !Array.isArray(record.components) || record.components.length !== targets.length ||
      !targets.every(([id]) => record.components.some(c => c?.id === id && typeof c.ok === 'boolean')) ||
      record.overall !== record.components.every(c => c.ok)) {
    return { status: 'unknown', overall: null, last_checked_at: record?.checked_at ?? null };
  }
  return record;
}

export default {
  scheduled(_event, env, ctx) { ctx.waitUntil(observe(env.SNAPSHOTS)); },
  async fetch(req, env) {
    const path = new URL(req.url).pathname;
    if (!['/status.json', '/health'].includes(path)) return new Response(null, { status: 404 });
    if (!['GET', 'HEAD'].includes(req.method)) return new Response(null, { status: 405, headers: { Allow: 'GET, HEAD' } });
    let result;
    try { result = publicResult(await env.SNAPSHOTS.get(key, 'json')); } catch { result = publicResult(null); }
    const fresh = result.status !== 'unknown';
    const body = path === '/health' ? { fresh, checked_at: result.checked_at ?? result.last_checked_at } : result;
    const headers = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex', 'access-control-allow-origin': '*' };
    return new Response(req.method === 'HEAD' ? null : JSON.stringify(body), { status: fresh ? 200 : 503, headers });
  },
};
