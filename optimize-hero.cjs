const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const filePath = path.join(__dirname, 'src', 'assets', 'REPLACE-HERO.png');
  const outPath = path.join(__dirname, 'src', 'assets', 'REPLACE-HERO.webp');
  
  try {
    const metadata = await sharp(filePath).metadata();
    
    // Resize long edge to 1500px, preserve aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    
    if (width >= height && width > 1500) {
      width = 1500;
      height = null;
    } else if (height > width && height > 1500) {
      height = 1500;
      width = null;
    }
    
    await sharp(filePath)
      .resize({ width, height, withoutEnlargement: true })
      // High quality webp, max alpha quality, 
      // Near lossless transparency and 90 quality for rgb
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(outPath);
      
    const outStat = fs.statSync(outPath);
    console.log(`Hero image regenerated: ${(outStat.size/1024).toFixed(1)} KB`);
  } catch (e) {
    console.error(`Error processing hero: ${e.message}`);
  }
}

run();
