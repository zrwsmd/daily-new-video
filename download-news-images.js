const https = require('https');
const fs = require('fs');
const path = require('path');

// 今日新闻视频所需图片（从Pexels获取）
const images = [
  // 国内新闻1 - 中共105周年
  {
    name: 'tiananmen-square.jpg',
    url: 'https://images.pexels.com/photos/161401/forbidden-city-beijing-china-161401.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'government-meeting.jpg',
    url: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻2 - 达沃斯论坛
  {
    name: 'business-conference.jpg',
    url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'speaker-presentation.jpg',
    url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻3 - C909客机
  {
    name: 'commercial-aircraft.jpg',
    url: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'passenger-plane.jpg',
    url: 'https://images.pexels.com/photos/46148/aircraft-jet-landing-cloud-46148.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻1 - 日本外汇
  {
    name: 'currency-finance.jpg',
    url: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'financial-chart.jpg',
    url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻2 - 欧美贸易
  {
    name: 'european-flags.jpg',
    url: 'https://images.pexels.com/photos/3608056/pexels-photo-3608056.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'cargo-trade.jpg',
    url: 'https://images.pexels.com/photos/906494/pexels-photo-906494.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
];

const outputDir = path.join(__dirname, 'public', 'media');

// 确保目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);

    console.log(`正在下载: ${filename}...`);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ 已下载: ${filename}`);
          resolve();
        });
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // 处理重定向
        downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('开始下载新闻视频图片...\n');

  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`✗ 下载失败: ${image.name} - ${error.message}`);
      console.log(`  URL: ${image.url}\n`);
    }
  }

  console.log('\n图片下载完成!');
  console.log(`文件保存在: ${outputDir}`);
}

downloadAll().catch(console.error);
