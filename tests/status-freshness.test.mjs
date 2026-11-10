import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { freshness, observationWindow, renderFreshness } from '../assets/js/status-freshness.mjs';

const checked = '2026-11-11T00:00:00.000Z';
const begin = Date.parse(checked);

test('记录只有在有效时间窗内才标为新鲜，边界即过期', () => {
  assert.equal(freshness(checked, begin).state, 'fresh');
  assert.equal(freshness(checked, begin + 3_599_999).state, 'fresh');
  assert.equal(freshness(checked, begin + 3_600_000).state, 'expired');
  assert.match(freshness(checked, begin + 4 * 3_600_000).text, /当前状态未知/);
});

test('缺失、无效或未来时间不能声称正常', () => {
  for (const stamp of [undefined, null, '', 'invalid', '0', '2026-11-11T01:00:00Z']) {
    assert.equal(freshness(stamp, begin).state, 'unknown');
  }
});

test('JSON 有效期与网页阈值相同', () => {
  const window = observationWindow(checked);
  assert.equal(window.expires_at, '2026-11-11T01:00:00.000Z');
  assert.equal(window.max_age_seconds, 3600);
  assert.equal(window.status_scope, 'observation_at_checked_at');
  assert.equal(freshness(checked, Date.parse(window.expires_at)).state, 'expired');
});

test('页面长时间打开后也会转为过期', () => {
  const element = { dataset: { statusCheckedAt: checked }, textContent: '' };
  renderFreshness([element], begin);
  assert.equal(element.dataset.freshness, 'fresh');
  renderFreshness([element], begin + 3_600_000);
  assert.equal(element.dataset.freshness, 'expired');
  assert.match(element.textContent, /历史探测结果/);
});

test('首页与状态页都提供不依赖脚本的历史结果说明', async () => {
  for (const file of ['index.md', 'status.md']) {
    const body = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    assert.match(body, /data-status-checked-at/);
    assert.match(body, /时效未核验/);
    assert.match(body, /status-freshness\.mjs/);
    assert.doesNotMatch(body, /当前状态：\s*\{\{/);
  }
});
