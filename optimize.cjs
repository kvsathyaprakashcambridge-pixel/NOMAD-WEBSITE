const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'src', 'assets');
const files = fs.readdirSync(dir);

const TARGETS = {
  hero: 1600,
  mode: 1200,
  variant: 900,
  thumbnail: 500
};

function getCategory(filename) {
  filename = filename.toLowerCase();
  if (filename.includes('hero')) return 'hero';
  if (filename.includes('mode') || filename.includes('view') || filename.includes('ridge') || filename.includes('vector')) return 'mode';
  if (filename.includes('variant') || filename.includes('module') || filename.includes('layer') || filename.includes('facet') || filename.includes('armor') || filename.includes('roll')) return 'mode'; // Treating product renders as modes
  return 'mode'; // Default fallback
}

async function run() {
  for (const file of files) {
    if (!file.match(/\.(png|jpe?g)$/i)) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    // Process files > 250KB or specific known heavy files
    if (stat.size > 250 * 1024) {
      const cat = getCategory(file);
      let maxWidth = TARGETS[cat];
      
      const parsed = path.parse(file);
      const outPath = path.join(dir, parsed.name + '.webp');
      
      console.log(`Processing ${file} (${(stat.size/1024).toFixed(1)} KB) -> ${outPath}`);
      
      try {
        const metadata = await sharp(filePath).metadata();
        let width = metadata.width;
        if (width > maxWidth) {
          width = maxWidth;
        }
        
        await sharp(filePath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 80, effort: 6 })
          .toFile(outPath);
          
        const outStat = fs.statSync(outPath);
        console.log(`  Done: ${(outStat.size/1024).toFixed(1)} KB`);
      } catch (e) {
        console.error(`  Error processing ${file}: ${e.message}`);
      }
    }
  }
}

run();
