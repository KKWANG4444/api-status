---
layout: default
title: AI 模型 API 状态参考 | GPT-5.6 Claude Sonnet 5 Grok 4.5
permalink: /
---

# 📊 AI 模型 API 状态参考

> 本页记录 AI快站模型广场的上架与维护信息，不构成实时监控、延迟承诺或 SLA。实际可用性以最新公告和当前请求为准。

---

## 🚦 模型广场状态（复核于 2026-07-13）

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

## 🔌 OpenAI 兼容接入

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

## 🔗 快速导航

| 页面 | 说明 |
|:---|:---|
| [🏪 模型目录](/api-status/models) | 供应商与模型 ID 参考；状态以模型广场和公告为准 |
| [📖 开发者接入指南](/api-status/guide) | Cursor、Dify、OpenWebUI 等工具配置 |
| [❓ 常见问题](/api-status/faq) | 401、429、模型不存在等问题排查 |
| [⚖️ 方案对比](/api-status/compare) | 使用可验证维度选择接入方案 |

---

<p align="center">
  <em>由 <a href="https://www.aifast.club">www.aifast.club</a> 维护。模型、账户与当前公告请以官网页面为准。</em>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
