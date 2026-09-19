const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure destination directories exist
const dirs = [
  'agency/public',
  'agency/public/images/og',
  'agency/src/app'
];
dirs.forEach(d => {
  if (!fs.existsSync(d)) {
    fs.mkdirSync(d, { recursive: true });
  }
});

// ==========================================
// 1. BRAND ICON SVG (Master 512x512)
// ==========================================
// Centered N monogram with "Labs." dot
// N stem: x=113 to 333, dot cx=377, cy=354, r=22 (balanced width 286, centered at 256)
const iconSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1A1B23"/>
      <stop offset="100%" stop-color="#0A0B0E"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#CBFB45" stop-opacity="0.6"/>
      <stop offset="50%" stop-color="#2E3344" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#CBFB45" stop-opacity="0.2"/>
    </linearGradient>
    <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E2FF75"/>
      <stop offset="100%" stop-color="#CBFB45"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#CBFB45" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#CBFB45" stop-opacity="0"/>
    </radialGradient>
    <filter id="markShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#CBFB45" flood-opacity="0.28"/>
    </filter>
  </defs>

  <!-- Base Squircle -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="108" stroke="url(#borderGrad)" stroke-width="8"/>

  <!-- Subtle Radial Glow behind Mark -->
  <circle cx="256" cy="256" r="190" fill="url(#glow)"/>

  <!-- N Monogram with signature dot -->
  <g filter="url(#markShadow)">
    <path d="M 113 148 C 113 141.4 118.4 136 125 136 H 161 C 166.8 136 171.9 140.2 172.8 146 L 273.2 302 V 148 C 273.2 141.4 278.6 136 285.2 136 H 321 C 327.6 136 333 141.4 333 148 V 364 C 333 370.6 327.6 376 321 376 H 285.2 C 279.4 376 274.3 371.8 273.4 366 L 172.8 210 V 364 C 172.8 370.6 167.4 376 160.8 376 H 125 C 118.4 376 113 370.6 113 364 Z" fill="url(#limeGrad)"/>
    
    <!-- Iconic White Dot for 'Labs.' -->
    <circle cx="377" cy="354" r="22" fill="#FFFFFF"/>
  </g>
</svg>`;

// ==========================================
// 2. SOCIAL SHARING / OPEN GRAPH IMAGE SVG (1200x630)
// ==========================================
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ogBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E0F14"/>
      <stop offset="50%" stop-color="#090A0D"/>
      <stop offset="100%" stop-color="#07080B"/>
    </linearGradient>

    <!-- Top-right vibrant lime ambient aura -->
    <radialGradient id="auraTopRight" cx="95%" cy="10%" r="65%">
      <stop offset="0%" stop-color="#CBFB45" stop-opacity="0.14"/>
      <stop offset="50%" stop-color="#CBFB45" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#CBFB45" stop-opacity="0"/>
    </radialGradient>

    <!-- Bottom-left subtle cyan/blue aura for depth -->
    <radialGradient id="auraBottomLeft" cx="10%" cy="90%" r="55%">
      <stop offset="0%" stop-color="#243447" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#243447" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="limeTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E2FF75"/>
      <stop offset="100%" stop-color="#CBFB45"/>
    </linearGradient>

    <linearGradient id="bottomLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#CBFB45" stop-opacity="0"/>
      <stop offset="30%" stop-color="#CBFB45" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#CBFB45" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#CBFB45" stop-opacity="0"/>
    </linearGradient>

    <!-- Tech Grid Pattern -->
    <pattern id="techGrid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" stroke-opacity="0.025" stroke-width="1"/>
      <circle cx="60" cy="0" r="1.5" fill="#FFFFFF" fill-opacity="0.06"/>
    </pattern>
  </defs>

  <!-- Deep Obsidian Canvas -->
  <rect width="1200" height="630" fill="url(#ogBg)"/>
  <rect width="1200" height="630" fill="url(#techGrid)"/>
  <rect width="1200" height="630" fill="url(#auraTopRight)"/>
  <rect width="1200" height="630" fill="url(#auraBottomLeft)"/>

  <!-- Outer Card Bevel Border -->
  <rect x="24" y="24" width="1152" height="582" rx="28" fill="none" stroke="#FFFFFF" stroke-opacity="0.07" stroke-width="1.5"/>

  <!-- ================= HEADER SECTION ================= -->
  <!-- Brand Logo Pill -->
  <g transform="translate(80, 72)">
    <rect width="216" height="52" rx="26" fill="#171717" stroke="#2B2D35" stroke-width="1.5"/>
    <text x="32" y="33" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.5px">
      <tspan fill="#CBFB45">Northforge</tspan>
      <tspan fill="#FFFFFF"> Labs.</tspan>
    </text>
  </g>

  <!-- Status / Studio Tag Pill -->
  <g transform="translate(860, 72)">
    <rect width="260" height="48" rx="24" fill="#14151B" stroke="#262833" stroke-width="1.5"/>
    <!-- Glowing green live dot -->
    <circle cx="28" cy="24" r="5" fill="#CBFB45"/>
    <circle cx="28" cy="24" r="9" stroke="#CBFB45" stroke-opacity="0.4" stroke-width="1.5"/>
    <text x="46" y="29" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="13" font-weight="600" fill="#A1A1AA" letter-spacing="1.2px">
      TECHNOLOGY &amp; DESIGN
    </text>
  </g>

  <!-- ================= HERO CONTENT ================= -->
  <!-- Category Eyebrow -->
  <g transform="translate(80, 185)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="15" font-weight="700" fill="#CBFB45" letter-spacing="2.5px">
      ✦  DIGITAL PRODUCTS  •  BRAND IDENTITY  •  AI AUTOMATION
    </text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(80, 260)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-1.2px">
      Building Next-Generation
    </text>
    <text y="64" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="52" font-weight="800" letter-spacing="-1.2px">
      <tspan fill="#FFFFFF">Digital Products </tspan>
      <tspan fill="url(#limeTextGrad)">&amp; Brands.</tspan>
    </text>
  </g>

  <!-- Subheadline / Description -->
  <g transform="translate(80, 395)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="21" font-weight="400" fill="#9496A1" letter-spacing="-0.2px">
      We help ambitious companies design world-class software, craft iconic
    </text>
    <text y="32" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="21" font-weight="400" fill="#9496A1" letter-spacing="-0.2px">
      brand identities, and engineer intelligent autonomous AI workflows.
    </text>
  </g>

  <!-- ================= CAPABILITY PILLS ================= -->
  <g transform="translate(80, 480)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="220" height="42" rx="10" fill="#14151C" stroke="#252733" stroke-width="1"/>
    <text x="20" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#E4E4E7">
      <tspan fill="#CBFB45">✦ </tspan>Software Engineering
    </text>

    <!-- Pill 2 -->
    <rect x="236" y="0" width="196" height="42" rx="10" fill="#14151C" stroke="#252733" stroke-width="1"/>
    <text x="256" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#E4E4E7">
      <tspan fill="#CBFB45">✦ </tspan>UI/UX &amp; Product
    </text>

    <!-- Pill 3 -->
    <rect x="448" y="0" width="226" height="42" rx="10" fill="#14151C" stroke="#252733" stroke-width="1"/>
    <text x="468" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#E4E4E7">
      <tspan fill="#CBFB45">✦ </tspan>AI Systems &amp; Agents
    </text>

    <!-- Pill 4 -->
    <rect x="690" y="0" width="180" height="42" rx="10" fill="#14151C" stroke="#252733" stroke-width="1"/>
    <text x="710" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#E4E4E7">
      <tspan fill="#CBFB45">✦ </tspan>Brand Strategy
    </text>
  </g>

  <!-- ================= FOOTER SECTION ================= -->
  <!-- Glowing Bottom Accent Line -->
  <rect x="80" y="604" width="1040" height="2" fill="url(#bottomLineGrad)"/>

  <!-- Left: Domain -->
  <g transform="translate(80, 568)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="16" font-weight="700" fill="#CBFB45" letter-spacing="0.5px">
      northforgelabs.com
    </text>
  </g>

  <!-- Right: Location / Presence -->
  <g transform="translate(880, 568)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="15" font-weight="500" fill="#71717A" letter-spacing="0.2px">
      Global Engineering &amp; Creative Studio
    </text>
  </g>
</svg>`;

