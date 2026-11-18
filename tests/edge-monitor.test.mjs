import test from 'node:test';
import assert from 'node:assert/strict';
import worker, { observe, publicResult, checkArchive } from '../_ops/edge-monitor/worker.mjs';
import { summarize } from '../assets/js/edge-observation.mjs';

const ts = Date.parse('2026-11-18T12:00:00Z');
async function sample(models = [401, 'application/json']) {
  let record;
  const urls = [];
  const store = { get: async () => null, put: async (_, v) => { record = JSON.parse(v); } };
  await observe(store, async (url, options) => {
    if (url === 'https://kkwang4444.github.io/api-status/data/status.json') return Response.json({ checked_at: '2026-11-18T12:00:00.000Z', expires_at: '2026-11-18T13:00:00.000Z' });
    urls.push(url);
    assert.equal(options.headers, undefined);
    assert.equal(options.redirect, 'error');
    const [status, type] = url.endsWith('/v1/models') ? models : [200, 'text/html'];
    return new Response('', { status, headers: { 'content-type': type } });
  }, () => ts);
  assert.deepEqual(urls, ['https://www.aifast.hk/', 'https://api.aifast.hk/', 'https://www.aifast.hk/v1/models']);
  return record;
}

test('固定匿名入口：鉴权 JSON 是边缘响应，HTML 拦截页不是', async () => {
  assert.equal(publicResult(await sample(), ts).status, 'operational');
  assert.equal(publicResult(await sample([403, 'text/html']), ts).status, 'degraded');
});
test('独立检查能识别 GitHub 空窗，不把过期存档或读取失败算成站点故障', async () => {
  const r = await checkArchive(async () => Response.json({ checked_at: '2026-11-18T10:00:00.000Z', expires_at: '2026-11-18T11:00:00.000Z' }), () => ts);
  assert.equal(r.state, 'expired');
  assert.equal((await checkArchive(async () => new Response(null, { status: 502 }), () => ts)).state, 'unknown');
  assert.equal((await sample()).github_archive.state, 'fresh');
});
test('60 分钟边界、未来时间、伪造有效期与缺少组件均不能返回正常', async () => {
  const r = await sample();
  for (const t of [ts - 1, ts + 3600000]) assert.equal(publicResult(r, t).overall, null);
  assert.equal(publicResult({ ...r, expires_at: '2099' }, ts).status, 'unknown');
  assert.equal(publicResult({ ...r, components: [] }, ts).status, 'unknown');
});
test('公网请求只读：存储异常返回未知，外部请求不能启动探测', async () => {
  const env = { SNAPSHOTS: { get: async () => { throw Error('offline'); } } };
  const req = (p, method='GET') => worker.fetch(new Request(`https://example.test${p}`, { method }), env);
  assert.equal((await req('/health')).status, 503);
  assert.equal((await (await req('/status.json')).json()).status, 'unknown');
  assert.equal((await req('/status.json', 'POST')).status, 405);
  assert.equal((await req('/run')).status, 404);
});

test('状态页按来源与时效显示，不把旧 GitHub 存档用作独立观测', async () => {
  const sampleRecord = await sample();
  assert.match(summarize(sampleRecord, ts), /三个入口当次均按预期响应/);
  assert.match(summarize(await sample([403, 'text/html']), ts), /当次至少一个入口异常/);
  for (const r of [null, { ...sampleRecord, source: 'github-actions-archive' }, { ...sampleRecord, expires_at: '2099' }]) assert.match(summarize(r, ts), /未知/);
  assert.match(summarize(sampleRecord, ts + 3600000), /未知/);
});
test('调度实际写入的记录可由只读接口取回；时效健康不表示组件全部成功', async () => {
  const rec = await sample([403, 'text/html']);
  const iso = new Date().toISOString();
  const env = { SNAPSHOTS: { get: async () => ({ ...rec, checked_at: iso, expires_at: new Date(Date.parse(iso) + 3600000).toISOString() }) } };
  const read = (p) => worker.fetch(new Request(`https://example.test${p}`), env);
  assert.equal((await (await read('/status.json')).json()).status, 'degraded');
  assert.equal((await (await read('/health')).json()).fresh, true);
  assert.equal((await read('/status.json')).headers.get('cache-control'), 'no-store');
});
