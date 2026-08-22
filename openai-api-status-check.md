---
layout: default
title: OpenAI API 状态检查：区分接口故障、限流与本地配置错误
description: 用可复制的 curl 命令检查 OpenAI-compatible API 状态，区分 DNS/TLS、401鉴权、404路径、429限流、5xx上游故障和客户端超时。
permalink: /openai-api-status-check/
hero_title: OpenAI API 状态检查：5分钟定位接口故障
keywords: OpenAI API状态,OpenAI API故障,OpenAI API status,API中转站状态,API接口检测,401,404,429,502,503,504,OpenAI Compatible API检测
---

接口请求失败时，先不要立刻更换模型或重试几十次。下面这套检查只依赖 `curl`，用于判断问题发生在 **DNS/TLS、鉴权、路径、限流、上游服务还是客户端配置**。命令不会把密钥写进历史记录：密钥只从环境变量读取。

<div class="decision-band">
  <div><strong>先检查连接，再检查模型请求</strong><p>保留 HTTP 状态码、响应头、请求 ID 和错误正文，避免只凭“请求失败”猜原因。</p></div>
  <div class="decision-actions"><a class="button button-primary" href="https://docs.aifast.hk/model-check/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=model-check&amp;utm_content=status-check-online">运行在线检测</a><a class="button button-secondary" href="https://docs.aifast.hk/troubleshooting/api-errors/?utm_source=github&amp;utm_medium=pages&amp;utm_campaign=api-doctor&amp;utm_content=status-check-errors">查看错误手册</a></div>
</div>

## 第一步：确认 DNS、TLS 和基础连接

```bash
export OPENAI_BASE_URL="https://www.aifast.hk/v1"

curl -sS -o /dev/null \
  -w 'http=%{http_code} dns=%{time_namelookup}s connect=%{time_connect}s tls=%{time_appconnect}s total=%{time_total}s\n' \
  "${OPENAI_BASE_URL%/}/models"
```

如何判断：

- `Could not resolve host`：DNS 或域名配置问题；
- TLS 证书错误：证书链、系统时间或代理劫持问题；
- 能拿到 `401` 或 `403`：网络和 TLS 通常已经连通，下一步检查鉴权；
- `404`：域名可达，但 Base URL 或最终路径可能填错；
- `429`：请求已经到达服务端，当前触发频率、并发或账户额度限制；
- `5xx`：保留错误正文和请求 ID，再区分网关与上游模型故障。

## 第二步：检查鉴权和模型列表

```bash
export OPENAI_API_KEY="replace-with-a-limited-test-key"

curl -sS -D /tmp/aifast-models.headers \
  -o /tmp/aifast-models.json \
  -w 'http=%{http_code} total=%{time_total}s\n' \
  "${OPENAI_BASE_URL%/}/models" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}"
```

查看结果时不要公开 `/tmp/aifast-models.headers` 或响应正文，里面可能包含请求 ID、账户信息或内部错误细节。重点核对：

1. `Authorization` 是否确实使用 `Bearer`；
2. Key 前后是否有空格或换行；
3. Base URL 是否已经包含 `/v1`，客户端是否又自动追加一次；
4. 当前账户是否能看到准备调用的模型 ID。

## 第三步：发出最小文本请求

```bash
export MODEL_ID="your-current-model-id"

curl -sS -D /tmp/aifast-chat.headers \
  -o /tmp/aifast-chat.json \
  -w 'http=%{http_code} total=%{time_total}s\n' \
  "${OPENAI_BASE_URL%/}/chat/completions" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"${MODEL_ID}\",\"messages\":[{\"role\":\"user\",\"content\":\"Return only: ok\"}],\"stream\":false}"
```

这一步只验证最小的 Chat Completions 路径。你的项目如果使用 Responses、图片输入、SSE 或工具调用，还需要分别测试对应协议，不能用一次文本 `200` 代替完整兼容性验收。

## HTTP状态码快速判断

| 状态或现象 | 最可能的层级 | 先做什么 |
|:---|:---|:---|
| DNS失败 / TLS失败 | 网络或证书 | 核对域名、系统时间、代理和证书链 |
| 401 / 403 | 鉴权或权限 | 检查Bearer格式、Key、账户权限和请求头转发 |
| 404 / `/v1/v1` | 路径拼接 | 记录最终请求URL，确认客户端是否自动追加版本和端点 |
| `model_not_found` | 模型ID或账户可见性 | 从当前模型广场复制ID，不要凭展示名称猜ID |
| 429 | 频率、并发或额度 | 读取响应头，降低并发并使用带抖动退避 |
| 502 / 503 / 504 | 网关或上游 | 保留请求ID、时间、模型ID和错误正文后再重试 |
| 客户端超时但服务端有请求记录 | 客户端或网络链路 | 对齐客户端超时、反向代理超时和服务端处理时间 |

## 故障记录模板

提交给平台客服或团队排错时，至少记录以下信息，并把密钥和业务内容脱敏：

```text
时间（含时区）：
Base URL 与最终请求路径：
模型 ID：
HTTP 状态码：
请求 ID：
总耗时：
错误类型与脱敏正文：
是否稳定复现：
同一 Key 调用其他模型是否成功：
```

## 常见问题

### API状态页正常，为什么我的请求仍失败？

状态页说明公共服务或某类模型的已知状态，不能证明你的 Key、账户权限、模型 ID、请求路径和客户端配置都正确。应继续执行上面的鉴权与最小请求检查。

### 返回200是否说明模型和协议完全正常？

不能。一次文本请求只能证明该请求成功。生产前还应按实际工作负载验证流式事件、工具调用、图片输入、Token字段、并发、超时和回退行为。

### 429应该立即不断重试吗？

不应该。先读取错误正文和响应头，确认限制类型；使用有限次数的指数退避与随机抖动，避免同步重试放大拥塞。

## 继续检查

- [在线模型与协议检测](https://docs.aifast.hk/model-check/?utm_source=github&utm_medium=pages&utm_campaign=model-check&utm_content=status-check-bottom-online)
- [OpenAI-compatible迁移与排错](/api-status/openai-compatible/)
- [模型状态与维护信息](/api-status/models/)
- [生产错误排查手册](https://docs.aifast.hk/troubleshooting/api-errors/?utm_source=github&utm_medium=pages&utm_campaign=api-doctor&utm_content=status-check-bottom-errors)

> 本页提供可复现的黑盒诊断步骤，不代表任何模型厂商的官方状态认证。动态模型、账户、价格和维护状态以当前控制台、公告及实际请求为准。
