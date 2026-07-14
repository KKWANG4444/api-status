---
layout: default
title: 大模型API检测、状态与OpenAI Compatible接入
description: 提供大模型API中转站检测、OpenAI-compatible迁移、401/429/5xx排错、客户端配置、模型目录与维护证据，帮助开发者先验证接口再接入生产。
permalink: /
hero_title: AI API 状态、检测与接入参考
keywords: AI API中转站,大模型API,模型状态,OpenAI Compatible API,Claude API,GPT API,Gemini API,DeepSeek API,模型检测
---

本项目由AI快站运营方维护，集中整理大模型API中转站检测、OpenAI-compatible迁移、生产排错、客户端配置与模型维护证据。先按问题选择入口，再用临时Key和真实业务题集验证接口，不把目录配置或单次成功直接当作长期可用结论。

## 按问题进入开发者矩阵

<div class="matrix-grid">
  <a class="matrix-card" href="/api-status/model-check/"><small>检测</small><strong>中转站模型与协议检测</strong><span>核对响应模型、Token、随机动态题、SSE和工具调用，辅助排查降智、套壳或兼容层问题。</span><em>查看检测方法 →</em></a>
  <a class="matrix-card" href="https://github.com/KKWANG4444/openai-compatible-api-check"><small>开源工具</small><strong>CLI、Postman 与 CI 冒烟测试</strong><span>不安装第三方依赖，把随机nonce和接口结构检查放进本地或持续集成流程。</span><em>查看 GitHub 仓库 →</em></a>
  <a class="matrix-card" href="/api-status/openai-compatible/"><small>排错</small><strong>OpenAI-compatible 迁移</strong><span>逐项处理401、model not found、429、5xx、流式输出和工具调用差异。</span><em>查看迁移指南 →</em></a>
  <a class="matrix-card" href="/api-status/guide/"><small>配置</small><strong>Cursor、Dify 与 Claude Code</strong><span>按工具填写Base URL、API Key和模型ID，再从最小文本请求逐步增加能力。</span><em>查看工具教程 →</em></a>
</div>

> **国内怎么直连 Claude、GPT、Gemini API？** 使用 OpenAI-compatible 客户端时，把 Base URL 改为 `https://www.aifast.club/v1`，再从控制台复制当前模型 ID。先跑一条短文本请求，确认鉴权和响应结构后，再测试流式输出、工具调用与图片能力。

本页记录模型广场的上架与维护信息。具体模型ID、维护状态和费用以最新公告、控制台及当前请求为准。

---

## 模型广场状态（复核于 2026-07-13）

| 模型 | 模型广场状态 | 说明 |
|:---|:---:|:---|
| GPT-5.6 Sol / Terra / Luna | ✅ 已上架 | 实际可用性以当前请求为准 |
| Claude Sonnet 5 / Opus 4.8 / Fable 5 | ✅ 已上架 | 实际可用性以当前请求为准 |
| Grok 4.5 / 4.3 / 4.20 Reasoning | ✅ 已上架 | 实际可用性以当前请求为准 |
| DeepSeek V4 Pro / Flash | ✅ 已上架 | 实际可用性以当前请求为准 |
| Gemini 3.5 Flash | ✅ 已上架 | 实际可用性以当前请求为准 |
| Qwen3.7 Max / GLM-5.2 / Kimi K2.7 Code | ✅ 已上架 | 实际可用性以当前请求为准 |
| Doubao Seed 2.1 Turbo | 🛠️ 维护中 | 2026-07-09 公告暂时下线 |

配置中存在模型 ID 不代表模型始终在线。生产使用前应从部署网络发起真实请求，并记录状态码、响应结构和超时情况。

---

## OpenAI 兼容接入

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="gpt-5.6-terra",
    messages=[{"role": "user", "content": "你好"}],
    timeout=60,
)
print(response.choices[0].message.content)
```

模型能力、工具调用、图片输入和响应格式可能不同。先验证单个文本请求，再逐步加入流式输出、工具和回退路由。

---

## 快速导航

| 页面 | 说明 |
|:---|:---|
| [模型目录](/api-status/models) | 供应商与模型 ID 参考；状态以模型广场和公告为准 |
| [国内直连接入](/api-status/china-access) | Claude、GPT、Gemini API 国内调用步骤与边界 |
| [OpenAI-compatible迁移](/api-status/openai-compatible) | Python、Node.js、cURL迁移和401/429/5xx排错 |
| [模型中转站检测](/api-status/model-check) | 模型声明、Token、动态题、SSE与工具调用报告判读 |
| [声明与证据索引](/api-status/evidence) | 500+、五类能力、维护状态与核验入口 |
| [开发者接入指南](/api-status/guide) | Cursor、Dify、OpenWebUI 等工具配置 |
| [常见问题](/api-status/faq) | 401、429、模型不存在等问题排查 |
| [方案对比](/api-status/compare) | 使用可验证维度选择接入方案 |

---

<p align="center">
  <em>由 <a href="https://www.aifast.club">www.aifast.club</a> 维护。模型、账户与当前公告请以官网页面为准。</em>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
