<div align="center">
  <img src="assets/img/logo.png" width="88" height="88" alt="AIFast logo">
  <h1>AIFast | One API for global and Chinese AI models</h1>
  <p><strong>99% model availability · 500+ models · fast and stable · direct mainland China access · business invoices</strong></p>
  <p>
    <a href="https://www.aifast.club/?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-hero-website-en"><img src="https://img.shields.io/badge/AIFast-Website-0A7B83?style=for-the-badge" alt="AIFast website"></a>
    <a href="https://www.aifast.club/pricing?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-hero-pricing-en"><img src="https://img.shields.io/badge/Models-Pricing-D66A3A?style=for-the-badge" alt="Models and pricing"></a>
    <a href="https://docs.aifast.club/go/register/?source=github&placement=api-status-hero-register-en"><img src="https://img.shields.io/badge/Create-Account-2563EB?style=for-the-badge" alt="Create an AIFast account"></a>
  </p>
  <p><a href="README.md">中文</a> · <a href="https://aifast.apifox.cn/">API docs</a> · <a href="https://docs.aifast.club/start/?utm_source=github&utm_medium=repository&utm_campaign=developer_acquisition&utm_content=api-status-hero-start-en">Start by task</a> · <a href="https://docs.aifast.club/model-check/">Online model check</a></p>
</div>

---

## One API for multi-model applications

[AIFast](https://www.aifast.club/?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-intro-en) provides an OpenAI-compatible AI API gateway for developers, studios and enterprise teams. Existing OpenAI SDK applications can usually migrate by replacing the Base URL, API key and model ID.

| Service highlight | What it provides |
|:---|:---|
| **99% model availability** | Stable calls for development, production applications and automation |
| **500+ models** | Language, image, video, embedding and retrieval models in one account |
| **Fast and stable** | Less provider-specific integration and maintenance |
| **Direct mainland China access** | Access international models without configuring a separate proxy |
| **Business invoices** | Invoice support for enterprise procurement in China |

## Supported models and tools

- OpenAI, Claude, Gemini, Grok, DeepSeek, Qwen, GLM, Kimi and Doubao;
- language, image generation, video generation, embedding, reranking and retrieval;
- Cursor, Claude Code, Codex, OpenClaw, Hermes, Dify, Cherry Studio, Chatbox, OpenWebUI and n8n.

Check the current [models and pricing](https://www.aifast.club/pricing?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-models-en) page for exact model IDs and account pricing.

## Start in three steps

1. [Create an AIFast account](https://docs.aifast.club/go/register/?source=github&placement=api-status-steps-register-en).
2. Create an API key in the console and copy a model ID.
3. Change the Base URL in your application to `https://www.aifast.club/v1`.

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key=os.environ["AIFAST_API_KEY"],
)

response = client.chat.completions.create(
    model="your-model-id",
    messages=[{"role": "user", "content": "Hello"}],
)

print(response.choices[0].message.content)
```

See the [API documentation](https://aifast.apifox.cn/) and [developer documentation](https://docs.aifast.club/) for streaming, tool calling and troubleshooting examples.

## Check an existing model gateway

The free [online model check](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=repository&utm_campaign=model-check&utm_content=api-status-check-en) inspects OpenAI-compatible HTTPS endpoints and reports protocol metadata, token fields, randomized prompts, SSE streaming and tool calling behavior. It also supports third-party gateways; use a temporary low-limit API key when testing.

## Main links

| Next step | Link |
|:---|:---|
| View models and pricing | [Models and pricing](https://www.aifast.club/pricing?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-bottom-pricing-en) |
| Create an account | [Register](https://docs.aifast.club/go/register/?source=github&placement=api-status-bottom-register-en) |
| Read API parameters | [API docs](https://aifast.apifox.cn/) |
| Choose a first-call, migration or enterprise workflow | [Start by task](https://docs.aifast.club/start/?utm_source=github&utm_medium=repository&utm_campaign=developer_acquisition&utm_content=api-status-bottom-start-en) |
| Read integration guides | [Developer center](https://docs.aifast.club/) |
| Test an existing endpoint | [Online model check](https://docs.aifast.club/model-check/) |

---

<div align="center">
  <strong>AIFast: 99% model availability · 500+ models · fast and stable · direct mainland China access · business invoices</strong><br><br>
  <a href="https://www.aifast.club/?utm_source=github&utm_medium=repository&utm_campaign=integration-guide&utm_content=api-status-footer-en">www.aifast.club</a>
</div>
