#!/usr/bin/env python3
"""Generate consistent AIFast GitHub social previews from the approved logo."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1280, 640
FONT = Path("/System/Library/Fonts/STHeiti Medium.ttc")


def font(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT), size)


def fitted_font(draw: ImageDraw.ImageDraw, text: str, max_width: int, start: int = 58, minimum: int = 40) -> ImageFont.FreeTypeFont:
    for size in range(start, minimum - 1, -2):
        candidate = font(size)
        box = draw.textbbox((0, 0), text, font=candidate)
        if box[2] - box[0] <= max_width:
            return candidate
    return font(minimum)


def create_icon(source: Path, destination: Path) -> Image.Image:
    image = Image.open(source).convert("RGB")
    width, height = image.size
    left = int(width * 0.16)
    top = int(height * 0.04)
    right = int(width * 0.84)
    bottom = int(height * 0.69)
    cropped = image.crop((left, top, right, bottom))
    side = max(cropped.size)
    square = Image.new("RGB", (side, side), "#05070a")
    square.paste(cropped, ((side - cropped.width) // 2, (side - cropped.height) // 2))
    icon = square.resize((512, 512), Image.Resampling.LANCZOS)
    destination.parent.mkdir(parents=True, exist_ok=True)
    icon.save(destination, optimize=True)
    return icon


def preview(icon: Image.Image, title: str, subtitle: str, label: str, destination: Path) -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), "#0b1117")
    draw = ImageDraw.Draw(image)

    draw.rectangle((0, 0, 18, HEIGHT), fill="#22d3ee")
    draw.rectangle((18, 0, 26, HEIGHT), fill="#f97360")
    draw.rounded_rectangle((70, 58, 245, 102), radius=8, fill="#183039", outline="#2dd4bf", width=1)
    draw.text((92, 68), label, font=font(22), fill="#baf7ee")

    draw.text((72, 150), title, font=fitted_font(draw, title, 700), fill="#f8fafc")
    draw.text((74, 238), subtitle, font=font(30), fill="#a9c4ce")

    chips = ["可复现", "可验证", "可接入生产"]
    x = 74
    for chip in chips:
        box = draw.textbbox((0, 0), chip, font=font(22))
        chip_width = box[2] - box[0] + 42
        draw.rounded_rectangle((x, 326, x + chip_width, 374), radius=8, fill="#151f29", outline="#344452", width=1)
        draw.text((x + 21, 336), chip, font=font(22), fill="#d8e4e9")
        x += chip_width + 14

    draw.line((74, 474, 780, 474), fill="#263844", width=2)
    draw.text((74, 505), "99% 可用性口径 · 500+ 模型 · 国内直连 · 企业可开发票", font=font(22), fill="#fbbf8a")
    draw.text((74, 555), "www.aifast.club", font=font(25), fill="#67e8f9")

    icon_box = icon.resize((390, 390), Image.Resampling.LANCZOS)
    image.paste(icon_box, (842, 108))
    draw.rounded_rectangle((844, 510, 1226, 566), radius=8, fill="#101923", outline="#2f4858", width=1)
    draw.text((888, 523), "AI Fast Hub  ·  AI快站", font=font(24), fill="#f8fafc")

    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--logo-source", type=Path, required=True)
    parser.add_argument("--workspace", type=Path, required=True)
    args = parser.parse_args()

    icon = create_icon(args.logo_source, args.workspace / "api-status/assets/img/logo.png")
    jobs = [
        ("AI快站", "500+ 国内外大模型 API 统一接入", "品牌与证据", "api-status/assets/social-preview.png"),
        ("OpenAI Compatible 接入指南", "Cursor · Dify · Claude Code", "配置与迁移", "ai-api-proxy-china-guide/assets/social-preview.png"),
        ("401 / 429 / 5xx 生产排错", "API Doctor · 重试 · 显式回退", "诊断工具", "llm-api-proxy-china/assets/social-preview.png"),
        ("AI API 稳定性测试", "成功率 · P50/P95 · 错误分布", "可复现报告", "AI-API-Stability-Tracker/assets/social-preview.png"),
        ("AI快站开发者技术矩阵", "检测 · 接入 · 排错 · 稳定性", "开发者中心", "aifast-developer-hub/assets/social-preview.png"),
        ("大模型 API 兼容检测", "协议 · 元数据 · Token · 动态题", "开源检测", "aifast-model-check-kit/assets/social-preview.png"),
    ]
    for title, subtitle, label, relative in jobs:
        preview(icon, title, subtitle, label, args.workspace / relative)
    brand_preview = args.workspace / "api-status/assets/social-preview.png"
    shutil.copyfile(brand_preview, args.workspace / "api-status/assets/img/og-image.png")
    shutil.copyfile(brand_preview, args.workspace / "api-status/assets/img/github-social-preview.png")


if __name__ == "__main__":
    main()
