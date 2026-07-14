#!/usr/bin/env python3
"""Render repository-specific GitHub social previews from committed SVG sources."""

from __future__ import annotations

import argparse
import shutil
import subprocess
from pathlib import Path


PREVIEWS = (
    "api-status",
    "aifast-developer-hub",
    "openai-compatible-api-check",
    "ai-api-proxy-china-guide",
    "llm-api-proxy-china",
    "AI-API-Stability-Tracker",
)

FONT_CANDIDATES = (
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/STHeiti Medium.ttc"),
    Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"),
)


def find_font() -> Path:
    for candidate in FONT_CANDIDATES:
        if candidate.is_file():
            return candidate
    raise SystemExit("未找到可渲染中文的字体，请安装 Arial Unicode、STHeiti 或 Noto Sans CJK。")


def render(svg: Path, png: Path, magick: str, font: Path) -> None:
    if not svg.is_file():
        raise SystemExit(f"缺少预览图源文件：{svg}")
    subprocess.run(
        [magick, "-font", str(font), str(svg), "-background", "none", str(png)],
        check=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--workspace", type=Path, required=True)
    parser.add_argument(
        "--logo-source",
        type=Path,
        help="兼容旧调用保留；当前预览图以仓库内 SVG 为唯一设计源。",
    )
    args = parser.parse_args()

    magick = shutil.which("magick")
    if not magick:
        raise SystemExit("未找到 ImageMagick，请先安装 magick 命令。")
    font = find_font()

    for repository in PREVIEWS:
        assets = args.workspace / repository / "assets"
        render(assets / "social-preview.svg", assets / "social-preview.png", magick, font)

    brand_assets = args.workspace / "api-status" / "assets"
    brand_preview = brand_assets / "social-preview.png"
    image_assets = brand_assets / "img"
    shutil.copyfile(brand_preview, image_assets / "og-image.png")
    shutil.copyfile(brand_preview, image_assets / "github-social-preview.png")
    print(f"已生成 {len(PREVIEWS)} 张 1280x640 仓库预览图。")


if __name__ == "__main__":
    main()
