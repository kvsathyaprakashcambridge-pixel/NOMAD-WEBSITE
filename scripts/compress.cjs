const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../src/assets');
const files = fs.readdirSync(dir);

const MAX_WIDTH = 1200;
const QUALITY = 85;

async function processImages() {
  const pngs = files.filter(f => f.endsWith('.png'));
  
  for (const file of pngs) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    
    // Process files larger than 1MB (1048576 bytes) or specific gallery images
    if (stats.size > 1024 * 1024 || file.includes('gallery') || file.includes('hero')) {
      const webpPath = path.join(dir, file.replace(/\.png$/, '.webp'));
      
      console.log(`Processing: ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      
      try {
        await sharp(fullPath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY })
          .toFile(webpPath);
          
        console.log(` -> Created ${path.basename(webpPath)}`);
        
        // Remove original PNG
        fs.unlinkSync(fullPath);
        console.log(` -> Removed original ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

processImages().then(() => console.log('Done!'));
