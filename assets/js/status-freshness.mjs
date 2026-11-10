export const MAX_AGE_SECONDS = 3600;

export function observationWindow(checkedAt) {
  return {
    max_age_seconds: MAX_AGE_SECONDS,
    expires_at: new Date(Date.parse(checkedAt) + MAX_AGE_SECONDS * 1000).toISOString(),
    status_scope: 'observation_at_checked_at',
  };
}

export function freshness(checkedAt, now = Date.now()) {
  const checked = typeof checkedAt === 'string' && /^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:\d{2})$/.test(checkedAt)
    ? Date.parse(checkedAt) : NaN;
  if (!Number.isFinite(checked) || !Number.isFinite(now) || checked > now) {
    return { state: 'unknown', text: '记录时间无效或在未来，当前状态未知。' };
  }
  if (now - checked >= MAX_AGE_SECONDS * 1000) {
    return { state: 'expired', text: '记录已过期（超过 60 分钟），当前状态未知；下方仅为历史探测结果。' };
  }
  return { state: 'fresh', text: '记录在最近 60 分钟内；仅代表记录时点的公共边缘探测，不保证此刻或所有模型可用。' };
}

export function renderFreshness(elements, now = Date.now()) {
  for (const element of elements) {
    const result = freshness(element.dataset.statusCheckedAt, now);
    element.dataset.freshness = result.state;
    element.textContent = result.text;
  }
}

if (typeof document !== 'undefined') {
  const elements = document.querySelectorAll('[data-status-checked-at]');
  renderFreshness(elements);
  if (elements.length) setInterval(() => renderFreshness(elements), 60_000);
}