// Helper: Build Windows ICO buffer from PNG buffers
function buildIco(pngEntries) {
  const numImages = pngEntries.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // format: ICO
  header.writeUInt16LE(numImages, 4);

  let offset = 6 + (16 * numImages);
  const dirEntries = [];

  for (const item of pngEntries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit depth
    entry.writeUInt32LE(item.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngEntries.map(p => p.buffer)]);
}

async function run() {
  console.log('Generating Brand & SEO assets...');

  // 1. Write master SVG files
  fs.writeFileSync('agency/public/icon.svg', iconSvg, 'utf8');
  fs.writeFileSync('agency/src/app/icon.svg', iconSvg, 'utf8');
  console.log('✔ Created icon.svg in public/ and src/app/');

  // 2. Generate PNG raster icons
  const iconBuffer = Buffer.from(iconSvg);

  const sizes = [
    { size: 16, path: 'agency/public/favicon-16x16.png' },
    { size: 32, path: 'agency/public/favicon-32x32.png' },
    { size: 32, path: 'agency/src/app/icon.png' },
    { size: 180, path: 'agency/public/apple-touch-icon.png' },
    { size: 180, path: 'agency/src/app/apple-icon.png' },
    { size: 192, path: 'agency/public/icon-192x192.png' },
    { size: 512, path: 'agency/public/icon-512x512.png' }
  ];

  const pngBuffersForIco = [];

  for (const s of sizes) {
    const buf = await sharp(iconBuffer)
      .resize(s.size, s.size)
      .png()
      .toBuffer();
    fs.writeFileSync(s.path, buf);
    console.log(`✔ Generated ${s.path} (${s.size}x${s.size})`);

    if (s.size === 16 || s.size === 32) {
      if (!pngBuffersForIco.some(p => p.width === s.size)) {
        pngBuffersForIco.push({ width: s.size, height: s.size, buffer: buf });
      }
    }
  }

  // Also add 48x48 for ICO
  const buf48 = await sharp(iconBuffer)
    .resize(48, 48)
    .png()
    .toBuffer();
  pngBuffersForIco.push({ width: 48, height: 48, buffer: buf48 });

  // 3. Build & write multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = buildIco(pngBuffersForIco);
  fs.writeFileSync('agency/public/favicon.ico', icoBuffer);
  fs.writeFileSync('agency/src/app/favicon.ico', icoBuffer);
  console.log('✔ Generated multi-size favicon.ico in public/ and src/app/ (16, 32, 48px)');

  // 4. Generate Open Graph / Twitter Card Image (1200x630)
  const ogPngBuffer = await sharp(Buffer.from(ogSvg))
    .png({ quality: 95, compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync('agency/public/images/og/og-image.png', ogPngBuffer);
  fs.writeFileSync('agency/src/app/opengraph-image.png', ogPngBuffer);
  fs.writeFileSync('agency/src/app/twitter-image.png', ogPngBuffer);
  console.log('✔ Generated 1200x630 og-image.png, opengraph-image.png, twitter-image.png');

  console.log('\nAll assets generated successfully!');
}

run().catch(err => {
  console.error('Failed to generate assets:', err);
  process.exit(1);
});
