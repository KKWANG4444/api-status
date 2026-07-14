---
layout: default
title: 大模型API中转站检测：排查降智、套壳与协议兼容问题
hero_title: 检测大模型 API 中转站的降智、套壳与兼容性风险
description: 免费检测公开HTTPS OpenAI Compatible API中转站，从模型声明、Token、随机动态题、SSE与工具调用等证据排查路由不一致、能力降级和协议兼容风险。
keywords: 大模型API中转站检测,模型降智检测,模型套壳检测,API中转站真假,OpenAI Compatible API检测,Claude API检测,GPT API检测,DeepSeek API检测,Token检测,SSE检测
permalink: /model-check/
image: /assets/img/og-image.png
---

<div class="matrix-intro">
  <div class="matrix-intro-copy">
    <strong>先验证接口，再决定是否迁移</strong>
    <p>只问模型“你是谁”几乎没有判断力。更可靠的做法是把协议结构、响应模型、Token、随机nonce、SSE和工具调用放在同一轮测试中交叉核对。在线工具支持符合协议范围的第三方公开中转站，不要求使用AI快站。</p>
  </div>
  <a class="tool-preview" href="https://docs.aifast.club/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=preview" aria-label="打开大模型API中转站检测工具">
    <img src="{{ '/assets/img/model-check-preview.jpg' | relative_url }}" alt="大模型API中转站在线检测工具界面" width="1280" height="720">
  </a>
</div>

## 根据你的使用场景选择入口

<div class="matrix-grid">
  <a class="matrix-card" href="https://docs.aifast.club/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=matrix-online"><small>浏览器检测</small><strong>在线生成完整报告</strong><span>适合第一次检查第三方中转站，覆盖模型声明、Token、动态题、SSE、工具调用和分项证据。</span><em>立即运行检测 →</em></a>
  <a class="matrix-card" href="https://github.com/KKWANG4444/openai-compatible-api-check"><small>开源工具</small><strong>CLI、Postman 与 GitHub Actions</strong><span>适合开发者在本地或CI中复测。使用随机nonce，HTTP 200但内容不匹配仍会退出失败。</span><em>查看源码与用法 →</em></a>
  <a class="matrix-card" href="https://github.com/KKWANG4444/llm-api-proxy-china"><small>生产排错</small><strong>401、429、5xx 与回退策略</strong><span>基础调用失败时，按鉴权、模型ID、限流、重试和流式输出顺序定位问题。</span><em>查看排错仓库 →</em></a>
  <a class="matrix-card" href="https://github.com/KKWANG4444/ai-api-proxy-china-guide"><small>客户端配置</small><strong>Cursor、Dify、Claude Code 等工具</strong><span>接口通过后，再按客户端填写Base URL、API Key和模型ID，逐项启用高级能力。</span><em>查看配置指南 →</em></a>
</div>

<div class="path-strip" aria-label="模型接口验证路径">
  <div><strong>01 临时凭据</strong><span>创建低额度临时Key，测试后立即撤销。</span></div>
  <div><strong>02 基础协议</strong><span>检查鉴权、模型列表和Chat Completions。</span></div>
  <div><strong>03 能力证据</strong><span>核对nonce、Token、SSE、tools和动态题。</span></div>
  <div><strong>04 业务复测</strong><span>使用自己的题集，在低峰与高峰重复测试。</span></div>
</div>

> **检测边界：** 这是一套黑盒协议与行为筛查，不是OpenAI、Anthropic、Google、DeepSeek或其他模型厂商认证。网关可以改写`model`等元数据，单轮行为也可能受系统提示、路由和采样影响。

## 开始前准备什么

1. 从目标中转站创建一个临时、低额度API Key；
2. 从控制台或`/models`返回中复制准确的模型ID；
3. Base URL填写到版本路径，例如`https://api.example.com/v1`，不要附加`/models`或`/chat/completions`；
4. 先选快速模式确认基础协议，再运行标准模式；
5. 检测结束后撤销临时Key。

检测会向目标接口发送真实模型请求，可能按目标中转站的计费规则产生少量Token费用。快速模式约3次请求；标准模式约7次请求，并增加输出风格、知识边界、SSE和工具调用探针。

## 报告重点看什么

### 请求模型与响应模型

请求的模型ID和响应`model`字段持续不同，可能来自模型别名、网关改写或实际路由变化。该字段本身也能被网关改写，因此它是一条一致性证据，不是身份证明。

### 固定指令与随机nonce

检测会要求模型原样返回本轮随机字符串。仅返回HTTP 200不算通过；内容为空、增加解释、改写标点或nonce不匹配，都说明当前接口无法稳定完成这项固定指令。

### Token与元数据

`usage`长期缺失、输入输出Token为负数、总Token算术不一致，或者`id`、`object`、`created`等关键字段大量缺失，说明协议兼容性或计费透明度值得继续排查。

