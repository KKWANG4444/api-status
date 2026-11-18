# Contributing

Thanks for helping improve AI API status, compatibility and evidence pages.

- Use the issue templates for reproducible bug reports or focused improvements.
- Include the exact command, expected result and redacted evidence when reporting API behavior.
- Never publish API keys, account data or unredacted response payloads.
- Keep pull requests small and explain how the change was verified.

## 香港站状态维护

- 独立观测由 `_ops/edge-monitor` 中的 Cloudflare Cron 产生，不持有 GitHub 凭据，不绑定主站路由；公网读取不会触发探测或模型生成。GitHub 的 `data/status.json` 是另一个观测点的历史存档，Gitee 只作内容镜像。
- 验收：`node --test tests/*.test.mjs`；检查独立 `/status.json` 的 `source`、`checked_at`、`expires_at`、`components`。独立 `/health` 只判断时效，超过 60 分钟为 `503`。GitHub 的 `Check independent HK observation` 在原探测运行结束后检查时效，也可手动运行；GitHub 调度本身暂停时不保证即时通知。
- 独立定时器逐次检查正式 Pages 存档；`github_archive.state` 从新鲜转为过期或无法读取时，在 Worker 日志记录警告。该字段不参与三个网站入口的 `overall`。默认不向个人邮箱或聊天软件推送。
- 部署只指定 `_ops/edge-monitor/wrangler.jsonc`。回滚时先回退指向独立源的页面变更，再回滚独立 Worker 版本；不要改主站、API Base URL 或删除原始 GitHub 存档。
