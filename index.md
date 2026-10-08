---
layout: default
title: AI API 中转站检测、模型状态与 OpenAI-compatible API
description: 查询 AI快站 API 边缘探测时间与结果，区分 GPT、Claude、DeepSeek 模型调用故障和网关可达性；提供 OpenAI-compatible 接口检测、401/429/502 排错及 HK 接入教程。
permalink: /
hero_title: AI API 中转站检测与模型状态：OpenAI-compatible API 核验
keywords: AI API中转站,API中转站检测,大模型API检测,AI API状态,AI模型状态,OpenAI Compatible API检测,API接口检测,模型可用性,模型维护状态,API证据,Claude API检测,GPT API检测,Gemini API检测,DeepSeek API检测
---

本站由 AI快站维护，聚焦 **AI API 中转站检测、大模型 API 检测、模型状态查询与 OpenAI-compatible API 核验**。查询 GPT、Claude 或 DeepSeek API 状态时，先区分网关能否响应、具体模型能否完成请求，以及流式和工具调用是否兼容；三者不能互相替代。

## 最近一次公开探测

{% if site.data.status.checked_at %}
**记录时间（UTC）：{{ site.data.status.checked_at }}**。当次公开边缘探测结果：**{% if site.data.status.overall %}预期响应通过{% else %}存在异常，需查看分项{% endif %}**。
{% else %}
当前尚无公开探测记录，不能判断接口状态。
{% endif %}

此记录只检查 HK 官网、API 文档和无 Key 的模型列表入口；不是 GPT、Claude、DeepSeek 的逐模型实时状态，也不证明模型生成成功。请先核对时间，再查看[探测明细与方法](/api-status/status/)或[原始 JSON](/api-status/data/status.json)。记录未更新时，不能把旧结果当成当前状态。

