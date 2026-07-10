---
layout: default
title: 开发者接入指南 - Cursor Dify LobeChat 配置教程 | 国内直连API
permalink: /guide/
---

# 📖 开发者接入指南

**无论你用什么工具，接入 [www.aifast.club](https://www.aifast.club) 只需两步：**

1. **Base URL** 改为 `https://www.aifast.club/v1`
2. **API Key** 填入你在控制台创建的令牌

---

## 🔌 Cursor 配置

适用于写代码、重构、解释与开发工作流。

1. 打开 Cursor → Settings → Models
2. 将 `OpenAI API Base URL` 改为 `https://www.aifast.club/v1`
3. 填入你的 API Key
4. 模型名填入：`claude-opus-4-7` 或 `gpt-5.5` 或 `deepseek-v4-pro`
5. ✅ 完成

> **推荐模型：** claude-code（编程专用）、**gpt-5.6-sol**（复杂推理）、gpt-5.5（通用编码）

---

## 🏗️ Dify 配置

适用于 AI 工作流、知识库、客服与企业内部应用。

1. 进入 Dify 后台 → Settings → Model Provider
2. 添加自定义 API 提供商
3. Base URL: `https://www.aifast.club/v1`
4. API Key: 你的密钥
5. 支持的模型列表会自动加载

> **推荐模型：** gpt-5.5-pro（复杂工作流）、deepseek-v4-flash（高吞吐）、qwen3.6-27b（国产合规）

---

## 💬 Chatbox / Cherry Studio 配置

适用于日常对话、总结、翻译和多模型切换。

1. 打开设置 → AI 模型提供商
2. 选择 OpenAI 兼容模式
3. API 地址: `https://www.aifast.club/v1`
4. API Key: 你的密钥
5. 添加你需要的模型名称

---

## 🌐 LobeChat 配置

1. 进入 LobeChat → 设置 → 语言模型
2. 自定义 OpenAI 兼容接口
3. 代理地址: `https://www.aifast.club/v1`
4. API Key: 你的密钥
5. 添加模型

---

## 🧩 OpenWebUI / n8n 配置

适用于自建平台、自动化编排与团队工具链。

**OpenWebUI:**
- 环境变量: `OPENAI_API_BASE_URL=https://www.aifast.club/v1`
- 或 UI 设置中填入

**n8n:**
- 使用 HTTP Request 节点
- Base URL: `https://www.aifast.club/v1/chat/completions`
- Header: `Authorization: Bearer 你的APIKey`

---

## 💻 直接调用 (OpenAI SDK)

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key-here"
)

response = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[{"role": "user", "content": "你好！"}]
)
print(response.choices[0].message.content)
```

```bash
# cURL 示例
curl https://www.aifast.club/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "gpt-5.5",
    "messages": [{"role": "user", "content": "你好！"}]
  }'
```

---

## 📋 推荐模型速查

| 场景 | 推荐模型 | 供应商 |
|:---|:---|:---|
| 编程/代码 | `claude-code` / **`gpt-5.6-sol`** | Anthropic / OpenAI |
| 复杂推理 | `claude-opus-4-7` / `gpt-5.5-pro` | Anthropic / OpenAI |
| 日常对话 | `gpt-5.5` / `gemini-3-flash` | OpenAI / Google |
| 高吞吐低成本 | `deepseek-v4-flash` / `gpt-5-4-nano` | DeepSeek / OpenAI |
| 图像生成 | `gpt-image-2` / `midjourney-v7` | OpenAI / Midjourney |
| 视频生成 | `kling-2.0` / `grok-videos` | 可灵 / xAI |
| 国产合规 | `qwen3.6-27b` / `glm-5` | 阿里云 / 智谱 |
| 文字转语音 | `gemini-3.1-flash-tts-preview` | Google |

---

<p align="center">
  👉 <a href="https://www.aifast.club"><strong>免费注册 → www.aifast.club</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
