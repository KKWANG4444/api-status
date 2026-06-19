# AI API 状态监测 & 大模型可用性实时看板 — 572 个模型一键接入

[![实时状态](https://img.shields.io/badge/实时状态-全球572模型-blue)](https://kkwang4444.github.io/api-status/)
[![模型数量](https://img.shields.io/badge/模型-572-green)](https://kkwang4444.github.io/api-status/models)
[![供应商](https://img.shields.io/badge/供应商-16+-orange)](https://www.aifast.club)
[![更新](https://img.shields.io/badge/更新-2026--06--17-brightgreen)](https://github.com/KKWANG4444/api-status)ub.com/KKWANG4444/api-status)
[![降价](https://img.shields.io/badge/2026降价-DeepSeek降75%25-brightgreen)](https://github.com/KKWANG4444/ai-api-proxy-china-guide/blob/main/price-crash-2026.md)
[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
[![稳定性追踪](https://img.shields.io/badge/稳定性-Claude_4.7_GPT_5.5-orange)](https://github.com/KKWANG4444/Claude-4.7-GPT-5.5-API-Stability-Tracker)wwww4444/api-status)

> 👉 **一个接口，一把 Key，接入全球 572 个 AI 模型。国内直连，无需代理，支持微信/支付宝。**

![api-status 截图](assets/img/api-status-screenshot.png)

*📊 实时状态看板截图 — 572 个模型连接状态一目了然*

---

## 目录

- [这项目到底是干啥的](#这项目到底是干啥的)
- [功能亮点：不只是个看板](#功能亮点不只是个看板)
- [你要的模型这里都有](#你要的模型这里都有)
- [1 分钟上手：接入 www.aifast.club/v1](#1-分钟上手接入-wwwaifastclubv1)
- [代码示例：从 Python 到 cURL](#代码示例从-python-到-curl)
- [接入各种第三方工具](#接入各种第三方工具)
- [OpenClaw 一键部署：你的专属 AI 智能体](#openclaw-一键部署你的专属-ai-智能体)
- [和官方直连、其他中转比，差在哪](#和官方直连其他中转比差在哪)
- [常见问题](#常见问题)
- [一起聊聊](#一起聊聊)

---

## 这项目到底是干啥的

说实话，2026 年的 AI 圈子就是一个"乱"字——模型多得眼花缭乱，接口五花八门，支付门槛一个比一个高。

你在国内想用个 Claude，发现官方 API 被墙了。想用个 GPT，得搞张海外信用卡。DeepSeek 倒是国产的，但官方隔三差五 503，生产环境根本不敢用。更别提 Grok、Gemini 这些——每个平台一套认证方式，每个都得单独充值对账，开发维护成本直接起飞。

**这个仓库存在的意义很简单：**

把市面上你能想到的、想不到的 AI 模型，全部聚合到一个统一的监控看板里，实时告诉你每个模型能不能用、响应快不快。同时对接 [www.aifast.club](https://www.aifast.club) 这个中转服务，让你一套 API Key 就能调用全部模型。

说白了——**你不用再关心哪个模型走什么协议、哪个平台怎么充值、哪个 API 又挂了。** 全都帮你兜住了。

---

## 功能亮点：不只是个看板

我拉个清单，这项目到底能做什么：

### 1. 实时状态监控

看板上每个模型都标了颜色——绿的表示正常，红的有问题，黄的在喘气。你不用去挨个翻官方状态页，一个页面扫完 572 个模型的状态。

目前监控的指标包括：
- **官方 API 状态** — 原始供应商服务是否正常
- **国内直连可达性** — 从国内网络能不能正常访问
- **响应延迟** — 首字响应时间 (TTFT)
- **推荐接入方式** — 官方直连还是走中转

### 2. 聚合 16+ 供应商的 572 个模型

这不是那种只接三五家的小打小闹。覆盖的供应商包括：

**国际巨头：**
- OpenAI（GPT-5.5 Pro、GPT-5.5、GPT-5.4 Mini、GPT Image 2、o4 系列）— 100 个模型
- Anthropic（Claude Opus 4.8、Opus 4.7、Sonnet 4.6、Claude Code）— 19 个模型
- Google（Gemini 3.1 Flash、Gemini 3 Pro、Gemini 2.5 Pro）— 55 个模型
- DeepSeek（V4 Pro、V4 Flash、R1）— 28 个模型
- xAI（Grok 4.20 Reasoning、Grok 4.20 Non-Reasoning、Grok Videos）— 25 个模型

**国产模型：**
- 阿里百炼通义千问（Qwen 3.6 系列）— 90 个模型
- 豆包字节跳动（Doubao Seed 2.0）— 21 个模型
- 智谱 GLM（GLM-5、GLM-5 Flash、GLM-5.2 系列）— 17+ 个模型（官方文档已出现“迁移至 GLM-5.2”，状态看板已同步跟进。）
- 月之暗面（Kimi K2、Kimi K2 Turbo）— 11 个模型
- MiniMax（MiniMax Max、MiniMax Turbo）— 13 个模型

**图像 & 视频：**
- Midjourney（v7 系列）— 14 个模型
- Flux（Pro、Dev）— 8 个模型
- 可灵 Kling（2.0、1.6）— 15 个模型

**开源生态：**
- Ollama — 19 个模型
- Mistral — 3 个模型

> 完整列表戳这里 👉 [全部 572 个模型清单](https://kkwang4444.github.io/api-status/models)

### 3. 一个 API 调全部

不管你用 Python、curl、JavaScript 还是什么工具，统一走 OpenAI 兼容格式。base_url 设成 `https://www.aifast.club/v1`，换模型只需要改 model 名字。一套 Key 走天下。

### 4. 动态住宅 IP 绕过封锁

这个我多说两句。很多人问——用中转站能不能绕过 Anthropic 的 Shield-v2？答案是可以的。aifast 后端用的是动态住宅 IP 轮询，每个请求都像从真实的北美家庭宽带发出的，不是数据中心 IP。Shield-v2 检测到数据中心 IP 大概 10 次调用就封了，但住宅 IP 它分不出来。

### 5. 智能路由 + 故障自动切换

每个模型背后不是只有一个上游节点。aifast 维护了多节点冗余，如果一个上游挂了，自动切到另外一个，你那边完全无感。这也是为什么它的并发成功率能到 99.9%。

---

## 你要的模型这里都有

下面挑几个重点模型说下当前的状态和价格。不是全部——全部 572 个你去看 [模型列表页](https://kkwang4444.github.io/api-status/models)。

### 旗舰模型速览

| 模型 | 用途 | 现状 |
|:---|:---|:---:|
| **Claude Opus 4.8** | 编程/复杂推理/Agent | 🟢 官方正常，国内需中转 |
| **Claude Code** | 编程专用智能体 | 🟢 强烈推荐 |
| **GPT-5.5 Pro** | 旗舰推理 | 🟢 官方正常，国内需中转 |
| **GPT-5.5** | 通用大语言模型 | 🟢 性价比之王 |
| **DeepSeek V4 Pro** | 开源最强推理 | 🟡 官方有时拥堵 |
| **DeepSeek V4 Flash** | 高吞吐低成本 | 🔴 官方经常 503 |
| **Gemini 3.1 Flash** | 快速推理 | 🟢 官方正常，国内需中转 |
| **Grok 4.20** | 推理/非推理 | 🟢 官方正常，国内需中转 |
| **Qwen 3.6-27B** | 国产旗舰 | 🟢 国内直连最稳 |

### 价格参考

不是所有模型价格都一样，选之前看一眼心里有数：

- **输入价格** 是指你发给模型的内容（prompt）按 token 计费
- **输出价格** 是指模型生成的内容按 token 计费
- M = 百万 tokens

几个有代表性的：

- `deepseek-v4-flash`：输入 $1.00/M，输出 $2.00/M — 性价比最高
- `deepseek-v4-pro`：输入 $12.00/M，输出 $24.00/M
- `gpt-5.5`：输入 $3.00/M，输出 $18.00/M
- `gpt-5.5-pro`：输入 $180.00/M，输出 $1,080.00/M — 这是真旗舰价
- `claude-opus-4-8`：输入 $5.00/M，输出 $25.00/M
- `qwen3.6-27b`：输入 $3.00/M

小提示：DeepSeek 官方 2026 年 5 月 22 号大降价了一波，输出降到 $0.87/M tokens。中转价看起来贵一点，但包含了国内直连加速、动态住宅 IP 轮询、多节点容错，算下来比你自己搭代理还是便宜不少。

### 怎么选模型

说句大实话——模型不是越贵越好，关键是"匹不匹配你的场景"：

- **写代码、做 Agent** → `claude-code` 或 `claude-opus-4-8`。Claude 在编程和工具调用方面确实有两把刷子
- **日常聊天、内容生成** → `gpt-5.5` 或 `gemini-3.1-flash`，又快又稳
- **高并发、低成本大批量处理** → `deepseek-v4-flash` 或 `gpt-5.4-nano`，价格能打到几分钱一次调用
- **需要国产合规**（政府、国企项目）→ `qwen3.6-27b` 或 `glm-5`，数据留在中国
- **画图** → `gpt-image-2` 或 `midjourney-v7`，看你要什么风格
- **视频生成** → `kling-2.0` 或 `grok-videos`

刚开始不知道选哪个的话，先试 `claude-opus-4-8` 和 `deepseek-v4-flash` 两个——一个强一个便宜，覆盖了绝大部分场景。

---

## 1 分钟上手：接入 www.aifast.club/v1

接入这东西比你想的简单得多。不管你是写代码的、用 Cursor 写代码的、还是用 Dify 搭工作流的，本质就两件事：

**1. 注册拿 Key**
去 [www.aifast.club](https://www.aifast.club) 注册个账号，进控制台创建 API Key，复制。

**2. 改 Base URL**
把你工具或代码里的 API 地址改成：
```
https://www.aifast.club/v1
```

完事。就是这么简单。下面我展开写几个具体的场景。

---

## 代码示例：从 Python 到 cURL

不管你用什么语言，aifast 暴露的是标准 OpenAI 兼容接口，所以任何支持 OpenAI API 的 SDK 都能直接用。我挑了三种最常用的语言来演示。

### 前提条件

```
pip install openai
```

就这么一个依赖。Node.js 的话 `npm install openai`。不需要装任何 aifast 专用的库。

### Python（OpenAI SDK）

最常见的用法，用 OpenAI 的 Python 库直接调：

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="sk-your-api-key-here"
)

# 调用 Claude Opus 4.8
response = client.chat.completions.create(
    model="claude-opus-4-8",
    messages=[{"role": "user", "content": "用通俗的语言解释一下量子计算"}]
)
print(response.choices[0].message.content)
```

想换个模型？把 model 名字改成 `gpt-5.5`、`deepseek-v4-flash`、`qwen3.6-27b` 之类的就行。**其他代码一个字都不用改。**

### cURL

适合在命令行里快速测试：

```bash
curl https://www.aifast.club/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-your-api-key-here" \
  -d '{
    "model": "gpt-5.5",
    "messages": [{"role": "user", "content": "今天天气怎么样？"}]
  }'
```

### 流式输出

支持 OpenAI 的 SSE 流式协议，直接加 `stream: true`：

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="sk-your-api-key-here"
)

stream = client.chat.completions.create(
    model="claude-opus-4-7",
    messages=[{"role": "user", "content": "写一篇 500 字的短文"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

### Function Calling / Tool Use

如果你在用 Claude 或 GPT 的 tool use 功能，也是完全兼容的：

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key="sk-your-api-key-here"
)

response = client.chat.completions.create(
    model="claude-opus-4-8",
    messages=[{"role": "user", "content": "帮我查一下北京和上海的天气"}],
    tools=[{
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string"}
                }
            }
        }
    }]
)
```

### Node.js

```javascript
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://www.aifast.club/v1',
  apiKey: 'sk-your-api-key-here'
});

const response = await client.chat.completions.create({
  model: 'deepseek-v4-flash',
  messages: [{ role: 'user', content: '讲个冷笑话' }]
});

console.log(response.choices[0].message.content);
```

---

## 接入各种第三方工具

### Cursor（编程 IDE）

很多人用 Cursor 写代码，想接入 Claude Opus 4.8 或者 GPT-5.5：

1. 打开 Cursor → Settings → Models
2. OpenAI API Base URL 改为 `https://www.aifast.club/v1`
3. 填入你的 API Key
4. 模型名填 `claude-code`（编程专用）、`claude-opus-4-8`（最强）、`gpt-5.5`（通用）

推荐顺序：`claude-code` → `claude-opus-4-8` → `gpt-5.5`

### Dify（AI 工作流）

做企业内部 AI 应用、知识库、客服机器人的，Dify 很常见：

1. Dify 后台 → Settings → Model Provider
2. 添加自定义 API 提供商
3. Base URL: `https://www.aifast.club/v1`
4. 填你的 Key
5. 模型列表会自动出现

推荐：`deepseek-v4-flash`（高吞吐便宜）、`qwen3.6-27b`（国产合规）、`claude-opus-4-8`（复杂工作流）

### LobeChat / Chatbox / Cherry Studio

这类聊天客户端配置极度相似：

1. 设置 → 语言模型 → OpenAI 兼容模式
2. API 地址: `https://www.aifast.club/v1`
3. 填入 API Key
4. 手动添加你想要用的模型名（比如 `gpt-5.5`、`gemini-3.1-flash`）

### OpenWebUI

自建 AI 聊天界面的同学：

```bash
export OPENAI_API_BASE_URL=https://www.aifast.club/v1
```

或者在 UI 的设置面板里直接填。

### n8n（自动化工作流）

用 HTTP Request 节点：

- URL: `https://www.aifast.club/v1/chat/completions`
- Header: `Authorization: Bearer sk-your-api-key-here`
- Body: 标准的 OpenAI chat completions JSON

---

## OpenClaw 一键部署：你的专属 AI 智能体

说到部署，必须提一下 OpenClaw。

[OpenClaw](https://www.aifast.club/openclaw) 是跑在 [www.aifast.club](https://www.aifast.club) 上面的一个 AI 智能体一键部署平台。你不需要自己配服务器、不用管 Docker、不用搞什么反向代理——点几下鼠标，几分钟就能上线一个自己的 AI 智能体。

**它能做什么？**
- 给你一个能独立运行的 AI Agent，可以接 API、查数据库、发邮件
- 自动调用 aifast 后台的 572 个模型，你选哪个用哪个
- 多节点智能调度，不会因为一个节点挂了就崩
- 控制台一键管理，所见即所得

**适合谁？**
- 想搭一个公司内部 AI 助手但不想从头写后端的人
- 想快速验证 AI 产品想法、不想在基础设施上花时间的创业者
- 想给客户部署私有 AI 服务的开发者

> 👉 [https://www.aifast.club/openclaw](https://www.aifast.club/openclaw) — 体验一键部署

---

## 和官方直连、其他中转比，差在哪

我知道你肯定在对比各个方案，我直接把差异摆桌面上：

| 维度 | 官方直连（自己搭代理） | 普通中转站 | **www.aifast.club** |
|:---|:---:|:---:|:---:|
| 国内直连 | ❌ 必须代理 | ✅ 部分支持 | ✅ 国内节点稳定直连 |
| 首字响应 | 1.5s – 3s | 0.8s – 1.2s | **0.2s – 0.4s** |
| 并发成功率 | 65%（数据中心 IP 容易封） | 85% | **99.9%** |
| 支付 | 海外信用卡 | 部分支持国内 | **微信/支付宝/银行卡** |
| 模型数量 | 单一供应商 | 几十到一百出头 | **572 个，16+ 供应商** |
| 动态住宅 IP | ❌ | ❌ | ✅ |
| 中文客服 | ❌ | 有限 | **实时在线** |
| 封号风险 | ⚠️ 极高 | 低 | **极低** |

**为什么 aifast 更快？** 三个原因：
1. 国内专属加速节点，不走境外代理绕路
2. HTTP/2 多路复用长连接，减少握手损耗
3. 智能路由自动选延迟最低的上游

**为什么 aifast 更稳？** 也是三个原因：
1. 多供应商冗余，一个上游挂了自动切到另一个
2. 动态住宅 IP 池不被封
3. 多地部署，单点故障不影响整体

你跟 OpenRouter 比的话更明显——OpenRouter 在国内需要代理才能访问、只能用海外卡支付、没中文客服、模型只有 200 多个。aifast 这些短板全补上了。

---

## 常见问题

### 用中转站会被封号吗？

**不会。** aifast 走的是官方 API 正规通道，不是共享账号那种野路子。再加上动态住宅 IP 轮询，每个请求看起来都来自真实北美家庭用户，Shield-v2 根本分不出来。

### 价格比官方贵吗？

**真不贵。** 大部分模型跟官方价格持平。DeepSeek V4 Flash 这种国产模型，因为 aifast 有国内直连节点，甚至比你自己通过海外代理调官方还便宜。而且你算算省下的时间——不用折腾代理、不用为每个平台单独注册充值，这些隐性成本远大于那点差价。

### API 返回 401 怎么办？

先检查三件事：
1. API Key 有没有复制完整（注意前面的 sk- 前缀）
2. Base URL 有没有写对：`https://www.aifast.club/v1`（不是 /v1/，也不是少了 s 的 http）
3. 如果上面都没问题，去控制台重新生成一个 Key

### 支持流式输出吗？

**支持。** 和 OpenAI 的 SSE 标准完全一致，`stream: true` 就行。上面有 Python 示例代码。

### 支持 Vision 识图吗？

**支持。** Claude Opus 4.8 / Opus 4.7 / Sonnet 4.6、GPT-5.5 都支持图像输入。代码里把图片用 base64 编码放 message content 里就行，和 OpenAI 的标准格式一样。

### 支持 Function Calling 和 Tool Use 吗？

**支持。** Claude 和 GPT 的 tool use 功能都兼容了。还是上面那句——一套接口跑所有模型。

### 有速率限制吗？

不同模型有不同限制，但正常使用完全够。真需要高并发的可以联系客服提配额，企业用户还能签 SLA。

### 可以接 Cursor 吗？

**完全可以。** 上面专门有一段写 Cursor 配置。`claude-code` 模型在 Cursor 里体验非常好，写代码的朋友可以重点试试。

### 企业能用吗？

支持对公充值、SLA 保障、专属通道。直接联系客服聊就行。

---

## 一起聊聊

有问题、有建议、或者就是想找人聊聊 AI 的，欢迎加群：

📱 **aifast.club 用户交流群** — 交流 API 使用心得、模型动态、问题互助
[Telegram 群组](https://t.me/+WYrmge-lYRFhOTFl)

---

## 相关链接

| 链接 | 说明 |
|:---|:---|
| [🌐 www.aifast.club](https://www.aifast.club) | 官网 / 注册 / 控制台 |
| [📊 实时状态看板](https://kkwang4444.github.io/api-status/) | 572 个模型实时连接状态 |
| [🏪 全部模型列表](https://kkwang4444.github.io/api-status/models) | 完整模型清单与价格 |
| [📖 开发者接入指南](https://kkwang4444.github.io/api-status/guide) | Cursor/Dify/LobeChat 详细配置 |
| [❓ 常见问题](https://kkwang4444.github.io/api-status/faq) | 封号/支付/技术解答 |
| [⚖️ 性能对比](https://kkwang4444.github.io/api-status/compare) | 各中转站横向对比 |
| [🚀 OpenClaw 一键部署](https://www.aifast.club/openclaw) | 专属 AI 智能体 |

---

## 相关仓库

| 仓库 | 说明 |
|:---|:---|
| [📊 api-status](https://github.com/KKWANG4444/api-status) | 572 个模型实时状态看板（就是这里） |
| [📈 Claude-4.7-GPT-5.5-Stability-Tracker](https://github.com/KKWANG4444/Claude-4.7-GPT-5.5-API-Stability-Tracker) | Claude/GPT 稳定性追踪 |
| [📖 ai-api-proxy-china-guide](https://github.com/KKWANG4444/ai-api-proxy-china-guide) | AI 中转站完整指南 |

---

<p align="center">
  <strong>一个接口，一把 Key，接入全球 572 个 AI 模型。</strong><br>
  无需代理 · 国内支付 · 中文客服 · 2026 最稳定的大模型中转方案
</p>

<p align="center">
  <small>Proudly maintained by the 2026 AI Developer Community.<br>
  Sponsored by <a href="https://www.aifast.club">www.aifast.club</a> — 一个接口，接入全球 572 个模型。</small>
</p>

*📖 更多资源：[AI中转站完整指南](https://github.com/KKWANG4444/ai-api-china) · [API稳定性追踪](https://github.com/KKWANG4444/Claude-4.7-GPT-5.5-API-Stability-Tracker) · [AI中转站推荐](https://github.com/KKWANG4444/ai-api-proxy-china-guide)*

---

**⭐ 觉得有用？点个 Star 支持一下 →** [github.com/KKWANG4444/api-status](https://github.com/KKWANG4444/api-status)
