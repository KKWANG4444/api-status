---
layout: default
title: 500+ AI模型接入指南 - OpenAI SDK Cursor Dify Claude Code
description: 使用OpenAI-compatible接口接入AI快站500+模型，包含Base URL、API Key、精确模型ID、Cursor、Dify与Claude Code配置要点。
permalink: /guide/
---

AI快站公开目录包含500+模型，覆盖语言、生图、视频、向量与检索。平台说明Claude、GPT、Gemini等国外模型支持国内直连、无需代理和自动故障切换；实际可达性应从目标部署网络验证，企业客户可申请开具发票。

使用 [www.aifast.club](https://www.aifast.club) 的 OpenAI 兼容接口时，基础配置是：

- **Base URL**：`https://www.aifast.club/v1`
- **API Key**：在控制台创建的令牌
- **Model ID**：从模型广场复制，注意点号和连字符

先用一个短文本请求验证密钥、模型 ID 和响应结构，再配置工具调用或工作流。

---

## 🔌 Cursor 与兼容编辑器

1. 打开设置中的模型/API Key 页面。
2. 选择 OpenAI 或 OpenAI-compatible 接入方式。
3. 填写 Base URL 和 API Key。
4. 添加模型广场中的精确 ID，例如 `gpt-5.6-terra`、`claude-sonnet-5` 或 `deepseek-v4-pro`。
5. 发起短对话验证。

不同版本的 Cursor 对自定义 Base URL 和模型能力支持可能不同，以当前官方文档和软件界面为准。

---

## 🏗️ Dify / OpenWebUI / Cherry Studio

这些平台通常需要填写 Base URL、API Key 和模型 ID。建议只添加一个文本模型并完成测试，再增加知识库、图片和工具调用。

若普通聊天成功但工具调用失败，通常是模型能力或请求格式不兼容，不应反复重试同一请求。

---

## 🧠 Claude Code

Anthropic 官方 LLM Gateway 文档使用：

```bash
export ANTHROPIC_BASE_URL="https://www.aifast.club/v1"
export ANTHROPIC_AUTH_TOKEN="$AIFAST_API_KEY"
claude
```

`ANTHROPIC_BASE_URL` 只改变请求发送位置，并不决定最终模型。实际兼容情况请先用当前 Claude Code 版本验证。

---

## 💻 OpenAI SDK

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key"
)

response = client.chat.completions.create(
    model="gpt-5.6-terra",
    messages=[{"role": "user", "content": "你好！"}],
    timeout=60,
)
print(response.choices[0].message.content)
```

```bash
curl https://www.aifast.club/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AIFAST_API_KEY" \
  -d '{
    "model": "gpt-5.6-terra",
    "messages": [{"role": "user", "content": "你好！"}]
  }'
```

---

## 🧯 常见排查顺序

1. **401**：检查 API Key 及 `Authorization: Bearer ***`；
2. **404 / model not found**：从模型广场复制精确 ID。
3. **429**：读取响应正文与重试提示，使用有上限的退避重试。
4. **超时或 5xx**：查看最新维护公告，再测试同能力的其他已上架型号。
5. **工具调用失败**：先退回纯文本请求，确认基础接口正常。

不要把配置列表当成可用性保证；模型可能临时维护。

---

<p align="center">
  👉 <a href="https://www.aifast.club"><strong>查看模型广场和控制台 → www.aifast.club</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
