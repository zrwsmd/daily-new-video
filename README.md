# 每日新闻视频生成器

使用 Remotion 自动生成每日新闻视频，支持多镜头、字幕、真实图片素材。

## 功能特点

- 📰 多镜头新闻播报风格
- 🖼️ 真实图片素材 + Ken Burns 动画效果
- 📝 电视新闻风格字幕
- 🎬 自动渲染成 MP4 视频
- ⚡ 基于 Remotion 框架，逐帧渲染

## 安装

```bash
npm install
```

## 使用方法

### 1. 准备新闻数据

编辑 `src/newsData.json` 文件，按以下格式配置新闻内容：

```json
{
  "stories": [
    {
      "id": "story1",
      "category": "国内新闻",
      "source": "新华社",
      "shots": [
        {
          "image": "media/image1.jpg",
          "subtitle": "第一段字幕内容",
          "durationSeconds": 4
        },
        {
          "image": "media/image2.jpg",
          "subtitle": "第二段字幕内容",
          "durationSeconds": 3
        }
      ]
    }
  ]
}
```

### 2. 准备图片素材

将图片放到 `public/media/` 目录下，确保文件名与 `newsData.json` 中的路径一致。

**注意：** 
- 使用免费商用图片（Pexels、Pixabay、Unsplash）
- 图片建议尺寸：1920x1080 或更高
- JPG/PNG 格式

### 3. 预览视频

```bash
npx remotion studio
```

在浏览器中打开，实时预览视频效果。

### 4. 渲染视频

```bash
npx remotion render src/index.tsx DailyNews out/daily-news.mp4 --codec=h264
```

渲染后的视频会保存在 `out/` 目录。

## 项目结构

```
├── src/
│   ├── index.tsx          # 主入口，组合所有镜头
│   ├── ShotCard.tsx       # 单个镜头组件
│   └── newsData.json      # 新闻数据配置
├── public/
│   └── media/             # 图片素材目录
├── out/                   # 输出视频目录
└── remotion.config.ts     # Remotion 配置
```

## 设计规范

### 字幕样式
- 底部居中黑色半透明背景条
- 白色粗体字幕，字号 34px
- 顶部左侧：新闻分类标签
- 顶部右侧：日期
- 左下角：来源标注

### 镜头时长建议
- 单个镜头：3-5 秒
- 每条新闻：2-4 个镜头
- 总时长：根据新闻数量调整

### 图片素材要求
- 与新闻内容匹配
- 避免使用图标、图表、卡片布局
- 优先使用真实照片
- AI 生成素材需标注"AI合成"

## 示例

当前项目包含 3 条新闻示例：
1. 香港回归 29 周年（3 个镜头，10 秒）
2. 建党 105 周年大会（2 个镜头，10 秒）
3. 委内瑞拉地震（2 个镜头，10 秒）

总时长：30 秒

## 技术栈

- [Remotion](https://www.remotion.dev/) - 视频渲染框架
- React + TypeScript
- FFmpeg (自动安装)

## License

MIT
