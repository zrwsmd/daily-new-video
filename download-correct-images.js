const https = require('https');
const fs = require('fs');
const path = require('path');

// 重新下载匹配度更高的图片
const images = [
  // 国内新闻1 - 中共105周年 - 需要天安门/政府建筑
  {
    name: 'china-flag.jpg',
    url: 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'ceremony-hall.jpg',
    url: 'https://images.pexels.com/photos/2138126/pexels-photo-2138126.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻2 - 达沃斯论坛 - 需要大型会议/论坛场景
  {
    name: 'large-conference.jpg',
    url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'keynote-speech.jpg',
    url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国内新闻3 - C909客机 - 需要商用客机
  {
    name: 'airplane-sky.jpg',
    url: 'https://images.pexels.com/photos/62623/wing-plane-flying-airplane-62623.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'aircraft-landing.jpg',
    url: 'https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻1 - 日本外汇 - 需要日元/外汇/金融
  {
    name: 'japanese-yen.jpg',
    url: 'https://images.pexels.com/photos/6963098/pexels-photo-6963098.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'forex-trading.jpg',
    url: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  // 国际新闻2 - 欧美贸易 - 需要欧盟旗帜/货柜/贸易
  {
    name: 'eu-flags.jpg',
    url: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'container-port.jpg',
    url: 'https://images.pexels.com/photos/262353/pexels-photo-262353.jpeg?auto=compress&cs=tinysrgb&w=1920'
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
  console.log('开始下载更匹配的新闻图片...\n');

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
