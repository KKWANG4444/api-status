#!/usr/bin/env node
/** Probe public edge reachability only; never sends an API key. */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const output = resolve(root, 'data/status.json');
const renderedData = resolve(root, '_data/status.json');
const checks = [
  { id: 'website', name: 'Website', url: 'https://www.aifast.hk/', expected: [200] },
  { id: 'docs', name: 'API documentation', url: 'https://api.aifast.hk/', expected: [200] },
  { id: 'models', name: 'OpenAI-compatible models endpoint', url: 'https://www.aifast.hk/v1/models', expected: [200, 401, 403] },
];

const started = Date.now();
async function probe(item) {
  const begin = Date.now();
  try {
    const response = await fetch(item.url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000) });
    const contentType = response.headers.get('content-type') || '';
    const ok = item.expected.includes(response.status);
    return { id: item.id, name: item.name, url: item.url, ok, status: response.status, elapsed_ms: Date.now() - begin, content_type: contentType, detail: ok ? 'Expected public edge response' : 'Unexpected HTTP status' };
  } catch (error) {
    return { id: item.id, name: item.name, url: item.url, ok: false, status: null, elapsed_ms: Date.now() - begin, content_type: '', detail: `${error.name}: ${error.message}`.slice(0, 240) };
  }
}

const components = await Promise.all(checks.map(probe));
const failed = components.filter((item) => !item.ok).length;
const result = {
  status: failed === 0 ? 'operational' : 'degraded',
  checked_at: new Date().toISOString(),
  duration_ms: Date.now() - started,
  overall: failed === 0,
  components,
  methodology_url: 'https://kkwang4444.github.io/api-status/status/',
  limitations: 'Public edge reachability only; this does not measure every model, account quota, latency SLA, or provider health.',
};
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`);
await mkdir(dirname(renderedData), { recursive: true });
await writeFile(renderedData, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ status: result.status, checked_at: result.checked_at, failed }));
