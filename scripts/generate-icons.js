const fs = require('fs');
const path = require('path');

// SVG content for Sekura logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00E5A0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3DD6F5;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0A0C14"/>
  <circle cx="50" cy="50" r="32" fill="none" stroke="url(#grad)" stroke-width="4"/>
  <path d="M 50 35 L 50 50 L 62 62" stroke="url(#grad)" stroke-width="4" stroke-linecap="round" fill="none"/>
  <circle cx="50" cy="50" r="5" fill="#00E5A0"/>
</svg>`;

// Screenshot content (app mockup)
const screenshotSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00E5A0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3DD6F5;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1920" fill="#0A0C14"/>
  
  <!-- Header -->
  <text x="540" y="150" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Sekura</text>
  
  <!-- Main icon -->
  <circle cx="540" cy="500" r="200" fill="none" stroke="url(#grad)" stroke-width="20"/>
  <path d="M 540 350 L 540 500 L 680 640" stroke="url(#grad)" stroke-width="20" stroke-linecap="round" fill="none"/>
  <circle cx="540" cy="500" r="30" fill="#00E5A0"/>
  
  <!-- Feature list -->
  <g transform="translate(140, 800)">
    <circle cx="30" cy="30" r="20" fill="#00E5A0"/>
    <text x="80" y="45" font-family="Arial" font-size="40" fill="white">Détection des menaces</text>
  </g>
  
  <g transform="translate(140, 950)">
    <circle cx="30" cy="30" r="20" fill="#00E5A0"/>
    <text x="80" y="45" font-family="Arial" font-size="40" fill="white">Protection en temps réel</text>
  </g>
  
  <g transform="translate(140, 1100)">
    <circle cx="30" cy="30" r="20" fill="#00E5A0"/>
    <text x="80" y="45" font-family="Arial" font-size="40" fill="white">Vie privée sécurisée</text>
  </g>
  
  <!-- Bottom CTA -->
  <rect x="240" y="1600" width="600" height="120" rx="60" fill="url(#grad)"/>
  <text x="540" y="1675" font-family="Arial" font-size="48" font-weight="bold" fill="#0A0C14" text-anchor="middle">Rejoindre la liste</text>
</svg>`;

const publicDir = path.join(__dirname, '..', 'public');

// Write all icon files
const icons = [
  { name: 'favicon-16x16.png', content: svgContent },
  { name: 'favicon-32x32.png', content: svgContent },
  { name: 'apple-touch-icon.png', content: svgContent },
  { name: 'android-chrome-192x192.png', content: svgContent },
  { name: 'android-chrome-512x512.png', content: svgContent },
  { name: 'logo.png', content: svgContent },
];

icons.forEach(icon => {
  const filePath = path.join(publicDir, icon.name);
  fs.writeFileSync(filePath, icon.content, 'utf8');
  console.log(`✓ Created ${icon.name}`);
});

// Write screenshot
fs.writeFileSync(path.join(publicDir, 'screenshot.jpg'), screenshotSvg, 'utf8');
console.log('✓ Created screenshot.jpg');

console.log('\n✅ All icons generated successfully!');
