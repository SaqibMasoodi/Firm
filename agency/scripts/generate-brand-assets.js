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
// 1. BRAND ANVIL ICON SVG
// Strict brand style:
// - Background: #171717 (exact brand black)
// - Icon: #CBFB45 (exact brand lime)
// - No glow, no shadows, no gradients, no extra effects
// ==========================================
const anvilIconSvg = `<svg width="512" height="512" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="5.2" fill="#171717"/>
  <g stroke="#CBFB45" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, -0.25)">
    <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
    <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
    <path d="M9 12v5" />
    <path d="M15 12v5" />
    <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
  </g>
</svg>`;

// ==========================================
// 2. SOCIAL SHARING / OPEN GRAPH IMAGE SVG (1200x630)
// Strict brand style:
// - Flat #171717 background
// - Brand colors: #CBFB45 (lime), #FFFFFF (white), #A3A3A3 (muted gray)
// - Flat cards, clean typography, NO glow, NO shadows, NO radial gradients
// ==========================================
const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Flat Dark Canvas -->
  <rect width="1200" height="630" fill="#171717"/>

  <!-- Subtle Clean Card Border -->
  <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="#2B2B2B" stroke-width="2"/>

  <!-- ================= HEADER SECTION ================= -->
  <!-- Brand Logo Pill with Anvil Icon -->
  <g transform="translate(80, 72)">
    <rect width="268" height="54" rx="27" fill="#1F1F1F" stroke="#333333" stroke-width="1.5"/>
    
    <!-- Anvil Icon Mark inside Pill -->
    <g transform="translate(18, 13) scale(1.15)" stroke="#CBFB45" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
      <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
      <path d="M9 12v5" />
      <path d="M15 12v5" />
      <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
    </g>

    <text x="56" y="34" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.3px">
      <tspan fill="#CBFB45">Northforge</tspan>
      <tspan fill="#FFFFFF"> Labs.</tspan>
    </text>
  </g>

  <!-- Studio Status Pill -->
  <g transform="translate(864, 72)">
    <rect width="256" height="54" rx="27" fill="#1F1F1F" stroke="#333333" stroke-width="1.5"/>
    <circle cx="28" cy="27" r="4.5" fill="#CBFB45"/>
    <text x="44" y="33" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="13" font-weight="600" fill="#A3A3A3" letter-spacing="1.5px">
      TECHNOLOGY &amp; DESIGN
    </text>
  </g>

  <!-- ================= HERO CONTENT ================= -->
  <!-- Category Eyebrow -->
  <g transform="translate(80, 195)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="15" font-weight="700" fill="#CBFB45" letter-spacing="2px">
      DIGITAL PRODUCTS  •  BRAND IDENTITY  •  AI AUTOMATION
    </text>
  </g>

  <!-- Main Headline -->
  <g transform="translate(80, 270)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-1.2px">
      Building Next-Generation
    </text>
    <text y="64" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="52" font-weight="800" fill="#FFFFFF" letter-spacing="-1.2px">
      Digital Products <tspan fill="#CBFB45">&amp; Brands.</tspan>
    </text>
  </g>

  <!-- Subheadline / Description -->
  <g transform="translate(80, 400)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="21" font-weight="400" fill="#A3A3A3" letter-spacing="-0.2px">
      We help ambitious companies design world-class software, craft iconic
    </text>
    <text y="32" font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="21" font-weight="400" fill="#A3A3A3" letter-spacing="-0.2px">
      brand identities, and engineer intelligent autonomous AI workflows.
    </text>
  </g>

  <!-- ================= CAPABILITY PILLS ================= -->
  <g transform="translate(80, 485)">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="220" height="42" rx="10" fill="#1F1F1F" stroke="#303030" stroke-width="1"/>
    <text x="20" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#EDEDED">
      <tspan fill="#CBFB45">✦ </tspan>Software Engineering
    </text>

    <!-- Pill 2 -->
    <rect x="236" y="0" width="196" height="42" rx="10" fill="#1F1F1F" stroke="#303030" stroke-width="1"/>
    <text x="256" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#EDEDED">
      <tspan fill="#CBFB45">✦ </tspan>UI/UX &amp; Product
    </text>

    <!-- Pill 3 -->
    <rect x="448" y="0" width="226" height="42" rx="10" fill="#1F1F1F" stroke="#303030" stroke-width="1"/>
    <text x="468" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#EDEDED">
      <tspan fill="#CBFB45">✦ </tspan>AI Systems &amp; Agents
    </text>

    <!-- Pill 4 -->
    <rect x="690" y="0" width="180" height="42" rx="10" fill="#1F1F1F" stroke="#303030" stroke-width="1"/>
    <text x="710" y="26" font-family="Segoe UI, Inter, sans-serif" font-size="14" font-weight="600" fill="#EDEDED">
      <tspan fill="#CBFB45">✦ </tspan>Brand Strategy
    </text>
  </g>

  <!-- ================= FOOTER SECTION ================= -->
  <!-- Left: Domain -->
  <g transform="translate(80, 568)">
    <text font-family="Segoe UI, Inter, -apple-system, BlinkMacSystemFont, Roboto, sans-serif" font-size="16" font-weight="700" fill="#CBFB45" letter-spacing="0.5px">
      northforgelabs.com
    </text>
  </g>

  <!-- Right: Studio Descriptor -->
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
  console.log('Generating Anvil Brand & Clean SEO assets...');

  // 1. Write master SVG files
  fs.writeFileSync('agency/public/icon.svg', anvilIconSvg, 'utf8');
  fs.writeFileSync('agency/src/app/icon.svg', anvilIconSvg, 'utf8');
  console.log('✔ Created anvil icon.svg in public/ and src/app/');

  // 2. Generate PNG raster icons
  const iconBuffer = Buffer.from(anvilIconSvg);

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

  if (!fs.existsSync('agency/public/images/og/og-image.png')) {
    fs.writeFileSync('agency/public/images/og/og-image.png', ogPngBuffer);
  }
  fs.writeFileSync('agency/src/app/opengraph-image.png', ogPngBuffer);
  fs.writeFileSync('agency/src/app/twitter-image.png', ogPngBuffer);
  console.log('✔ Generated clean 1200x630 og-image.png, opengraph-image.png, twitter-image.png');

  console.log('\nAll anvil assets generated successfully!');
}

run().catch(err => {
  console.error('Failed to generate assets:', err);
  process.exit(1);
});
