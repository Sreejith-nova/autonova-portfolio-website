const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  folderPath: path.join(__dirname, 'public', 'section-two'),
  targetExtension: '.webp',
  prefix: 'frame_',
  startIndex: 1,
  padding: 4,
};

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

function renameFrames() {
  console.log('🎬 Starting frame renaming process...\n');
  console.log(`📁 Target folder: ${CONFIG.folderPath}`);
  console.log(`📝 Format: ${CONFIG.prefix}XXXX${CONFIG.targetExtension}\n`);

  if (!fs.existsSync(CONFIG.folderPath)) {
    console.error(`❌ Error: Folder does not exist: ${CONFIG.folderPath}`);
    process.exit(1);
  }

  let files = fs.readdirSync(CONFIG.folderPath);
  files = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
  });

  if (files.length === 0) {
    console.log('⚠️  No image files found in the folder.');
    return;
  }

  files.sort((a, b) => {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  });

  console.log(`📊 Found ${files.length} image files to rename.\n`);
  console.log('Step 1: Renaming to temporary names...');
  
  const tempNames = [];
  files.forEach((file, index) => {
    const oldPath = path.join(CONFIG.folderPath, file);
    const tempName = `temp_${Date.now()}_${index}${path.extname(file)}`;
    const tempPath = path.join(CONFIG.folderPath, tempName);
    
    try {
      fs.renameSync(oldPath, tempPath);
      tempNames.push(tempName);
    } catch (error) {
      console.error(`  ✗ Failed to rename ${file}: ${error.message}`);
      process.exit(1);
    }
  });

  console.log('  ✓ Temporary rename complete\n');
  console.log('Step 2: Renaming to final sequential names...');
  
  tempNames.forEach((tempName, index) => {
    const tempPath = path.join(CONFIG.folderPath, tempName);
    const frameNumber = (CONFIG.startIndex + index).toString().padStart(CONFIG.padding, '0');
    const finalName = `${CONFIG.prefix}${frameNumber}${CONFIG.targetExtension}`;
    const finalPath = path.join(CONFIG.folderPath, finalName);
    
    try {
      fs.renameSync(tempPath, finalPath);
    } catch (error) {
      console.error(`  ✗ Failed to rename ${tempName}: ${error.message}`);
      process.exit(1);
    }
  });

  console.log('  ✓ Final rename complete\n');
  console.log('✅ All frames renamed successfully!');
  console.log(`\n📋 Summary:`);
  console.log(`   - Total files renamed: ${files.length}`);
  console.log(`   - Range: ${CONFIG.prefix}${CONFIG.startIndex.toString().padStart(CONFIG.padding, '0')}${CONFIG.targetExtension} to ${CONFIG.prefix}${(CONFIG.startIndex + files.length - 1).toString().padStart(CONFIG.padding, '0')}${CONFIG.targetExtension}`);
}

try {
  renameFrames();
} catch (error) {
  console.error(`\n❌ Unexpected error: ${error.message}`);
  process.exit(1);
}
