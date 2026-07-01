const https = require('https');
const fs = require('fs');
const path = require('path');

// 精心挑选真正匹配的图片
const images = [
  // 国内新闻1 - 中共105周年 - 需要红旗、天安门、纪念性场景
  {
    name: 'red-flag-sky.jpg',
    url: 'https://images.pexels.com/photos/3608056/pexels-photo-3608056.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'government-building.jpg',
    url: 'https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻2 - 达沃斯论坛 - 需要正式的大型国际会议
  {
    name: 'international-summit.jpg',
    url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'conference-speaker.jpg',
    url: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻3 - C909客机 - 需要白色商用客机
  {
    name: 'commercial-jet.jpg',
    url: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'airplane-flight.jpg',
    url: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻1 - 日本外汇 - 需要货币、股票、金融屏幕
  {
    name: 'currency-exchange.jpg',
    url: 'https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'stock-market.jpg',
    url: 'https://images.pexels.com/photos/6801647/pexels-photo-6801647.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻2 - 欧美贸易 - 需要集装箱、港口、国际贸易
  {
    name: 'shipping-containers.jpg',
    url: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'cargo-ship.jpg',
    url: 'https://images.pexels.com/photos/2144326/pexels-photo-2144326.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
];

const outputDir = path.join(__dirname, 'public', 'media');

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
  console.log('开始下载精准匹配的新闻图片...\n');

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
