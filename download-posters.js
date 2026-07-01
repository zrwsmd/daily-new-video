const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 10部电影的高清海报链接（使用TMDB等公开来源）
const posters = [
  {
    name: 'poster1.jpg',
    title: '疯狂动物城2',
    url: 'https://image.tmdb.org/t/p/original/gKHE7qWhnlWvYVp4fQpn8ZpBJcG.jpg' // Zootopia 2
  },
  {
    name: 'poster2.jpg',
    title: '亲爱的你',
    url: 'https://image.tmdb.org/t/p/original/placeholder2.jpg' // Dear You - 需要找真实链接
  },
  {
    name: 'poster3.jpg',
    title: '阿凡达:火与灰',
    url: 'https://image.tmdb.org/t/p/original/placeholder3.jpg' // Avatar Fire and Ash
  },
  {
    name: 'poster4.jpg',
    title: '消失的她',
    url: 'https://image.tmdb.org/t/p/original/placeholder4.jpg'
  },
  {
    name: 'poster5.jpg',
    title: '寒战1994',
    url: 'https://image.tmdb.org/t/p/original/placeholder5.jpg'
  },
  {
    name: 'poster6.jpg',
    title: '冰雹玛丽计划',
    url: 'https://image.tmdb.org/t/p/original/placeholder6.jpg'
  },
  {
    name: 'poster7.jpg',
    title: '玩具总动员5',
    url: 'https://image.tmdb.org/t/p/original/placeholder7.jpg'
  },
  {
    name: 'poster8.jpg',
    title: '跳跳侠',
    url: 'https://image.tmdb.org/t/p/original/placeholder8.jpg'
  },
  {
    name: 'poster9.jpg',
    title: '狂暴',
    url: 'https://image.tmdb.org/t/p/original/placeholder9.jpg'
  },
  {
    name: 'poster10.jpg',
    title: '超级马里奥银河电影',
    url: 'https://image.tmdb.org/t/p/original/placeholder10.jpg'
  }
];

const outputDir = path.join(__dirname, 'public', 'posters');

// 确保目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(outputDir, filename);

    console.log(`正在下载: ${filename}...`);

    protocol.get(url, (response) => {
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
  console.log('开始下载电影海报...\n');

  for (const poster of posters) {
    try {
      await downloadImage(poster.url, poster.name);
    } catch (error) {
      console.error(`✗ 下载失败: ${poster.name} - ${error.message}`);
      console.log(`  电影: ${poster.title}`);
      console.log(`  URL: ${poster.url}\n`);
    }
  }

  console.log('\n海报下载完成!');
  console.log(`文件保存在: ${outputDir}`);
}

downloadAll().catch(console.error);
