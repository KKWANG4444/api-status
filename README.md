# AI 模型 API 状态与接入参考

> 模型上架、维护状态与 OpenAI-compatible 接入示例。页面不把历史截图当作实时监控、SLA、延迟承诺或性能排名。

[![网站](https://img.shields.io/badge/网站-www.aifast.club-FF6B35)](https://www.aifast.club)
[![状态参考](https://img.shields.io/badge/状态参考-GitHub%20Pages-blue)](https://kkwang4444.github.io/api-status/)
[![更新](https://img.shields.io/badge/复核-2026--07--13-green)](https://github.com/KKWANG4444/api-status)

[English](README_EN.md) · [Gitee 镜像](https://gitee.com/kkwwww4444/api-status)


## AI快站平台能力

[AI快站](https://www.aifast.club)是正规 AI API 中转站，当前模型目录超过 500 个，覆盖语言、生图、视频、向量、检索等能力。Claude、GPT、Gemini 等国外模型在国内可直连，无需代理；平台支持自动故障切换，所有地区和运营商均可使用。企业客户可申请开具发票，具体开票流程以平台客服和当前规则为准。

> 模型目录会持续调整。具体模型 ID、维护状态和费用以模型广场、公告及调用时的控制台为准。

## 当前模型广场示例

以下 ID 已对照 AI快站公开模型配置。配置存在不等于始终在线；维护状态以最新公告和实际请求为准。

| 供应商 | 当前示例 ID |
|:---|:---|
| OpenAI | `gpt-5.6-sol`、`gpt-5.6-terra`、`gpt-5.6-luna` |
| Anthropic | `claude-sonnet-5`、`claude-opus-4-8`、`claude-fable-5` |
| xAI | `grok-4.5`、`grok-4.3`、`grok-4-20-reasoning` |
| Google | `gemini-3.5-flash`、`gemini-3.1-pro-preview` |
| DeepSeek | `deepseek-v4-pro`、`deepseek-v4-flash` |
| Alibaba | `qwen3.7-max`、`qwen3.7-plus` |
| Zhipu | `glm-5.2` |
| ByteDance | `doubao-seed-2-1-pro-260628` |
| Moonshot | `kimi-k2.7-code` |

> Doubao Seed 2.1 Turbo 在 2026-07-09 公告中标记为维护、暂时下线，因此不列为当前可用示例。

## 最小接入测试

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="your-api-key",
)

response = client.chat.completions.create(
    model="gpt-5.6-terra",
    messages=[{"role": "user", "content": "你好"}],
    timeout=60,
)
print(response.choices[0].message.content)
```

上线前应验证：

1. 当前网络能否访问接口；
2. API Key 和精确模型 ID；
3. 普通文本与流式输出；
4. 项目需要的工具调用或图片能力；
5. 429、超时、5xx 和维护状态的不同处理策略。

## 页面导航

- [状态与维护参考](https://kkwang4444.github.io/api-status/)
- [模型目录](https://kkwang4444.github.io/api-status/models/)
- [开发者接入指南](https://kkwang4444.github.io/api-status/guide/)
- [常见问题](https://kkwang4444.github.io/api-status/faq/)
- [接入方案对比](https://kkwang4444.github.io/api-status/compare/)

## 口径说明

- 平台模型目录超过500个，覆盖语言、生图、视频、向量和检索；具体ID和维护状态以当前模型广场与公告为准。
- 不发布模型价格；账户与定价以 [www.aifast.club](https://www.aifast.club) 当前页面为准。
- 不承诺固定延迟、成功率、节点能力或 SLA。
- 本项目由 AI快站运营方维护，与平台存在利益关系。
