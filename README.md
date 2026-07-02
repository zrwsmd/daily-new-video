# 视频生成项目

使用 Remotion 将文字内容转换为带字幕和图片的专业视频，支持新闻、教程、产品介绍等多种场景。

## ✨ 功能特点

- 📰 多镜头叙事结构，电视新闻播报风格
- 🖼️ 真实图片素材 + Ken Burns 动画效果
- 📝 专业字幕样式，分类标签和来源标注
- 🎬 自动渲染成 1080p MP4 视频
- ⚡ 基于 Remotion 框架，逐帧渲染
- 🔧 统一架构，添加新视频无需重复代码
- 🚀 辅助脚本和 npm scripts，简化工作流

## 🆕 重构亮点

**改进后的架构：**
- ✅ 统一的 `GenericVideo` 组件处理所有视频类型
- ✅ 自动兼容 `stories` 和 `segments` 两种数据格式
- ✅ 更新视频内容只需修改 JSON 文件，无需改代码
- ✅ 代码量减少 60%，更易维护

## 📦 安装

```bash
npm install
```

## 🚀 快速开始

### 方式1：使用 npm scripts（推荐）

```bash
# 列出所有可用的视频组合
npm run list

# 预览视频（交互式编辑器）
npm run studio

# 渲染世界杯新闻
npm run render:worldcup

# 渲染所有视频
npm run render:all
```

### 方式2：使用辅助脚本（更灵活）

```bash
# 列出所有组合
npm run generate -- --list

# 渲染指定视频
npm run generate WorldCupNews

# 自定义输出文件名
npm run generate WorldCupNews worldcup-20260701.mp4
```

## 📝 更新现有视频（最简单）

如果只是更新明天的新闻内容，只需：

1. **编辑数据文件**

```bash
# 编辑世界杯新闻数据
vim src/worldcupData.json
```

2. **重新渲染**

```bash
npm run render:worldcup
```

**不需要修改任何 TypeScript 代码！**

## ➕ 添加新视频类型

### 步骤1：创建数据文件

复制模板并编辑内容：

```bash
cp templates/video-data-template.json src/my-video-data.json
```

编辑 `src/my-video-data.json`：

```json
{
  "stories": [
    {
      "id": "story1",
      "category": "NBA新闻",
      "source": "ESPN",
      "shots": [
        {
          "image": "media/nba-game.jpg",
          "subtitle": "湖人队今日战胜勇士队",
          "durationSeconds": 5
        }
      ]
    }
  ]
}
```

### 步骤2：在 index.tsx 注册

打开 `src/index.tsx`，添加三处：

```typescript
// 1. 导入数据
import myVideoData from "./my-video-data.json";

// 2. 创建组件
const MyVideo: React.FC = () => <GenericVideo data={myVideoData} />;

// 3. 注册组合
const myVideoDuration = calculateDuration(myVideoData);

<Composition
  id="MyVideo"
  component={MyVideo}
  durationInFrames={myVideoDuration}
  fps={30}
  width={1920}
  height={1080}
/>
```

### 步骤3：渲染视频

```bash
npm run generate MyVideo
```

## 📂 项目结构

```
gen-video-project/
├── src/
│   ├── index.tsx                    # 主入口（组合注册）
│   ├── ShotCard.tsx                 # 镜头组件
│   ├── newsData.json                # 每日新闻数据
│   ├── worldcupData.json            # 世界杯新闻数据
│   └── videoData.json               # 其他视频数据
├── public/
│   └── media/                       # 图片资源目录
├── scripts/
│   └── generate-video.js            # 视频生成脚本
├── templates/
│   └── video-data-template.json     # 数据文件模板
├── docs/
│   └── REFACTORING-GUIDE.md         # 详细重构指南
└── out/                             # 输出目录
```

## 📊 数据格式

## 📊 数据格式

### JSON 结构

