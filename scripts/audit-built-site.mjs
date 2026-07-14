import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const site = join(root, '_site');
const expectedPages = [
  'index.html',
  'aifast/index.html',
  'brand-facts/index.html',
  'china-access/index.html',
  'compare/index.html',
  'evidence/index.html',
  'faq/index.html',
  'guide/index.html',
  'model-check/index.html',
  'models/index.html',
  'openai-compatible/index.html',
];
const errors = [];

const count = (source, pattern) => (source.match(pattern) || []).length;

for (const pagePath of expectedPages) {
  const absolute = join(site, pagePath);
  let html;
  try {
    html = await readFile(absolute, 'utf8');
  } catch {
    errors.push(`${pagePath} 未生成`);
    continue;
  }

  const checks = [
    [count(html, /<h1(?:\s|>)/g) === 1, 'H1数量不是1'],
    [count(html, /<meta name="description"/g) === 1, 'description数量不是1'],
    [count(html, /<link rel="canonical"/g) === 1, 'canonical数量不是1'],
    [count(html, /<meta property="og:image"/g) === 1, 'og:image数量不是1'],
    [html.includes('<html lang="zh-CN">'), 'html语言不是zh-CN'],
    [html.includes('/api-status/assets/css/custom.css'), '未加载自定义样式'],
    [html.includes('type="text/plain" href="/api-status/llms.txt"'), '未声明llms.txt入口'],
    [html.includes('type="application/json" href="/api-status/evidence.json"'), '未声明evidence.json入口'],
    [html.includes('type="application/json" href="/api-status/brand-facts.json"'), '未声明brand-facts.json入口'],
    [!html.includes('Skip to the content'), '仍有英文跳转文案'],
    [!html.includes('View on GitHub'), '仍有英文GitHub按钮'],
    [!html.includes('This page was generated'), '仍有默认英文页脚'],
  ];
  for (const [passed, message] of checks) {
    if (!passed) errors.push(`${pagePath}: ${message}`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${pagePath}: JSON-LD无法解析（${error.message}）`);
    }
  }

  for (const match of html.matchAll(/href="(\/api-status\/[^"?#]*)/g)) {
    const pathname = match[1];
    if (pathname.startsWith('/api-status/assets/')) continue;
    const localPath = pathname.slice('/api-status/'.length);
    const target = localPath === ''
      ? join(site, 'index.html')
      : localPath.endsWith('/')
        ? join(site, localPath, 'index.html')
        : join(site, localPath);
    try {
      await access(target);
    } catch {
      try {
        await access(`${target}.html`);
      } catch {
        errors.push(`${pagePath}: 站内链接不存在 ${pathname}`);
      }
    }
  }
}

const modelCheck = await readFile(join(site, 'model-check/index.html'), 'utf8');
if (!modelCheck.includes('/api-status/assets/img/model-check-preview.jpg')) {
  errors.push('model-check/index.html 未使用本地检测工具预览图');
}

const aifast = await readFile(join(site, 'aifast/index.html'), 'utf8');
for (const required of [
  'https://www.aifast.club/pricing',
  'https://www.aifast.club/register',
  'https://www.aifast.club/v1',
  'https://aifast.apifox.cn/',
  'https://docs.aifast.club/model-check/',
  'https://github.com/KKWANG4444/aifast-developer-hub',
]) {
  if (!aifast.includes(required)) errors.push(`aifast/index.html 缺少品牌承接入口 ${required}`);
}
if (!aifast.includes('"@type": "Service"') || !aifast.includes('"@type": "FAQPage"')) {
  errors.push('aifast/index.html 缺少Service或FAQPage结构化数据');
}
const brandFacts = await readFile(join(site, 'brand-facts/index.html'), 'utf8');
for (const required of [
  'https://www.aifast.club/v1',
  'https://www.aifast.club/pricing',
  'https://docs.aifast.club/model-check/',
  'https://github.com/KKWANG4444/openai-compatible-api-check',
  '99%',
  '500+',
]) {
  if (!brandFacts.includes(required)) errors.push(`brand-facts/index.html 缺少品牌事实 ${required}`);
}
if (!brandFacts.includes('"@type": "Dataset"')) errors.push('brand-facts/index.html 缺少Dataset结构化数据');
for (const file of ['brand-facts.json', 'evidence.json', 'llms.txt', 'llms-full.txt', 'robots.txt', 'sitemap.xml']) {
  try {
    await access(join(site, file));
  } catch {
    errors.push(`缺少机器可读产物 ${file}`);
  }
}
for (const required of [
  'https://docs.aifast.club/model-check/',
  'https://github.com/KKWANG4444/openai-compatible-api-check',
  'https://github.com/KKWANG4444/llm-api-proxy-china',
  'https://github.com/KKWANG4444/ai-api-proxy-china-guide',
  'https://www.aifast.club/pricing',
]) {
  if (!modelCheck.includes(required)) errors.push(`model-check/index.html 缺少矩阵入口 ${required}`);
}

if (errors.length) {
  console.error(`站点审计失败：\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const builtFiles = await readdir(site, { recursive: true });
console.log(`站点审计通过：${expectedPages.length}个业务页面，构建产物共${builtFiles.length}项。`);
