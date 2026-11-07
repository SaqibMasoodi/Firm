const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svg = `
<svg width="900" height="650" viewBox="0 0 900 650" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Soft device shadows -->
    <filter id="laptop-shadow" x="120" y="70" width="660" height="480" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="8" dy="24"/>
      <feGaussianBlur stdDeviation="28"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.08 0 0 0 0 0.09 0 0 0 0 0.12 0 0 0 0.22 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>

    <filter id="phone-shadow" x="60" y="160" width="340" height="460" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="12" dy="28"/>
      <feGaussianBlur stdDeviation="24"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.05 0 0 0 0 0.06 0 0 0 0 0.08 0 0 0 0.28 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>

    <linearGradient id="laptop-body" x1="180" y1="100" x2="720" y2="460" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2D3039"/>
      <stop offset="1" stop-color="#181A20"/>
    </linearGradient>

    <linearGradient id="screen-grad" x1="220" y1="120" x2="680" y2="420" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F8FAFC"/>
      <stop offset="1" stop-color="#EDF2F7"/>
    </linearGradient>

    <linearGradient id="phone-body" x1="100" y1="200" x2="300" y2="560" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1E2028"/>
      <stop offset="1" stop-color="#0E1015"/>
    </linearGradient>

    <linearGradient id="phone-screen" x1="115" y1="210" x2="285" y2="540" gradientUnits="userSpaceOnUse">
      <stop stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#F1F5F9"/>
    </linearGradient>
  </defs>

  <!-- LAPTOP MOCKUP -->
  <g filter="url(#laptop-shadow)" transform="rotate(-2 450 300)">
    <!-- Screen Bezel -->
    <rect x="200" y="100" width="500" height="330" rx="18" fill="url(#laptop-body)" stroke="#4A4E5A" stroke-width="2"/>
    <!-- Camera Dot -->
    <circle cx="450" cy="110" r="3.5" fill="#3D414D"/>
    <!-- Screen Display -->
    <rect x="214" y="122" width="472" height="294" rx="8" fill="url(#screen-grad)"/>

    <!-- Screen UI Elements -->
    <rect x="234" y="142" width="140" height="18" rx="4" fill="#CBD5E1"/>
    <rect x="234" y="170" width="220" height="10" rx="3" fill="#E2E8F0"/>
    <rect x="234" y="188" width="180" height="10" rx="3" fill="#E2E8F0"/>

    <!-- Screen Mockup Cards -->
    <rect x="234" y="218" width="130" height="80" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="246" y="230" width="60" height="8" rx="3" fill="#94A3B8"/>
    <rect x="246" y="246" width="90" height="6" rx="2" fill="#CBD5E1"/>
    <rect x="246" y="258" width="70" height="6" rx="2" fill="#E2E8F0"/>

    <rect x="380" y="218" width="130" height="80" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="392" y="230" width="70" height="8" rx="3" fill="#94A3B8"/>
    <rect x="392" y="246" width="90" height="6" rx="2" fill="#CBD5E1"/>
    <rect x="392" y="258" width="50" height="6" rx="2" fill="#E2E8F0"/>

    <rect x="526" y="218" width="144" height="178" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="542" y="236" width="90" height="10" rx="4" fill="#64748B"/>
    <rect x="542" y="258" width="112" height="8" rx="3" fill="#CBD5E1"/>
    <rect x="542" y="274" width="80" height="8" rx="3" fill="#E2E8F0"/>
    <circle cx="598" cy="340" r="28" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="1.5"/>

    <rect x="234" y="316" width="276" height="80" rx="8" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
    <rect x="246" y="330" width="100" height="8" rx="3" fill="#94A3B8"/>
    <path d="M 246 374 Q 280 340, 310 355 T 370 345 T 430 360 T 480 340" fill="none" stroke="#CBFB45" stroke-width="3" stroke-linecap="round"/>

    <!-- Laptop Base / Hinge -->
    <path d="M 160 430 L 740 430 C 748 430 754 434 750 440 L 730 450 C 726 452 720 454 712 454 L 188 454 C 180 454 174 452 170 450 L 150 440 C 146 434 152 430 160 430 Z" fill="#1C1E24" stroke="#4A4E5A" stroke-width="1.5"/>
    <rect x="410" y="430" width="80" height="6" rx="3" fill="#0F1014"/>
  </g>

  <!-- SMARTPHONE MOCKUP IN FOREGROUND -->
  <g filter="url(#phone-shadow)" transform="rotate(7 220 380)">
    <!-- Phone Chassis -->
    <rect x="110" y="190" width="180" height="360" rx="34" fill="url(#phone-body)" stroke="#3D414D" stroke-width="2.5"/>
    <!-- Phone Screen -->
    <rect x="118" y="198" width="164" height="344" rx="27" fill="url(#phone-screen)"/>
    <!-- Dynamic Island / Notch -->
    <rect x="168" y="206" width="64" height="14" rx="7" fill="#000000"/>
    <circle cx="218" cy="213" r="3" fill="#181A20"/>

    <!-- Phone Screen Content -->
    <rect x="134" y="234" width="70" height="10" rx="4" fill="#0F172A"/>
    <rect x="134" y="250" width="120" height="6" rx="2" fill="#94A3B8"/>

    <!-- Phone App Card 1 -->
    <rect x="130" y="270" width="140" height="84" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
    <rect x="140" y="282" width="60" height="8" rx="3" fill="#64748B"/>
    <rect x="140" y="296" width="90" height="6" rx="2" fill="#CBD5E1"/>
    <rect x="140" y="322" width="50" height="18" rx="9" fill="#CBFB45"/>

    <!-- Phone App Card 2 -->
    <rect x="130" y="364" width="140" height="130" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1"/>
    <rect x="140" y="378" width="75" height="8" rx="3" fill="#64748B"/>
    <rect x="140" y="394" width="115" height="6" rx="2" fill="#CBD5E1"/>
    <rect x="140" y="406" width="95" height="6" rx="2" fill="#E2E8F0"/>
    <circle cx="200" cy="454" r="22" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>

    <!-- Bottom Indicator -->
    <rect x="165" y="530" width="70" height="3.5" rx="2" fill="#000000"/>
  </g>

  <!-- PLACEHOLDER LABEL BADGE -->
  <g transform="translate(480, 520)">
    <rect x="0" y="0" width="270" height="34" rx="17" fill="#171717" fill-opacity="0.88"/>
    <text x="135" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#CBFB45" text-anchor="middle" letter-spacing="1">PNG CUTOUT PLACEHOLDER</text>
  </g>
</svg>
`;

async function run() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'projects');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const placeholderPath = path.join(dir, 'placeholder.png');
  await sharp(Buffer.from(svg))
    .png()
    .toFile(placeholderPath);
  console.log('Created placeholder.png');

  // Copy to all 6 project files if they do not exist
  const files = [
    'dashit.png',
    'dreamcabs.png',
    'pockethost.png',
    'merz-kashmir.png',
    'soulspeed-mc.png',
    'wolf-adventures.png',
  ];

  for (const file of files) {
    const dest = path.join(dir, file);
    fs.copyFileSync(placeholderPath, dest);
    console.log(`Initialized ${file}`);
  }
}

run().catch(console.error);

