---
layout: default
title: 常见问题 - 中转站封号 API 401 报错 解答 | 国内直连AI API
permalink: /faq/
---

# ❓ 常见问题

---

## 🔒 封号相关

### Q：用中转站会被封号吗？
**不会。** [www.aifast.club](https://www.aifast.club) 使用的是官方 API 转发，而非账号共享。你的调用走的是正规 API 通道，不存在封号风险。

### Q：Claude 的 Shield-v2 检测怎么办？
aifast 使用全球动态住宅 IP 轮询技术，每个请求都来自真实的北美住宅 IP，完美绕过 Shield-v2 检测。

### Q：GPT 的 429/403 错误怎么解决？
官方 API 对非白名单区域会返回 429（限流）或 403（禁止）。aifast 通过国内中转节点转发，所有请求看起来都来自合法区域。

---

## 💰 支付相关

### Q：支持哪些支付方式？
**支持国内主流支付方式**（微信/支付宝/银行卡），无需海外信用卡。

### Q：有免费额度吗？
注册即送体验额度，具体以官网活动为准。

### Q：价格比官方贵吗？
**不贵。** aifast 的定价与官方基本持平，部分模型（如 DeepSeek V4 Flash）通过国内节点甚至比官方直连更便宜。

---

## ⚡ 技术相关

### Q：API 返回 401 怎么办？
- 检查 API Key 是否正确
- 确认 Base URL 是否设为 `https://www.aifast.club/v1`
- 到控制台重新生成 Key 试试

### Q：支持流式输出 (Stream) 吗？
**支持。** 兼容 OpenAI 的 SSE 流式协议，`stream: true` 即可。

### Q：支持 Function Calling / Tool Use 吗？
**支持。** Claude 和 GPT 的 tool use 功能完全兼容。

### Q：支持 Vision (识图) 吗？
**支持。** Claude Opus 4.7 / Sonnet 4.6 和 GPT-5.5 均支持图像输入。

### Q：有速率限制吗？
不同模型有不同限制（详见[模型页面](/api-status/models)），远高于个人使用需求。企业用户可联系客服提升配额。

---

## 🔄 其他

### Q：和 OpenRouter 比怎么样？

| 对比维度 | OpenRouter | **www.aifast.club** |
|:---|:---:|:---:|
| 国内直连 | ❌ 需要代理 | ✅ 国内节点直连 |
| 支付方式 | 海外卡 | 国内支付 |
| 中文客服 | ❌ | ✅ 实时在线 |
| 模型数量 | 200+ | **572** |
| 住宅 IP | ❌ | ✅ 动态住宅 IP |
| 响应速度 | 一般 | **0.2-0.4s TTFT** |

### Q：可以用来接入 Cursor 吗？
**完全可以。** 详见 [接入指南](/api-status/guide)。

### Q：有企业方案吗？
有。支持对公充值、SLA 保证、专属通道。联系客服即可。

---

<p align="center">
  👉 <a href="https://www.aifast.club"><strong>还有问题？来官网咨询客服 → www.aifast.club</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
