const https = require('https');
const fs = require('fs');
const path = require('path');

// 使用 Pexels 免费图片 URL（这些是公开可用的图片）
const images = [
  {
    name: 'worldcup-stadium.jpg',
    url: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'worldcup-action.jpg',
    url: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'norway-celebration.jpg',
    url: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'norway-victory.jpg',
    url: 'https://images.pexels.com/photos/3991976/pexels-photo-3991976.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'haaland-goal.jpg',
    url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'haaland-celebration.jpg',
    url: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'viking-row.jpg',
    url: 'https://images.pexels.com/photos/3991969/pexels-photo-3991969.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'norway-fans.jpg',
    url: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'france-match.jpg',
    url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'mbappe-action.jpg',
    url: 'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'mbappe-celebration.jpg',
    url: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'mbappe-record.jpg',
    url: 'https://images.pexels.com/photos/269948/pexels-photo-269948.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'worldcup-bracket.jpg',
    url: 'https://images.pexels.com/photos/3628100/pexels-photo-3628100.jpeg?auto=compress&cs=tinysrgb&w=1920'
  },
  {
    name: 'worldcup-closing.jpg',
    url: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920'
  }
];

const outputDir = path.join(__dirname, 'public', 'media');

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(outputDir, filename);

    // 如果文件已存在，跳过
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} already exists, skipping...`);
      resolve();
      return;
    }

    console.log(`Downloading ${filename}...`);

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ ${filename} downloaded successfully`);
          resolve();
        });
      } else {
        fs.unlink(filepath, () => {});
        reject(new Error(`Failed to download ${filename}: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting download of World Cup images...\n');

  for (const image of images) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`✗ Error downloading ${image.name}:`, error.message);
    }
  }

  console.log('\n✓ All downloads complete!');
}

downloadAllImages();
