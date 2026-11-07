const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeProjectsPngs() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'projects');
  if (!fs.existsSync(dir)) return;

  console.log('--- Optimizing Project Cutout Mockups (agency/public/images/projects) ---');
  let totalSaved = 0;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith('.png')) continue;
    const filePath = path.join(dir, file);
    const originalSize = fs.statSync(filePath).size;

    const buffer = await sharp(filePath)
      .resize({ width: 1400, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 85, effort: 8 })
      .toBuffer();

    if (buffer.length < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const saved = originalSize - buffer.length;
      totalSaved += saved;
      console.log(`✓ ${file}: ${(originalSize / 1024).toFixed(0)}KB -> ${(buffer.length / 1024).toFixed(0)}KB (-${(saved / 1024).toFixed(0)}KB)`);
    } else {
      console.log(`- ${file}: already optimal`);
    }
  }

  console.log(`Total saved in projects/: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB\n`);
}

async function optimizeTeamImages() {
  console.log('--- Optimizing Misencoded Team Images (PNG -> real WebP) ---');
  const teamFiles = [
    'team/aleem/introspective-night-in-a-messy-room.webp',
    'team/ifham/quiet-soldering-studio.webp',
    'team/ifham/quiet-soldering-workspace.webp',
  ];

  let totalSaved = 0;
  for (const rel of teamFiles) {
    const filePath = path.join(__dirname, '..', 'public', 'images', rel);
    if (!fs.existsSync(filePath)) continue;

    const originalSize = fs.statSync(filePath).size;
    const meta = await sharp(filePath).metadata();

    // If it's a PNG stored as .webp, re-encode as actual WebP
    if (meta.format === 'png') {
      const buffer = await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toBuffer();

      if (buffer.length < originalSize) {
        fs.writeFileSync(filePath, buffer);
        const saved = originalSize - buffer.length;
        totalSaved += saved;
        console.log(`✓ ${rel}: ${(originalSize / (1024 * 1024)).toFixed(2)}MB -> ${(buffer.length / 1024).toFixed(0)}KB (-${(saved / (1024 * 1024)).toFixed(2)}MB)`);
      }
    }
  }
  console.log(`Total saved in team/: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB\n`);
}

async function optimizeWolfCover() {
  console.log('--- Optimizing Cover Images ---');
  const wolfCover = path.join(__dirname, '..', 'public', 'images', 'our-work', 'wolf-adventures-kashmir', 'cover.png');
  if (fs.existsSync(wolfCover)) {
    const originalSize = fs.statSync(wolfCover).size;
    const buffer = await sharp(wolfCover)
      .resize({ width: 1600, withoutEnlargement: true })
      .png({ compressionLevel: 9, quality: 85, effort: 8 })
      .toBuffer();

    if (buffer.length < originalSize) {
      fs.writeFileSync(wolfCover, buffer);
      console.log(`✓ wolf-adventures cover.png: ${(originalSize / (1024 * 1024)).toFixed(2)}MB -> ${(buffer.length / 1024).toFixed(0)}KB (-${((originalSize - buffer.length) / (1024 * 1024)).toFixed(2)}MB)\n`);
    }
  }
}

async function main() {
  await optimizeProjectsPngs();
  await optimizeTeamImages();
  await optimizeWolfCover();
  console.log('Image optimization complete!');
}

main().catch(console.error);

