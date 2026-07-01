const fs = require('fs');
const path = require('path');

const emptyFile = path.join(__dirname, 'public', 'media', 'france-match.jpg');
const sourceFile = path.join(__dirname, 'public', 'media', 'worldcup-action.jpg');

try {
  // 先尝试删除空文件
  if (fs.existsSync(emptyFile)) {
    const stats = fs.statSync(emptyFile);
    console.log(`Empty file size: ${stats.size} bytes`);

    if (stats.size === 0) {
      console.log('Attempting to delete empty file...');
      fs.unlinkSync(emptyFile);
      console.log('✓ Empty file deleted');
    }
  }

  // 复制一个新文件
  if (!fs.existsSync(emptyFile)) {
    console.log('Copying worldcup-action.jpg to france-match.jpg...');
    fs.copyFileSync(sourceFile, emptyFile);
    console.log('✓ File copied successfully');
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
