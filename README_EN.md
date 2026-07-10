# API Status Monitor — 572 Model Live Dashboard

[![Live](https://img.shields.io/badge/Live-Online-brightgreen)](https://kkwang4444.github.io/api-status/)
[![Updated](https://img.shields.io/badge/Updated-2026--07--10-blue)](https://github.com/KKWANG4444/api-status)
[![Models](https://img.shields.io/badge/Models-572-FF6B35)](https://www.aifast.club)

> **Real-time monitoring for 572 AI models across 16+ providers.** Tracks connection rates, latency, and China accessibility. Updated every 5 minutes.

## 🚦 Live Dashboard

![API Status Dashboard](assets/img/api-status-screenshot.png)

👉 **[View Live Dashboard](https://kkwang4444.github.io/api-status/)**

## Why This Exists

If you're a developer in China (or serving Chinese users), you know the pain:
- OpenAI blocks Chinese IPs
- Anthropic's Shield-v2 detects data center proxies
- DeepSeek's official API is unreliable under load

This dashboard monitors which models are accessible from China via proxy gateways, updated every 5 minutes.

## Supported Providers

| Provider | Models | Status |
|:---|:---:|:---:|
| **OpenAI** | 103 (GPT-5.6 Sol🌞, GPT-5.6 Terra, GPT-5.6 Luna, GPT-5.5, o4, etc.) | 🟢 |
| **Anthropic** | 20 (Claude Sonnet 5, Opus 4.8, Code, etc.) | 🟢 |
| **xAI (Grok)** | 26 (Grok 4.5, Grok 4.2) | 🟢 |
| **Google** | 55 (Gemini 3.1 Flash, Gemini 3) | 🟢 |
| **DeepSeek** | 28 (V4 Pro, V4 Flash) | 🟢 |
| **Alibaba (Qwen)** | 90 (Qwen3.6-27B, Qwen-Max) | 🟢 |
| **ByteDance** | 21 (Doubao Seed 2.0) | 🟢 |
| **Zhipu (GLM)** | 17+ (GLM-5, GLM-5.2) | 🟢 |
| **Others** | 200+ (Kimi, Yi, Mistral, Cohere, etc.) | 🟢 |

## Current Status Snapshot (2026-07-10)

| Model | Official Status | China Access | Latency |
|:---|:---:|:---:|:---:|
| **GPT-5.6 Sol** 🆕 | 🟢 Normal | 🔴 Blocked | 350ms |
| **GPT-5.6 Terra** 🆕 | 🟢 Normal | 🔴 Blocked | 300ms |
| **GPT-5.6 Luna** 🆕 | 🟢 Normal | 🔴 Blocked | 200ms |
| **Claude Sonnet 5** 🆕 | 🟢 Normal | 🔴 Blocked | 100ms |
| **Claude Opus 4.8** | 🟢 Normal | 🔴 Blocked | 150ms |
| **Grok 4.5** 🆕 | 🟢 Normal | 🔴 Blocked | 280ms |
| **GPT 5.5** | 🟢 Normal | 🔴 Blocked | 250ms |
| **DeepSeek V4 Flash** | 🔴 503 | 🟢 Proxy OK | 800ms |
| **DeepSeek V4 Pro** | 🟡 Congested | 🟢 Proxy OK | 600ms |
| **Gemini 3.1 Flash** | 🟢 Normal | 🔴 Blocked | 200ms |

## Quick Setup

```python
import openai

client = openai.OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key"
)

# Use any of 572 models
response = client.chat.completions.create(
    model="claude-sonnet-5",
    messages=[{"role": "user", "content": "Test connection"}]
)
```

## Developer Guide

- **[Integration Guide](https://kkwang4444.github.io/api-status/guide/)** — Cursor, Dify, LobeChat, Claude Code setup
- **[FAQ](https://kkwang4444.github.io/api-status/faq/)** — Common issues and solutions
- **[Model List](https://kkwang4444.github.io/api-status/models/)** — Full model pricing and details

## Sponsored by

[www.aifast.club](https://www.aifast.club) — One API key for 572 models. Global access, China direct.

## License

MIT