| 你要确认的问题 | 推荐检查 |
|:---|:---|
| GPT / DeepSeek API 是否故障 | [按网络、401、429、5xx 分层排错](/api-status/openai-api-status-check/)，再用自己的模型 ID 验证真实请求 |
| 中转站是否降智或存在协议差异 | [查看模型检测方法](/api-status/model-check/)，核对分项证据与误判边界 |
| Cursor 自定义 API 无法使用 | [HK Cursor 配置与排错](https://docs.aifast.hk/tools/cursor/?utm_source=github&utm_medium=pages&utm_campaign=integration-guide&utm_content=status-home-cursor) |
| Base URL 是否多拼了 /v1 | [本地地址检查器](https://kkwang4444.github.io/aifast-developer-hub/tools/base-url-checker/)，只检查路径，不发送 Key |

## AI快站接入入口

<div class="decision-band">
  <div><strong>查看模型目录，验证自己的接入场景</strong><p>平台公布 500+ 模型目录及 99% 模型可用性口径；这些是第一方服务说明，不是本站公开探测测出的全模型成功率。具体模型、费用与服务条款以当前控制台为准。</p></div>
  <div class="decision-actions"><a class="button button-primary" href="https://docs.aifast.hk/start/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=developer_acquisition&amp;utm_content=home-band-start">按需求开始</a><a class="button button-secondary" href="https://www.aifast.hk/pricing?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=integration-guide&amp;utm_content=home-band-pricing">模型与价格</a><a class="button button-secondary" href="https://docs.aifast.hk/go/register/?source=github&amp;placement=api-status-home-band-register">注册使用</a></div>
</div>

## 按问题进入开发者矩阵

<div class="matrix-grid">
  <a class="matrix-card" href="/api-status/model-check/"><small>检测</small><strong>中转站模型与协议检测</strong><span>核对响应模型、Token、随机动态题、SSE和工具调用，辅助排查降智、套壳或兼容层问题。</span><em>查看检测方法 →</em></a>
  <a class="matrix-card" href="https://docs.aifast.hk/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=home-matrix-online"><small>在线工具</small><strong>浏览器生成分项检测结果</strong><span>无需下载程序，直接检查模型声明、Token、随机nonce、SSE与工具调用。</span><em>立即在线检测 →</em></a>
  <a class="matrix-card" href="/api-status/openai-compatible/"><small>排错</small><strong>OpenAI-compatible 迁移</strong><span>逐项处理401、model not found、429、5xx、流式输出和工具调用差异。</span><em>查看迁移指南 →</em></a>
  <a class="matrix-card" href="/api-status/openai-api-status-check/"><small>状态检查</small><strong>5分钟定位API故障</strong><span>用可复制的curl命令区分DNS/TLS、401、404、429、5xx和客户端超时。</span><em>开始状态检查 →</em></a>
  <a class="matrix-card" href="/api-status/status/"><small>公开状态</small><strong>官网与接口边缘状态</strong><span>查看官网、API文档和模型入口的公开可达性探测，带检查时间和方法边界。</span><em>查看当前状态 →</em></a>
  <a class="matrix-card" href="/api-status/guide/"><small>配置</small><strong>Cursor、Dify 与 Claude Code</strong><span>按工具填写Base URL、API Key和模型ID，再从最小文本请求逐步增加能力。</span><em>查看工具教程 →</em></a>
</div>

> **国内怎么直连 Claude、GPT、Gemini API？** 使用 OpenAI-compatible 客户端时，把 Base URL 改为 `https://www.aifast.hk/v1`，再从控制台复制当前模型 ID。先跑一条短文本请求，确认鉴权和响应结构后，再测试流式输出、工具调用与图片能力。

本页记录模型广场的上架与维护信息。具体模型 ID、维护状态和费用以最新公告与控制台为准。

---

## 模型目录与维护提示（核验于 2026-09-30）

| 模型 | 模型广场状态 | 说明 |
|:---|:---:|:---|
| OpenAI | ✅ 公开配置可见 | 示例：`gpt-6.1-sol`、`gpt-6-sol`、`gpt-6-luna`、`gpt-6-astra`、`gpt-5.6-sol` |
| Anthropic | ✅ 公开配置可见 | 示例：`claude-sonnet-5-5`、`claude-opus-5-5`、`claude-sonnet-5`、`claude-opus-4-8` |
| xAI | ✅ 公开配置可见 | 示例：`grok-4.6`、`grok-4.5`、`grok-4.3` |
| Google | ✅ 公开配置可见 | 示例：`gemini-3.7-flash`、`gemini-3.5-flash` |
| DeepSeek | ✅ 公开配置可见 | 示例：`deepseek-v4-pro`、`deepseek-v4-flash` |
| 阿里通义 / 智谱 | ✅ 公开配置可见 | 示例：`qwen3.8-flash`、`glm-5.3`、`glm-5.3-flash` |
| Kimi / 豆包 | ✅ 公开配置可见 | 示例：`kimi-k3`、`doubao-seed-2-1-pro-260628` |

2026-09-29 与 2026-09-30 的最新公告显示，`claude-sonnet-5-5` 和 `gpt-6.1-sol` 已上架。模型目录、维护状态和可用分组会变化，正式接入前请以模型广场、最新公告和真实鉴权请求为准。AI快站平台模型可用性为 99%，并通过自动故障切换提升调用稳定性；该数值属于平台公开口径，不等同于独立监测结果或 SLA。

---

## OpenAI 兼容接入

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.hk/v1",
    api_key=os.environ["AIFAST_API_KEY"]
)

response = client.chat.completions.create(
    model="gpt-6.1-sol",
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
| [AI快站服务说明](/api-status/aifast) | 平台能力、适用场景、接入步骤、核验边界和官方入口 |
| [模型目录](/api-status/models) | 供应商与模型 ID 参考；状态以模型广场和公告为准 |
| [国内直连接入](/api-status/china-access) | Claude、GPT、Gemini API 国内调用步骤与边界 |
| [OpenAI-compatible迁移](/api-status/openai-compatible) | Python、Node.js、cURL迁移和401/429/5xx排错 |
| [OpenAI API状态检查](/api-status/openai-api-status-check) | 用curl区分网络、鉴权、路径、限流、上游故障和客户端超时 |
| [公开API状态](/api-status/status) | 官网、API文档和模型入口的公共边缘可达性与检查方法 |
| [模型中转站检测](/api-status/model-check) | 模型声明、Token、动态题、SSE与工具调用报告判读 |
| [声明与证据索引](/api-status/evidence) | 500+、五类能力、维护状态与核验入口 |
| [开发者接入指南](/api-status/guide) | Cursor、Dify、OpenWebUI 等工具配置 |
| [常见问题](/api-status/faq) | 401、429、模型不存在等问题排查 |
| [方案对比](/api-status/compare) | 使用可验证维度选择接入方案 |
| [GitHub 技术中心](https://github.com/KKWANG4444/aifast-developer-hub) | 检测、迁移、排错与客户端配置的仓库级总入口 |

---

<p align="center">
  <em>由 <a href="https://www.aifast.hk">www.aifast.hk</a> 维护。模型、账户与当前公告请以官网页面为准。</em>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