```json
{
  "stories": [
    {
      "id": "story1",
      "category": "分类标签",
      "source": "来源",
      "shots": [
        {
          "image": "media/image.jpg",
          "subtitle": "字幕内容",
          "durationSeconds": 5
        }
      ]
    }
  ]
}
```

### 字段说明

- `stories` / `segments`：视频段落数组（两种名称都支持）
- `id`：段落唯一标识
- `category`：分类标签（显示在视频左上角）
- `source`：来源（显示在视频左下角）
- `shots`：镜头数组
  - `image`：图片路径（相对于 `public/`）
  - `subtitle`：字幕文本
  - `durationSeconds`：持续秒数（建议 3-5 秒）

## 🎨 视频样式

### 字幕样式

- 底部居中黑色半透明背景条
- 白色粗体字幕，字号 34px
- 顶部左侧：新闻分类标签（金色边框）
- 顶部右侧：日期（2026年7月1日）
- 左下角：来源标注

### 镜头时长建议

- 单个镜头：3-5 秒
- 每条新闻：2-4 个镜头
- 总时长：根据内容调整

### 图片素材要求

- ✅ 使用免费商用图片（Pexels、Pixabay、Unsplash）
- ✅ 图片尺寸：1920x1080 或更高
- ✅ 与字幕内容高度匹配
- ⚠️ **重要：** 下载图片后必须验证内容（详见验证指南）

## 📺 可用的视频组合

| 组合ID | 描述 | 时长 |
|--------|------|------|
| DailyNews | 每日新闻 | 39秒 |
| WorldCupNews | 世界杯新闻 | 55秒 |
| TaiyuanNews | 太原新闻 | 42秒 |
| WorldCupJuly2 | 7月2日世界杯 | 32秒 |

运行 `npm run list` 查看最新列表。

## 🎥 视频规格

- **分辨率**：1920x1080 (Full HD)
- **帧率**：30 fps
- **格式**：MP4 (H.264 编码)
- **音频**：无（纯视觉内容）

## 💡 常见场景

### 场景1：每日新闻更新

```bash
# 1. 编辑数据文件
vim src/worldcupData.json

# 2. 重新渲染（自动命名）
npm run generate WorldCupNews worldcup-$(date +%Y%m%d).mp4
```

### 场景2：批量生成多个视频

```bash
for video in WorldCupNews DailyNews TaiyuanNews; do
  npm run generate $video "out/${video}-$(date +%Y%m%d).mp4"
done
```

### 场景3：快速预览和调试

```bash
# 启动交互式编辑器
npm run studio

# 在浏览器中实时预览和调整
```

## ❓ 常见问题

### Q: 渲染失败，提示找不到图片？

**解决：** 检查图片路径

```bash
# 确保图片存在
ls public/media/your-image.jpg

# JSON 中正确的路径格式
"image": "media/your-image.jpg"  # ✅ 相对于 public/
```

### Q: 如何加速渲染？

使用并发渲染：

```bash
npx remotion render src/index.tsx WorldCupNews out.mp4 --concurrency 8
```

### Q: 如何自定义视频样式？

编辑 `src/ShotCard.tsx` 文件，修改颜色、字体、布局等。

### Q: 支持哪些图片格式？

支持 JPG、PNG、WebP 等常见格式，建议使用 JPG（文件更小）。

## 📚 详细文档

- [重构指南](docs/REFACTORING-GUIDE.md) - 架构说明、最佳实践、添加新视频完整教程
- [图片验证流程](https://github.com/your-repo/blob/main/docs/image-verification.md) - 如何确保图文严格匹配

## 🛠️ 技术栈

- [Remotion](https://www.remotion.dev/) - React 视频渲染框架
- React 19 + TypeScript
- FFmpeg（自动安装）

## 📝 许可证

MIT

## 🙏 致谢

- [Remotion](https://www.remotion.dev/) - 强大的视频渲染框架
- [Pexels](https://www.pexels.com/) - 免费高质量图片
- [Unsplash](https://unsplash.com/) - 免费商用图片

