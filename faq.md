---
layout: default
title: AI API 常见问题 - 401 429 模型不存在与兼容性排查
permalink: /faq/
---

# ❓ 常见问题

## API 返回 401 怎么办？

- 检查 API Key 是否完整；
- 请求头应为 `Authorization: Bearer YOUR_KEY`；
- Base URL 使用 `https://www.aifast.club/v1`；
- 必要时在控制台重新创建 Key。

## 429 和 5xx 是否都应该重试？

不是。先读取响应正文：

- 429、超时和临时 5xx 可使用有上限的指数退避；
- 无效密钥、错误模型 ID、格式错误不应重复请求；
- 持续异常时查看最新维护公告，并测试同能力的其他已上架型号。

## 为什么配置里有模型，调用时却不可用？

配置存在不等于模型当前在线。模型可能处于维护状态；以模型广场、最新公告和当前真实请求为准。

## 支持流式输出吗？

OpenAI 兼容接口可使用 `stream: true`。不同模型和客户端的事件字段可能不同，上线前应验证完整流结束、错误处理和断线重连。

## 支持工具调用或图片输入吗？

取决于具体模型、路由和客户端。不要把某个供应商的能力自动套到全部模型上。建议按以下顺序测试：

1. 普通文本；
2. 流式文本；
3. 工具调用；
4. 图片或其他多模态输入。

## 如何选择模型？

从模型广场复制精确模型 ID，并按场景做小样本测试。示例：

- 通用任务：`gpt-5.6-terra`
- 编程：`claude-sonnet-5` 或 `kimi-k2.7-code`
- 高吞吐文本：`deepseek-v4-flash` 或 `gemini-3.5-flash`

这些只是当前目录中的示例，不是性能排名或可用性保证。

## 有哪些支付、配额或企业方案？

账户选项、支付方式、配额和商务能力可能调整，请以 [www.aifast.club](https://www.aifast.club) 控制台及客服的当前说明为准。本页不承诺固定价格、SLA、专线或响应时间。

---

<p align="center">
  👉 <a href="https://www.aifast.club"><strong>查看当前模型与账户信息 → www.aifast.club</strong></a>
</p>

[![Gitee镜像](https://img.shields.io/badge/Gitee-国内镜像-red)](https://gitee.com/kkwwww4444/api-status)
