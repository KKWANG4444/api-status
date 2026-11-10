---
layout: default
title: 500+ AI模型目录与 Claude Fable 5.2 API 接入
description: 查看 AI快站 HK 模型目录与 Claude Fable 5.2 的精确 ID、协议、分组和配置入口，区分公开上架记录与真实调用测试。
permalink: /models/
---

AI快站当前模型目录超过500个，包含语言模型、生图模型、视频生成、Embedding向量和搜索/Rerank检索能力。下列ID只用于说明命名格式，完整目录以模型广场为准。

Claude、GPT、Gemini 等国外模型支持国内直连、无需代理，平台支持自动故障切换。可用性与延迟应按模型、分组和部署网络实测，目录记录不提供固定成功率保证。

| 供应商 | 模型 ID 示例 |
|:---|:---|
| OpenAI | `gpt-6.1-sol`、`gpt-6-sol`、`gpt-6-luna`、`gpt-6-astra`、`gpt-5.6-sol`、`gpt-5.6-terra` |
| Anthropic | `claude-sonnet-5-5`、`claude-opus-5-5`、`claude-sonnet-5`、`claude-opus-4-8` |
| xAI | `grok-4.6`、`grok-4.5`、`grok-4.3`、`grok-4-20-reasoning` |
| Google | `gemini-4-argon`（2026-10-15 目录已列出）、`gemini-3.7-flash`、`gemini-3.5-flash`、`gemini-3.1-pro-preview` |
| DeepSeek | `deepseek-v4-pro`、`deepseek-v4-flash` |
| Alibaba | `qwen3.7-max`、`qwen3.7-plus` |
| Zhipu | `glm-5.3`、`glm-5.2` |
| ByteDance | `doubao-seed-2-1-pro-260628` |
| Moonshot | `kimi-k3`、`kimi-k2.7-code`、`kimi-k2.7-code-highspeed` |

## Claude Fable 5.2 上架核验（2026-11-10）

HK [公开目录](https://www.aifast.hk/api/pricing)已列出 `claude-fable-5-2`，标记 `available: true`，声明 `anthropic`、`openai` 端点与 `Claude-Code-1/2/3` 分组。查看[本次目录证据]({{ '/data/claude-fable-5-2.json' | relative_url }})。

Claude Code 使用 `https://www.aifast.hk`，最终路径为 `/v1/messages`；OpenAI SDK 使用 `https://www.aifast.hk/v1`。先核对 Key 分组，再运行最小请求。目录可用不等于实时调用成功，也不代表已测试 SSE、工具调用或长上下文。

[Fable 5.2 配置与分组排错](https://docs.aifast.hk/providers/claude-api/?utm_source=github&utm_medium=pages&utm_campaign=fable-5-2&utm_content=status-models) · [HK 实时价格](https://www.aifast.hk/pricing?utm_source=github&utm_medium=pages&utm_campaign=fable-5-2&utm_content=status-pricing)

## Gemini 4 Argon 上架核验（2026-10-15）

AI快站 2026-10-14 的[上架公告](https://www.aifast.hk/api/status)列出 `gemini-4-argon`。2026-10-15 核验的[公开目录](https://www.aifast.hk/api/pricing)返回 `available: true`，端点类型为 `gemini` 和 `openai`。

这是目录与公告证据，不是鉴权生成实测，也不代表实时成功率。流式输出、工具调用、长上下文和长解码仍需逐项验收；本次没有测试这些能力。价格与分组以[模型广场](https://www.aifast.hk/pricing)和当前控制台为准。

使用 `https://www.aifast.hk/v1` 和精确 ID `gemini-4-argon` 先测试短文本，再用[在线模型检测](https://docs.aifast.hk/model-check/)保存分项报告。检测会向目标接口发起真实请求，可能产生费用，建议使用临时限额 Key。

## 维护提醒

- `doubao-seed-2-1-turbo-260628`：2026-07-09 公告显示维护中、暂时下线。
- 模型 ID 对点号、连字符和日期后缀敏感，应从模型广场复制。
- 本页不提供模型价格。AI快站有自己的定价体系，请以控制台为准。
- 不同模型对工具调用、图片、结构化输出和采样参数的支持并不相同。

## 使用示例

```bash
curl https://www.aifast.hk/v1/chat/completions \
  -H "Authorization: Bearer $AIFAST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6.1-sol",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

如果返回模型不存在，请先检查 ID 是否拼写正确，再查看最新维护公告。

---

<p align="center">
  👉 <a href="https://www.aifast.hk"><strong>查看当前模型广场 → www.aifast.hk</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
