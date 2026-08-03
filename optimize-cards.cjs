const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const files = [
    { in: 'replace arc.png', out: 'replace arc.webp' },
    { in: 'replace ridge.png', out: 'replace ridge.webp' },
    { in: 'replace vector.png', out: 'replace vector.webp' }
  ];

  for (const f of files) {
    const filePath = path.join(__dirname, 'src', 'assets', f.in);
    const outPath = path.join(__dirname, 'src', 'assets', f.out);
    
    try {
      const metadata = await sharp(filePath).metadata();
      
      // Resize long edge to 1000px, preserve aspect ratio
      let width = metadata.width;
      let height = metadata.height;
      
      if (width >= height && width > 1000) {
        width = 1000;
        height = null;
      } else if (height > width && height > 1000) {
        height = 1000;
        width = null;
      }
      
      await sharp(filePath)
        .resize({ width, height, withoutEnlargement: true })
        .webp({ quality: 90, alphaQuality: 100, effort: 6 })
        .toFile(outPath);
        
      const outStat = fs.statSync(outPath);
      console.log(`Optimized ${f.in}: ${(outStat.size/1024).toFixed(1)} KB`);
    } catch (e) {
      console.error(`Error processing ${f.in}: ${e.message}`);
    }
  }
}

run();
