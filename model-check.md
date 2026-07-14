---
layout: default
title: 大模型API中转站检测：排查降智、套壳与协议兼容问题
description: 免费检测公开HTTPS OpenAI Compatible API中转站，从模型声明、Token、动态题、SSE与工具调用等证据排查路由不一致、能力降级和协议兼容风险。
permalink: /model-check/
image: /assets/img/og-image.png
---

![大模型API中转站检测](https://docs.aifast.club/og-default.png)

拿到一个Claude、GPT或DeepSeek中转接口，最容易犯的错误是只问一句“你是谁”。模型自述会受系统提示、网关改写和角色设定影响，回答像某个模型，也不能证明底层身份。

[AI快站模型检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=api-status-page)采用另一种做法：把协议字段、响应模型、Token、随机动态题、SSE流式输出和工具调用放到同一份报告里。它适合筛查明显的路由差异、能力异常和兼容层缺陷，但不是模型厂商认证。

> 检测对象不限于AI快站。只要目标是公开HTTPS地址、使用Bearer API Key，并提供OpenAI Chat Completions兼容接口，就可以测试。

## 开始前准备什么

1. 从目标中转站创建一个临时、低额度API Key；
2. 从控制台或`/models`返回中复制准确的模型ID；
3. Base URL填写到版本路径，例如`https://api.example.com/v1`，不要附加`/models`或`/chat/completions`；
4. 先选快速模式，确认基础协议后再跑标准模式；
5. 检测结束后撤销临时Key。

检测会向目标接口发送真实模型请求，可能按目标中转站的计费规则产生少量Token费用。快速模式约3次请求；标准模式约7次请求，并增加输出风格、知识边界、SSE和工具调用探针。

## 报告重点看什么

### 请求模型与响应模型

请求的模型ID和响应`model`字段持续不同，可能来自模型别名、网关改写或实际路由变化。这个字段本身也能被网关改写，因此它是一条一致性证据，不是身份证明。

### Token与元数据

`usage`长期缺失、输入输出Token为负数、总Token算术不一致，或者`id`、`object`、`created`等关键字段大量缺失，说明协议兼容性或计费透明度值得继续排查。

### R1随机动态题

服务端每次随机生成参数和nonce，并精确核对答案与随机值。动态题比固定题更难被提前适配，但它仍然只反映本轮行为，不能单独证明模型来源。

### SSE流式输出

标准模式会检查`text/event-stream`、增量事件、结束标记、拼接结果以及流式usage是否可识别。普通聊天成功而SSE失败，通常更像兼容层问题，不应直接下结论说模型被替换。

### 工具调用

检测会要求模型调用一个带JSON Schema的固定函数，并核对工具名、参数结构与随机nonce。目标站如果没有完整实现工具调用，可能在这里失败；这说明该能力不适合直接投入生产，但不自动等于“套壳”。

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

需要比较多个中转站时，保持模型、参数、地区、网络和业务题集一致，并在低峰、高峰各跑一次。真正有价值的是保存多次报告，看相同条件下的结果是否持续漂移。

## 隐私与协议边界

页面前端不使用`localStorage`或`sessionStorage`保存Key。Key只随本次`POST /api/model-check`请求发送；页面声明它不会写入URL、数据库、缓存或报告。为了降低风险，仍应使用临时限额Key并在检测后撤销。

当前固定探针只覆盖OpenAI Chat Completions兼容入口。Anthropic Messages、Gemini `generateContent`、OpenAI Responses API以及私有自定义协议不在检测范围内。

## 立即检测

- [运行大模型API中转站检测](https://docs.aifast.club/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=api-status-cta)
- [查看OpenAI-compatible迁移与排错](/api-status/openai-compatible/)
- [查看模型目录与维护状态](/api-status/models/)
- [查看声明与证据索引](/api-status/evidence/)

**披露：** 本页与检测工具由AI快站运营方维护。工具可以检测符合协议范围的第三方公开中转站。报告是兼容性与风险筛查结果，不属于OpenAI、Anthropic、Google、DeepSeek或其他模型厂商认证。
