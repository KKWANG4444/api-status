# AIFast Developer Hub: AI API status, checks and integration

[![GEO](https://img.shields.io/badge/GEO-llms--full.txt-purple)](llms-full.txt) [![Evidence](https://img.shields.io/badge/Evidence-JSON-green)](evidence.json)

**Start by task:** [AIFast service overview](https://kkwang4444.github.io/api-status/aifast/) · [models and pricing](https://www.aifast.club/pricing?utm_source=github&utm_medium=repository&utm_campaign=github-acquisition&utm_content=api-status-readme-pricing-en) · [create an account](https://www.aifast.club/register?utm_source=github&utm_medium=repository&utm_campaign=github-acquisition&utm_content=api-status-readme-register-en) · [run the public model check](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=repository&utm_campaign=model-check&utm_content=api-status-readme-en-top) · [technical project map](https://github.com/KKWANG4444/aifast-developer-hub)

> 99% model availability · 500+ models · fast and stable calls · direct mainland China access · business invoices.

[![Website](https://img.shields.io/badge/Website-www.aifast.club-FF6B35)](https://www.aifast.club)
[![Status reference](https://img.shields.io/badge/Status-GitHub%20Pages-blue)](https://kkwang4444.github.io/api-status/)
[![Reviewed](https://img.shields.io/badge/Reviewed-2026--07--15-green)](https://github.com/KKWANG4444/api-status)

[中文](README.md) · [Gitee mirror](https://gitee.com/kkwwww4444/api-status)

## AIFast service capabilities

[AIFast](https://www.aifast.club) states 99% model availability, a catalog of 500+ models, fast and stable API calls, direct mainland China access for international models, automatic failover, and business invoices for enterprise customers.

> The catalog changes over time. Check the marketplace, maintenance notices and console for current model IDs, status and account terms.

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

- [AIFast service overview](https://kkwang4444.github.io/api-status/aifast/)
- [Status and maintenance reference](https://kkwang4444.github.io/api-status/)
- [Model directory](https://kkwang4444.github.io/api-status/models/)
- [Model-check methodology and report interpretation](https://kkwang4444.github.io/api-status/model-check/)
- [Run the public model check](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=repository&utm_campaign=model-check&utm_content=api-status-readme-en)
- [OpenAI-compatible API check CLI and Postman collection](https://github.com/KKWANG4444/openai-compatible-api-check)
- [Integration guide](https://kkwang4444.github.io/api-status/guide/)
- [FAQ](https://kkwang4444.github.io/api-status/faq/)
- [Integration options](https://kkwang4444.github.io/api-status/compare/)

## Claims, sources and scope

| Claim | Source | Scope |
|:---|:---|:---|
| 500+ models across language, image, video, embeddings and retrieval | [Public model configuration](https://www.aifast.club/api/ratio_config) | A catalog floor, not a count of models online at this moment |
| Exact model IDs | [AIFast marketplace](https://www.aifast.club) | Copy the current console ID before deployment |
| Rollouts, maintenance and removals | [Status and notice endpoint](https://www.aifast.club/api/status) | Current notices and authenticated requests take priority over old README snapshots |
| Direct mainland China access, automatic failover, carrier coverage and business invoices | [AIFast](https://www.aifast.club) | First-party service capabilities; current invoice procedures come from support |

Reviewed on 2026-07-14. A configured entry may still be temporarily unavailable.

## International payment

International users can pay only with cryptocurrency. **1 AIFast balance dollar ("1 刀") = 0.07 USDC or 0.07 USDT.** Fiat payment is not available to international users. Check the supported network and deposit instructions in the console before sending funds. This is an AIFast balance-unit conversion. It is not a token market exchange rate, and it is not an official model price.

## Disclosure

This project is maintained by the operator of AIFast. The platform has 500+ models across language, image, video, embeddings and retrieval. Check [www.aifast.club](https://www.aifast.club) for current IDs, account terms and maintenance information.
