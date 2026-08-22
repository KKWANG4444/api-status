---
layout: default
title: AI快站 API 状态页：官网、文档与模型接口边缘可达性
description: 查看 AI快站官网、API文档和 OpenAI-compatible 模型接口的公开边缘探测结果，包含检查时间、HTTP状态和方法边界。
permalink: /status/
hero_title: AI快站 API 状态：公开边缘可达性
keywords: AI快站API状态,AIFast status,AI API status,OpenAI compatible API status,API可用性,API故障状态
---

这里展示由 GitHub Actions 定时生成的公开边缘探测结果。它回答的是：从公共网络访问官网、API 文档和模型列表入口时，DNS、TLS、HTTP 是否按预期返回。

它**不代表所有模型、账户额度、具体模型质量或固定 SLA**。模型是否可用，仍应以当前模型广场和你的实际请求为准。

<div class="decision-band">
  <div><strong>当前状态：{{ site.data.status.status | default: '等待首次探测' }}</strong><p>最近检查：{{ site.data.status.checked_at | default: '尚未生成' }}</p></div>
  <div class="decision-actions"><a class="button button-primary" href="https://docs.aifast.hk/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=status-page-check">运行模型检测</a><a class="button button-secondary" href="https://docs.aifast.hk/go/register/?source=github&amp;placement=api-status-status-register">注册使用</a></div>
</div>

## 当前组件

{% if site.data.status.components %}
| 组件 | 结果 | HTTP状态 | 检查耗时 | 检查时间 |
|:---|:---:|---:|---:|:---|
{% for component in site.data.status.components %}
| [{{ component.name }}]({{ component.url }}) | {% if component.ok %}✅ 正常{% else %}⚠️ 需检查{% endif %} | {{ component.status | default: '网络错误' }} | {{ component.elapsed_ms }} ms | {{ site.data.status.checked_at }} |
{% endfor %}
{% else %}
状态数据尚未生成。请等待 GitHub Actions 首次运行。
{% endif %}

## 方法与边界

- 官网入口预期返回 `200`；
- API 文档入口预期返回 `200`；
- `/v1/models` 不发送API Key，接受公开接口可能返回的 `200`、`401`或`403`，因为这些状态都说明公共边缘已经响应；
- 每次探测记录状态、响应时间、Content-Type和错误摘要；
- 探测不会保存或提交任何API Key，也不会声称底层模型全部可用。

完整原始数据：[status.json](/api-status/data/status.json)。探测脚本：[probe-edge.mjs](https://github.com/KKWANG4444/api-status/blob/main/scripts/probe-edge.mjs)。

## 遇到调用错误怎么办？

先看[OpenAI API状态检查](/api-status/openai-api-status-check/)，按 DNS/TLS、鉴权、路径、限流、上游错误的顺序保留证据；再用[在线模型检测](https://docs.aifast.hk/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=status-page-online-check)检查具体模型和协议能力。

> 这是公共边缘可达性观察，不是厂商认证、模型质量保证或支付/账户可用性承诺。动态状态以最新探测、控制台和实际请求为准。
