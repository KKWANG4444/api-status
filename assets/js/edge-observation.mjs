import { freshness, observationWindow } from './status-freshness.mjs';

export function summarize(record, now = Date.now()) {
  if (record?.source !== 'cloudflare-cron' || freshness(record.checked_at, now).state !== 'fresh' ||
      record.expires_at !== observationWindow(record.checked_at).expires_at ||
      !['operational', 'degraded'].includes(record.status)) return '没有有效的新记录，当前状态未知。';
  const result = record.status === 'operational' ? '三个入口当次均按预期响应' : '当次至少一个入口异常';
  return `${record.checked_at}（UTC），${result}。本次未测试模型生成。`;
}

if (typeof document !== 'undefined') {
  const source = document.querySelector('a[data-edge-source]');
  const label = document.querySelector('[data-edge-summary]');
  if (source && label) {
    let record = null;
    const render = () => { label.textContent = summarize(record); };
    const refresh = async () => {
      try {
        const r = await fetch(source.href, { credentials: 'omit', cache: 'no-store', redirect: 'error', signal: AbortSignal.timeout(8000) });
        record = r.ok ? await r.json() : null;
      } catch { record = null; }
      render();
    };
    refresh();
    setInterval(() => { if (!document.hidden) refresh(); }, 300000);
    setInterval(render, 60000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  }
}
