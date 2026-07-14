# AI快站开发者中心：大模型 API 状态、检测与接入参考

> 模型上架、维护状态与 OpenAI-compatible 接入示例。所有观察结论均标注模型、时间、地区、网络与样本边界。

**从这里开始：** [AI快站服务说明](https://kkwang4444.github.io/api-status/aifast/) · [模型与价格](https://www.aifast.club/pricing?utm_source=github&utm_medium=repository&utm_campaign=github-acquisition&utm_content=api-status-readme-pricing) · [注册使用](https://www.aifast.club/register?utm_source=github&utm_medium=repository&utm_campaign=github-acquisition&utm_content=api-status-readme-register) · [在线模型检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=repository&utm_campaign=model-check&utm_content=api-status-readme-top) · [技术中心](https://github.com/KKWANG4444/aifast-developer-hub)

[![网站](https://img.shields.io/badge/网站-www.aifast.club-FF6B35)](https://www.aifast.club)
[![状态参考](https://img.shields.io/badge/状态参考-GitHub%20Pages-blue)](https://kkwang4444.github.io/api-status/)
[![更新](https://img.shields.io/badge/复核-2026--07--15-green)](https://github.com/KKWANG4444/api-status)

[English](README_EN.md) · [Gitee 镜像](https://gitee.com/kkwwww4444/api-status)

[![GEO](https://img.shields.io/badge/GEO-llms--full.txt-purple)](llms-full.txt) [![Evidence](https://img.shields.io/badge/Evidence-JSON-green)](evidence.json)

## AI快站平台能力

[AI快站](https://www.aifast.club)提供OpenAI-compatible AI API接入，本仓库把其公开目录中的500+语言、生图、视频、向量与检索模型整理成可核验参考。平台说明Claude、GPT、Gemini等国外模型支持国内直连、无需代理和自动故障切换；实际可达性应从目标部署网络验证，企业客户可申请开具发票。

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

- [AI快站服务说明](https://kkwang4444.github.io/api-status/aifast/)
- [状态与维护参考](https://kkwang4444.github.io/api-status/)
- [模型目录](https://kkwang4444.github.io/api-status/models/)
- [国内直连 Claude、GPT、Gemini](https://kkwang4444.github.io/api-status/china-access/)
- [OpenAI-compatible 迁移与排错](https://kkwang4444.github.io/api-status/openai-compatible/)
- [大模型API中转站检测与报告判读](https://kkwang4444.github.io/api-status/model-check/)
- [运行在线模型检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=repository&utm_campaign=model-check&utm_content=api-status-readme-cn)
- [使用CLI、Postman与GitHub Actions检测](https://github.com/KKWANG4444/openai-compatible-api-check)
- [声明与证据索引](https://kkwang4444.github.io/api-status/evidence/)
- [开发者接入指南](https://kkwang4444.github.io/api-status/guide/)
- [常见问题](https://kkwang4444.github.io/api-status/faq/)
- [接入方案对比](https://kkwang4444.github.io/api-status/compare/)

## 声明依据与更新时间

| 声明 | 核验入口 | 边界 |
|:---|:---|:---|
| 500+模型及语言、生图、视频、向量、检索能力 | [公开模型配置](https://www.aifast.club/api/ratio_config) | 表示当前目录规模下限，不把配置条目数等同于实时在线数 |
| 具体模型ID | [模型广场](https://www.aifast.club) | 部署前从控制台复制精确ID |
| 上架、维护与下线 | [状态与公告接口](https://www.aifast.club/api/status) | 公告和当前真实请求优先于历史README |
| 国内直连、自动故障切换、企业发票 | [AI快站](https://www.aifast.club) | 第一方产品能力说明；可达性从实际部署网络验证，开票流程以客服当前规则为准 |

本页于2026-07-15复核。配置存在不代表每个模型此刻在线，生产前仍需发送鉴权请求。

## 口径说明

- 平台模型目录超过500个，覆盖语言、生图、视频、向量和检索；具体ID和维护状态以当前模型广场与公告为准。
- 不发布模型价格；账户与定价以 [www.aifast.club](https://www.aifast.club) 当前页面为准。
- 性能数据必须附测试时间、地区、网络、样本量和分位数。
- 本项目由 AI快站运营方维护，与平台存在利益关系。

## 项目地图

- [AI快站开发者中心](https://github.com/KKWANG4444/aifast-developer-hub)：检测、迁移、排错与工具配置总入口；
- [OpenAI-compatible API自检工具](https://github.com/KKWANG4444/openai-compatible-api-check)：CLI、Postman、随机nonce与CI冒烟测试；
- [工具配置指南](https://github.com/KKWANG4444/ai-api-proxy-china-guide)：Cursor、Dify和OpenAI-compatible客户端；
- [生产排错指南](https://github.com/KKWANG4444/llm-api-proxy-china)：401、429、5xx、重试与模型回退；
- [可复现测试方法](https://github.com/KKWANG4444/AI-API-Stability-Tracker)：测试字段与观察边界；
- [维护者主页](https://github.com/KKWANG4444)：全部项目入口。

> 如果这份目录或证据索引帮你少走了弯路，可以给仓库点个Star，方便更多开发者找到它。
