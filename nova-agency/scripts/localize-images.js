const fs = require('fs');
const path = require('path');
const https = require('https');

const downloads = [
  // Brand
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f71_Nova_Logo.svg',
    dest: 'public/images/brand/logo.svg'
  },
  // Hero
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f79_adrian-cuj-o_9YmCY0bag-unsplash-2.webp',
    dest: 'public/images/hero/hero-banner.webp'
  },
  // CTA
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/663a26437b9503c0b4170be5_austin-distel-wawEfYdpkag-unsplash%20(1)%20(1).webp',
    dest: 'public/images/cta/cta-banner.webp'
  },
  // About
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/663a271ff7fe587abea1f9a9_darshan-patel-DfzzpBRZCT0-unsplash%20(1).webp',
    dest: 'public/images/about/team-culture.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/663a3ea4795361db872d7652_ant-rozetsky-HXOllTSwrpM-unsplash%20(3).webp',
    dest: 'public/images/about/snapshot-1.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f7e_adrian-cuj-o_9YmCY0bag-unsplash-5.webp',
    dest: 'public/images/about/snapshot-2.webp'
  },
  // Logos
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f6b_Logoipsum%205.svg',
    dest: 'public/images/logos/logoipsum-5.svg'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f66_Logoipsum%203.svg',
    dest: 'public/images/logos/logoipsum-3.svg'
  },
  // Services
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp',
    dest: 'public/images/services/software-development/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp',
    dest: 'public/images/services/ui-ux-design/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp',
    dest: 'public/images/services/branding-creative-design/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp',
    dest: 'public/images/services/social-media-management/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp',
    dest: 'public/images/services/video-editing-production/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp',
    dest: 'public/images/services/digital-marketing/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp',
    dest: 'public/images/services/business-automation-ai/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp',
    dest: 'public/images/services/it-consulting/cover.webp'
  },
  // Team
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639e951bf17ff4d42d5fa0b_alexander-hipp-iEEBWgY_6lA-unsplash%20(1).webp',
    dest: 'public/images/team/peter.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639ea359f7b8e44486caaf3_isaiah-mcclean-DrVJk1EaPSc-unsplash.webp',
    dest: 'public/images/team/sarah.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f96_simone-hutsch-_M4SLgyL3Ps-unsplash.webp',
    dest: 'public/images/team/claudia.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/6639ea4f83b52cc9b4629606_camylla-battani-zSCoQkrLMOE-unsplash.webp',
    dest: 'public/images/team/stanley.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f85_joel-filipe-PFIeJh17SZo-unsplash.webp',
    dest: 'public/images/team/eve.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f74_joel-filipe-PFIeJh17SZo-unsplash.webp',
    dest: 'public/images/team/kirsty.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f80_howard-bouchevereau-042Srn0-82o-unsplash-1.webp',
    dest: 'public/images/team/nathan.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f52/66386a9c5a29d081bf4e6f8c_joel-filipe-PFIeJh17SZo-unsplash-1.webp',
    dest: 'public/images/team/craig.webp'
  },
  // Case Studies
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b43702704f962650dca7f_663a28dc7e93c88d44d5b464_reuben-mansell-nwOip8AOZz0-unsplash%20(1)%20(1).webp',
    dest: 'public/images/case-studies/glowessence-skincare/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663a473e10986c639c898829_1.webp',
    dest: 'public/images/case-studies/brewzen-coffee-retailer/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663a47dee92fa62a03e898be_Untitled%20design%20(28).webp',
    dest: 'public/images/case-studies/burgerhaven-restaurant/cover.webp'
  },
  // Blog
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5d11b7333c7680816eea_jodie-cook-pqt5JEKRJaw-unsplash%20(2).webp',
    dest: 'public/images/blog/future-of-ai-business/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5cf80bf50313bd94fc49_william-hook-9e9PD9blAto-unsplash%20(1).webp',
    dest: 'public/images/blog/building-brand-identity/cover.webp'
  },
  {
    url: 'https://cdn.prod.website-files.com/66386a9c5a29d081bf4e6f63/663b5caacfb134b32dd86335_nik-q1n1LmoL4Es-unsplash%20(1).webp',
    dest: 'public/images/blog/social-commerce-trends/cover.webp'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullPath = path.resolve(dest);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });

    const file = fs.createWriteStream(fullPath);
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`[OK] Downloaded: ${dest}`);
            resolve();
          });
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        download(response.headers.location, dest).then(resolve).catch(reject);
      } else {
        file.close();
        fs.unlinkSync(fullPath);
        reject(new Error(`Server responded with ${response.statusCode}: ${url}`));
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      reject(err);
    });
  });
}

async function main() {
  console.log(`Starting localization of ${downloads.length} assets...`);
  for (const item of downloads) {
    try {
      await download(item.url, item.dest);
    } catch (err) {
      console.error(`[FAIL] ${item.url} -> ${item.dest}:`, err.message);
    }
  }
  console.log('Finished asset localization.');
}

main();
