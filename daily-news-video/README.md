# 每日新闻视频生成器

基于 Remotion 的自动化新闻视频生成工具，采用纯图文资料画面风格。

## 项目配置

- 分辨率: 1920x1080 (横屏)
- 目标时长: 3分钟
- 风格: 纯图表/图标/文字卡片（无配音）
- 日期: 2026-07-01

## 目录结构

```
daily-news-video/
├── config.json          # 项目配置
├── src/
│   ├── index.ts         # Remotion 入口
│   ├── DailyNews.tsx    # 主组件
│   ├── Intro.tsx        # 片头
│   ├── Outro.tsx        # 片尾
│   ├── SectionHeader.tsx # 章节标题
│   ├── StoryCard.tsx    # 新闻卡片
│   └── newsData.json    # 新闻数据
├── out/                 # 渲染输出
└── sources.md           # 新闻来源清单
```

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 预览视频

```bash
npm run dev
```

### 3. 渲染视频

```bash
npm run render
```

输出文件: `out/daily-news-20260701.mp4`

## 新闻来源

所有新闻来源均记录在 [sources.md](./sources.md) 文件中。

## 视觉素材

本项目采用纯图文资料风格：
- 图表可视化
- 图标 + 文字卡片
- 数据信息图
- 地图标注

**不使用**任何有版权风险的新闻照片或通稿图片。

## 发布前检查

- [ ] 核对所有数据准确性
- [ ] 检查来源链接可访问性
- [ ] 确认视觉素材均为免版权
- [ ] 人工审核内容合规性