### R1随机动态题

服务端每次随机生成参数和nonce，并精确核对答案与随机值。动态题比固定题更难被提前适配，但它仍只反映本轮行为，不能单独证明模型来源。

### SSE流式输出

标准模式会检查`text/event-stream`、增量事件、结束标记、拼接结果以及流式usage是否可识别。普通聊天成功而SSE失败，通常更像兼容层问题，不应直接下结论说模型被替换。

### 工具调用

检测会要求模型调用一个带JSON Schema的固定函数，并核对工具名、参数结构与随机nonce。目标站如果没有完整实现工具调用，可能在这里失败；这说明该能力不适合直接投入生产，但不自动等于“套壳”。

## 把基础检测放进CI

独立开源仓库提供无第三方运行时依赖的Node.js CLI、Postman Collection和Node 20/22 GitHub Actions示例。API Key只从环境变量读取，不接受命令行明文Key。

```bash
git clone https://github.com/KKWANG4444/openai-compatible-api-check.git
cd openai-compatible-api-check
export OPENAI_API_KEY="你的临时限额Key"
node bin/model-api-check.mjs \
  --base-url https://api.example.com/v1 \
  --model your-model-id \
  --output reports/check.md
```

CLI只覆盖模型列表、Chat Completions、响应模型、随机nonce和Token字段。需要SSE、工具调用、动态题与更完整证据时，仍应使用[在线标准检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=cli-section)。

## 分数怎么解释

| 分数 | 含义 | 下一步 |
| :---: | :--- | :--- |
| 85–100 | 本轮大部分协议与能力探针通过 | 再跑真实业务题集和多时段测试 |
| 65–84 | 基础调用可能可用，但部分字段或能力有差异 | 查看失败项，分别复测SSE、tools和usage |
| 0–64 | 认证、协议或关键能力存在明显异常 | 暂缓生产接入，保留报告并向服务商核实 |

总分是接口综合兼容度，不是模型“真假分”。单轮高分不代表生产环境长期稳定，低分也可能由限流、临时维护、网关参数差异或模型本身不支持某项能力造成。

## 避免四个误判

- `/models`返回401、403、429或不公开，不等于模型造假；
- 单次风格和知识截止自述是弱信号，不参与兼容度评分；
- 响应`model`一致，不代表底层一定来自该厂商；
- 一次检测通过，不代表高并发、账单、延迟和长期路由都稳定。

比较多个中转站时，应保持模型、参数、地区、网络和业务题集一致，并在低峰、高峰各跑一次。真正有价值的是保存多次报告，看相同条件下的结果是否持续漂移。

## 隐私与协议边界

在线工具声明不会使用`localStorage`或`sessionStorage`保存Key。Key只随本次`POST /api/model-check`请求发送，不写入URL、数据库、缓存或报告。CLI同样不会把Key写入报告，并对恶意上游回显执行脱敏。即便如此，仍应使用临时限额Key并在检测后撤销。

当前固定探针只覆盖OpenAI Chat Completions兼容入口。Anthropic Messages、Gemini `generateContent`、OpenAI Responses API以及私有自定义协议不在这套固定探针范围内。

## 常见问题

### 模型检测能证明底层一定是官方模型吗？

不能。黑盒检测只能交叉核对协议、元数据和行为信号。报告可以暴露明显异常，但不是模型厂商认证，也不能仅凭单轮结果证明模型身份。

### 检测第三方中转站会保存API Key吗？

在线工具声明Key只用于本次检测，不写入URL、数据库、缓存或报告。建议始终创建临时限额Key，并在检测后撤销。

### HTTP 200是否代表接口兼容？

不代表。还需要核对随机nonce、响应结构、usage、SSE、工具调用和真实业务题集。HTTP成功但内容错误，在CLI中仍会返回失败退出码。

### 检测通过后可以直接投入生产吗？

不建议。生产上线还应测试并发、p50/p95延迟、429和5xx分布、重试、账单、数据条款以及不同时段的路由变化。

<div class="decision-band">
  <div><strong>先检测现有接口，再比较备用线路</strong><p>如果当前中转站结果不稳定，可保持相同模型、参数和题集，对其他线路运行同一套检测。</p></div>
  <div class="decision-actions"><a class="button button-primary" href="https://docs.aifast.club/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=bottom-primary">运行检测</a><a class="button button-secondary" href="https://www.aifast.club/pricing?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=bottom-secondary">查看AI快站模型与价格</a></div>
</div>

**披露：** 本页、在线检测工具和开源CLI由AI快站运营方维护。检测对象不限于AI快站；涉及AI快站能力与价格的内容属于第一方说明，生产选型仍应结合真实测试、服务条款和当前控制台信息。
