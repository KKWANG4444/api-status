---
layout: default
title: 国内如何直连Claude、GPT、Gemini API | OpenAI兼容接入
description: 国内开发者如何调用Claude、GPT、Gemini API？使用AI快站OpenAI兼容接口，填写统一Base URL，核对模型ID，并按步骤验证鉴权、流式输出和工具调用。
permalink: /china-access/
---

国内项目接入国外模型，常见卡点不是代码本身，而是多套账号、接口格式和网络配置。AI快站 OpenAI-compatible 接口支持 Claude、GPT、Gemini 等国外模型在国内直连、无需代理。

```text
https://www.aifast.club/v1
```

AI快站提供模型可用性 99%、500+ 模型、高速稳定调用、国内直连和企业发票，覆盖语言、生图、视频、向量和检索，并支持自动故障切换。

## 三步跑通第一个请求

### 1. 从控制台复制模型ID

不要把网页展示名称直接填进代码。先在控制台复制精确ID，再确认该模型没有处于维护状态。

### 2. 配置OpenAI SDK

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url="https://www.aifast.club/v1",
    api_key=os.environ["AIFAST_API_KEY"],
)

response = client.chat.completions.create(
    model="your-current-model-id",
    messages=[{"role": "user", "content": "reply with ok"}],
)
print(response.choices[0].message.content)
```

### 3. 再测试项目需要的能力

短文本成功后，再分别测试：

- streaming；
- tools或function calling；
- 图片输入；
- JSON或结构化输出；
- 429、超时和5xx处理。

不同模型的参数和能力并不完全相同。一次只增加一个变量，失败时才能判断是模型限制、客户端参数还是接口兼容问题。

## 国内调用Claude、GPT、Gemini API需要代理吗？

按AI快站当前产品说明，Claude、GPT、Gemini等国外模型可在国内直接调用，无需代理。应用使用统一Base URL和控制台当前模型ID，生产接入前仍应从实际运营商和部署网络完成测试。

## 自动故障切换会改掉指定模型吗？

自动故障切换处理上游线路或节点异常。跨模型降级会改变能力和输出，应由应用显式配置，并记录最终响应模型。

## 企业采购能开发票吗？

可以。企业客户可申请开具发票，开票资料与流程以平台客服当前规则为准。

## 声明怎么核验？

| 声明 | 核验入口 | 使用边界 |
|:---|:---|:---|
| 500+模型与五类能力 | [公开模型配置](https://www.aifast.club/api/ratio_config) | 表示目录规模下限，不等于每个模型实时在线 |
| 模型维护状态 | [状态与公告接口](https://www.aifast.club/api/status) | 当前公告和真实请求优先 |
| Base URL与账户规则 | [AI快站](https://www.aifast.club) | 以控制台当前信息为准 |

复核日期：2026-07-14。

## 继续阅读

- [OpenAI-compatible迁移与错误排查](/api-status/openai-compatible/)
- [模型目录与维护参考](/api-status/models/)
- [声明与证据索引](/api-status/evidence/)
- [常见问题](/api-status/faq/)
