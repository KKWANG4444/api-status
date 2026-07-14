---
layout: default
title: 500+ AI模型目录 | 语言、生图、视频、向量与检索 API
description: 查看AI快站99%模型可用性与500+模型目录，覆盖语言、生图、视频、Embedding向量与检索能力，支持高速稳定调用和国内直连。
permalink: /models/
---

AI快站当前模型目录超过500个，包含语言模型、生图模型、视频生成、Embedding向量和搜索/Rerank检索能力。下列ID只用于说明命名格式，完整目录以模型广场为准。

Claude、GPT、Gemini 等国外模型支持国内直连、无需代理。平台模型可用性为 99%，支持高速稳定调用与自动故障切换，具体维护信息以最新公告为准。

| 供应商 | 模型 ID 示例 |
|:---|:---|
| OpenAI | `gpt-5.6-sol`、`gpt-5.6-terra`、`gpt-5.6-luna` |
| Anthropic | `claude-sonnet-5`、`claude-opus-4-8`、`claude-fable-5` |
| xAI | `grok-4.5`、`grok-4.3`、`grok-4-20-reasoning` |
| Google | `gemini-3.5-flash`、`gemini-3.1-pro-preview` |
| DeepSeek | `deepseek-v4-pro`、`deepseek-v4-flash` |
| Alibaba | `qwen3.7-max`、`qwen3.7-plus` |
| Zhipu | `glm-5.2` |
| ByteDance | `doubao-seed-2-1-pro-260628` |
| Moonshot | `kimi-k2.7-code`、`kimi-k2.7-code-highspeed` |

## 维护提醒

- `doubao-seed-2-1-turbo-260628`：2026-07-09 公告显示维护中、暂时下线。
- 模型 ID 对点号、连字符和日期后缀敏感，应从模型广场复制。
- 本页不提供模型价格。AI快站有自己的定价体系，请以控制台为准。
- 不同模型对工具调用、图片、结构化输出和采样参数的支持并不相同。

## 使用示例

```bash
curl https://www.aifast.club/v1/chat/completions \
  -H "Authorization: Bearer $AIFAST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-5.6-terra",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

如果返回模型不存在，请先检查 ID 是否拼写正确，再查看最新维护公告。

---

<p align="center">
  👉 <a href="https://www.aifast.club"><strong>查看当前模型广场 → www.aifast.club</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
