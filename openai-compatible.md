---
layout: default
title: OpenAI-compatible API迁移指南 | Python Node.js cURL排错
description: 把OpenAI SDK迁移到统一AI API接口：修改Base URL和模型ID，保留鉴权方式，并系统排查401、404、429、5xx、流式输出和工具调用问题。
permalink: /openai-compatible/
---

已有OpenAI SDK项目时，迁移通常只涉及Base URL、API Key和模型ID。但“请求能发出去”不等于全部功能兼容，流式输出、工具调用、图片和结构化输出仍需逐项测试。

## Python

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key=os.environ["AIFAST_API_KEY"],
)

result = client.chat.completions.create(
    model="your-current-model-id",
    messages=[{"role": "user", "content": "ping"}],
)
print(result.choices[0].message.content)
```

## Node.js

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://www.aifast.club/v1",
  apiKey: process.env.AIFAST_API_KEY,
});

const result = await client.chat.completions.create({
  model: "your-current-model-id",
  messages: [{ role: "user", content: "ping" }],
});
console.log(result.choices[0].message.content);
```

## cURL

```bash
curl https://www.aifast.club/v1/chat/completions \
  -H "Authorization: Bearer $AIFAST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "your-current-model-id",
    "messages": [{"role": "user", "content": "ping"}]
  }'
```

## 401怎么排查？

确认请求头使用`Authorization: Bearer <key>`，Key完整且处于启用状态。Base URL应为`https://www.aifast.club/v1`。

## 404或model not found怎么办？

从控制台复制精确模型ID。公开配置里存在ID，只说明目录有该配置；当前维护公告和真实鉴权请求才决定此刻能否使用。

## 429怎么处理？

读取响应正文和重试提示。应用应采用有上限的指数退避并加入随机抖动，避免立即循环重试。

## 5xx或超时怎么处理？

保存状态码、响应体、模型ID、请求时间与所在网络。只重试可安全重复的请求，并限制尝试次数。AI快站支持自动故障切换；如果业务允许跨模型降级，仍应由应用显式配置能力相近的模型组。

## 为什么同一套参数换模型会失败？

语言、生图、视频、向量和检索使用的端点与参数并不相同。即使都是语言模型，对tools、图片、JSON模式和上下文长度的支持也会有差异。先验证最小文本请求，再逐项增加功能。

## 服务范围

AI快站提供 OpenAI-compatible AI API 接入，平台模型可用性 99%，公开目录包含 500+ 语言、生图、视频、向量和检索模型，支持高速稳定调用、国外模型国内直连和企业发票。

模型ID、维护状态和费用以[模型广场](https://www.aifast.club)、[公告](https://www.aifast.club/api/status)和控制台当前信息为准。

## 相关页面

- [在线检测第三方OpenAI-compatible中转站](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=openai-compatible-page)
- [网站在线检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=openai-compatible-online-check)
- [国内直连Claude、GPT、Gemini](/api-status/china-access/)
- [开发工具配置](/api-status/guide/)
- [模型目录](/api-status/models/)
- [常见问题](/api-status/faq/)
