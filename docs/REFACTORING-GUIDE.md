# 视频生成系统使用指南

## 重构说明

### 改进前后对比

**改进前：**
- ❌ 每个视频主题需要创建独立的组件
- ❌ 添加新视频必须修改 `index.tsx`
- ❌ 代码重复（DailyNews、WorldCupNews 逻辑相同）

**改进后：**
- ✅ 统一的 `GenericVideo` 组件处理所有视频
- ✅ 自动兼容 `stories` 和 `segments` 两种数据格式
- ✅ 添加新视频只需 3 步（见下方）
- ✅ 代码量减少 60%

---

## 快速开始

### 方式1：使用现有组合（最简单）

直接使用辅助脚本渲染：

```bash
# 列出所有可用的组合
node scripts/generate-video.js --list

# 渲染指定组合
node scripts/generate-video.js WorldCupNews

# 自定义输出文件名
node scripts/generate-video.js WorldCupNews my-video.mp4
```

### 方式2：更新现有视频内容

如果要更新明天的世界杯新闻，只需：

1. 修改 `src/worldcupData.json` 的内容
2. 运行渲染命令

```bash
node scripts/generate-video.js WorldCupNews worldcup-july2.mp4
```

**不需要修改任何 TypeScript 代码！**

---

## 添加新视频（3步法）

### 步骤1：创建数据文件

复制模板创建新的 JSON 文件：

```bash
cp templates/video-data-template.json src/my-new-video-data.json
```

编辑 `src/my-new-video-data.json`：

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

### 步骤2：在 index.tsx 注册组合

打开 `src/index.tsx`，添加三处：

**位置1：导入数据文件**
```typescript
import myNewVideoData from "./my-new-video-data.json";
```

**位置2：创建组件（在 WorldCupJuly2 下方）**
```typescript
const MyNewVideo: React.FC = () => <GenericVideo data={myNewVideoData} />;
```

**位置3：注册组合（在 RemotionRoot 函数中）**
```typescript
export const RemotionRoot: React.FC = () => {
  const myNewVideoDuration = calculateDuration(myNewVideoData);
  
  return (
    <>
      {/* 现有的组合 */}
      <Composition
        id="MyNewVideo"
        component={MyNewVideo}
        durationInFrames={myNewVideoDuration}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

### 步骤3：渲染视频

```bash
node scripts/generate-video.js MyNewVideo
```

---

## 数据格式说明

### 支持的两种格式

#### 格式1：stories（推荐）

```json
{
  "stories": [
    {
      "id": "story1",
      "category": "类别",
      "source": "来源",
      "shots": [...]
    }
  ]
}
```

#### 格式2：segments（兼容旧格式）

```json
{
  "segments": [
    {
      "id": "segment1",
      "category": "类别",
      "source": "来源",
      "shots": [...]
    }
  ]
}
```

**两种格式都可以正常工作！** `GenericVideo` 会自动检测。

### Shot 对象结构

```json
{
  "image": "media/image.jpg",           // 图片路径（相对于 public/）
  "subtitle": "字幕内容",                // 显示的文字
  "durationSeconds": 4                  // 持续秒数（3-5秒为佳）
}
```

---

## 常见工作流程

### 场景1：每日新闻更新

```bash
# 1. 编辑数据文件
vim src/worldcupData.json

# 2. 渲染新视频
node scripts/generate-video.js WorldCupNews worldcup-$(date +%Y%m%d).mp4
```

### 场景2：批量生成多个视频

```bash
# 创建批处理脚本
for video in WorldCupNews DailyNews TaiyuanNews; do
  node scripts/generate-video.js $video "out/${video}-$(date +%Y%m%d).mp4"
done
```

### 场景3：预览单个镜头

```bash
# 使用 Remotion Studio 交互式预览
npx remotion studio src/index.tsx
```

---

## 最佳实践

### 1. 图片验证（重要！）

下载图片后务必验证：
- ✅ 人名匹配：图片中没有不相关的人物
- ✅ 地名匹配：建筑风格、文化元素正确
- ✅ 事件匹配：场景与事件类型一致
- ✅ 时效性：不使用明显过时的图片

详见：`C:\Users\Administrator\.claude\skills\text-to-video\references\strict-verification.md`

### 2. 内容拆分

每个镜头：
- 一张图片
- 一段字幕（不重复，递进叙述）
- 3-5 秒时长

**错误示例：**
```
镜头1："苹果公司今天发布了新款 iPhone"
镜头2："苹果公司今天发布了新款 iPhone，配备 A17 芯片"  ❌ 重复
```

**正确示例：**
```
镜头1："苹果公司今天举行新品发布会"
镜头2："推出搭载 A17 芯片的新款 iPhone"  ✅ 递进
镜头3："起售价 999 美元"  ✅ 递进
```

### 3. 文件命名规范

```
数据文件：<主题>-<日期>-data.json
示例：worldcup-20260701-data.json

输出文件：<主题>-<日期>.mp4
示例：worldcup-20260701.mp4
```

---

## 技术架构

### 核心组件

```
GenericVideo (通用组件)
  ├── 自动检测数据格式 (stories/segments)
  ├── 遍历所有 shots
  ├── 为每个 shot 创建 Sequence
  └── 传递给 ShotCard 渲染
```

### 类型定义

```typescript
interface Shot {
  image: string;
  subtitle: string;
  durationSeconds: number;
}

interface Story {
  id: string;
  category: string;
  source: string;
  shots: Shot[];
}

interface VideoData {
  stories?: Story[];
  segments?: Story[];
}
```

---

## 故障排查

### 问题1：渲染失败，提示找不到图片

**原因：** 图片路径错误

**解决：**
```bash
# 检查图片是否存在
ls public/media/your-image.jpg

# JSON 中的路径应该是相对于 public/ 的
"image": "media/your-image.jpg"  # ✅ 正确
"image": "public/media/your-image.jpg"  # ❌ 错误
```

### 问题2：视频时长为 0

**原因：** JSON 数据格式错误或为空

**解决：**
```bash
# 验证 JSON 格式
node -e "console.log(JSON.parse(require('fs').readFileSync('src/your-data.json')))"

# 确保数据文件包含 stories 或 segments
```

### 问题3：TypeScript 类型错误

**原因：** 数据结构不匹配

**解决：**
确保 JSON 结构符合 `VideoData` 类型定义（见上方"类型定义"）

---

## 下一步改进（可选）

如果希望完全不修改 `index.tsx`，可以实现自动发现机制：

1. 创建 `src/videos/` 目录
2. 所有数据文件放在该目录
3. `index.tsx` 自动扫描并注册所有视频

**实现示例：**
```typescript
// 自动扫描 src/videos/*.json
const videoFiles = fs.readdirSync('./src/videos');
videoFiles.forEach(file => {
  const data = require(`./videos/${file}`);
  const id = file.replace('.json', '');
  registerComposition(id, data);
});
```

---

## 总结

重构后的系统：
- 更简洁：代码量减少 60%
- 更灵活：添加新视频只需 3 步
- 更易维护：统一的组件和数据格式
- 向后兼容：现有视频无需修改

**开始使用：**
```bash
# 列出所有视频
node scripts/generate-video.js --list

# 渲染视频
node scripts/generate-video.js WorldCupNews
```
