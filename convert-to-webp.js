const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const CONFIG = {
  inputFolder: path.join(__dirname, 'public', 'section-two'),
  quality: 80,
};

async function convertToWebP() {
  console.log('🎨 Starting WebP conversion...\n');
  console.log(`📁 Folder: ${CONFIG.inputFolder}`);
  console.log(`🎯 Quality: ${CONFIG.quality}%\n`);

  if (!fs.existsSync(CONFIG.inputFolder)) {
    console.error(`❌ Folder not found: ${CONFIG.inputFolder}`);
    process.exit(1);
  }

  const files = fs.readdirSync(CONFIG.inputFolder);
  const framesToConvert = files.filter(file => {
    return file.startsWith('frame_') && file.endsWith('.webp');
  });

  if (framesToConvert.length === 0) {
    console.log('⚠️  No frame files found to convert.');
    return;
  }

  console.log(`📊 Found ${framesToConvert.length} frames to convert\n`);

  let converted = 0;
  let totalSizeBefore = 0;
  let totalSizeAfter = 0;

  for (const file of framesToConvert) {
    const inputPath = path.join(CONFIG.inputFolder, file);
    const tempPath = path.join(CONFIG.inputFolder, `temp_${file}`);
    
    try {
      const statsBefore = fs.statSync(inputPath);
      totalSizeBefore += statsBefore.size;

      await sharp(inputPath)
        .webp({ quality: CONFIG.quality })
        .toFile(tempPath);

      const statsAfter = fs.statSync(tempPath);
      totalSizeAfter += statsAfter.size;

      fs.unlinkSync(inputPath);
      fs.renameSync(tempPath, inputPath);

      converted++;
      if (converted % 20 === 0) {
        console.log(`  ✓ Converted ${converted}/${framesToConvert.length} frames...`);
      }
    } catch (error) {
      console.error(`  ✗ Failed to convert ${file}: ${error.message}`);
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
  }

  console.log(`  ✓ Converted ${converted}/${framesToConvert.length} frames`);
  console.log('\n✅ Conversion complete!\n');
  console.log('📊 Summary:');
  console.log(`   - Successfully converted: ${converted} files`);
  
  const mbBefore = (totalSizeBefore / 1024 / 1024).toFixed(2);
  const mbAfter = (totalSizeAfter / 1024 / 1024).toFixed(2);
  const totalSavings = ((1 - totalSizeAfter / totalSizeBefore) * 100).toFixed(1);
  const savedMB = ((totalSizeBefore - totalSizeAfter) / 1024 / 1024).toFixed(2);
  
  console.log(`   - Total size before: ${mbBefore} MB`);
  console.log(`   - Total size after: ${mbAfter} MB`);
  console.log(`   - Total savings: ${totalSavings}% (${savedMB} MB)`);
}

try {
  require.resolve('sharp');
} catch (e) {
  console.error('❌ Error: sharp package is not installed.');
  console.error('\nPlease install it by running:');
  console.error('  npm install sharp\n');
  process.exit(1);
}

convertToWebP().catch(error => {
  console.error(`\n❌ Unexpected error: ${error.message}`);
  process.exit(1);
});
