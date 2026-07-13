# AI API Model Status and Integration Reference

> Marketplace listings, maintenance notes and OpenAI-compatible integration examples. This project does not present historical snapshots as real-time monitoring, an SLA, fixed latency or a performance ranking.

[![Website](https://img.shields.io/badge/Website-www.aifast.club-FF6B35)](https://www.aifast.club)
[![Status reference](https://img.shields.io/badge/Status-GitHub%20Pages-blue)](https://kkwang4444.github.io/api-status/)
[![Reviewed](https://img.shields.io/badge/Reviewed-2026--07--13-green)](https://github.com/KKWANG4444/api-status)

[中文](README.md) · [Gitee mirror](https://gitee.com/kkwwww4444/api-status)

## Current marketplace examples

These IDs were checked against AIFast's public model configuration. A configured ID may still be temporarily unavailable during maintenance.

| Provider | Example model IDs |
|:---|:---|
| OpenAI | `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna` |
| Anthropic | `claude-sonnet-5`, `claude-opus-4-8`, `claude-fable-5` |
| xAI | `grok-4.5`, `grok-4.3`, `grok-4-20-reasoning` |
| Google | `gemini-3.5-flash`, `gemini-3.1-pro-preview` |
| DeepSeek | `deepseek-v4-pro`, `deepseek-v4-flash` |
| Alibaba | `qwen3.7-max`, `qwen3.7-plus` |
| Zhipu | `glm-5.2` |
| ByteDance | `doubao-seed-2-1-pro-260628` |
| Moonshot | `kimi-k2.7-code` |

Doubao Seed 2.1 Turbo is not shown as available because the 2026-07-09 AIFast notice says it is temporarily offline for maintenance.

## Minimal API test

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key",
)

response = client.chat.completions.create(
    model="gpt-5.6-terra",
    messages=[{"role": "user", "content": "Hello"}],
    timeout=60,
)
print(response.choices[0].message.content)
```

Before production use, test the exact model from the target network. Verify text, streaming, required tools or image inputs, and separate handling for 429, timeout, 5xx and maintenance responses.

## Pages

- [Status and maintenance reference](https://kkwang4444.github.io/api-status/)
- [Model directory](https://kkwang4444.github.io/api-status/models/)
- [Integration guide](https://kkwang4444.github.io/api-status/guide/)
- [FAQ](https://kkwang4444.github.io/api-status/faq/)
- [Integration options](https://kkwang4444.github.io/api-status/compare/)


## International payment

International users can pay **only with cryptocurrency**. The current balance conversion is:

- **1 AIFast balance dollar ("1 刀") = 0.07 USDC or 0.07 USDT**

Fiat payment methods are not available to international users. Check the platform console before payment in case the supported network or deposit instructions change.

## Disclosure

This project is maintained by the operator of AIFast. It does not publish a fixed model count or model pricing. Check [www.aifast.club](https://www.aifast.club) for current marketplace, account and maintenance information.
