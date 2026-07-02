#!/usr/bin/env node

/**
 * 视频生成辅助脚本
 *
 * 使用方法：
 * 1. 直接指定已有的组合ID：
 *    node scripts/generate-video.js WorldCupNews
 *
 * 2. 指定输出文件名：
 *    node scripts/generate-video.js WorldCupNews worldcup-20260701.mp4
 *
 * 3. 列出所有可用的组合：
 *    node scripts/generate-video.js --list
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 解析命令行参数
const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log(`
视频生成工具

使用方法：
  node scripts/generate-video.js <CompositionID> [output.mp4]

参数：
  CompositionID  视频组合ID (如 WorldCupNews, DailyNews)
  output.mp4     输出文件名 (可选，默认为 out/<CompositionID>.mp4)

选项：
  --list, -l     列出所有可用的组合
  --help, -h     显示帮助信息

示例：
  node scripts/generate-video.js WorldCupNews
  node scripts/generate-video.js WorldCupNews custom-name.mp4
  node scripts/generate-video.js --list
  `);
  process.exit(0);
}

// 列出所有组合
if (args[0] === '--list' || args[0] === '-l') {
  console.log('列出所有可用的视频组合...\n');
  try {
    execSync('npx remotion compositions src/index.tsx', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
  } catch (error) {
    console.error('获取组合列表失败');
    process.exit(1);
  }
  process.exit(0);
}

// 渲染视频
const compositionId = args[0];
const outputFile = args[1] || `out/${compositionId}.mp4`;

console.log(`正在渲染视频...`);
console.log(`组合ID: ${compositionId}`);
console.log(`输出文件: ${outputFile}\n`);

try {
  // 确保输出目录存在
  const outputDir = path.dirname(path.resolve(__dirname, '..', outputFile));
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 执行渲染命令
  execSync(
    `npx remotion render src/index.tsx ${compositionId} ${outputFile}`,
    {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    }
  );

  console.log(`\n✅ 视频渲染完成！`);
  console.log(`📁 输出文件: ${outputFile}`);
} catch (error) {
  console.error('\n❌ 视频渲染失败');
  process.exit(1);
}
