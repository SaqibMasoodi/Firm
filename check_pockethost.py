import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0'}

url = 'https://pockethost.io/'
try:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        html = r.read().decode('utf-8', errors='ignore')
        imgs = re.findall(r'src=["\']([^"\']+)["\']', html)
        print('Imgs on pockethost.io:', imgs[:10])
        svgs = re.findall(r'<svg[^>]*>.*?</svg>', html, re.DOTALL)
        print(f'Found {len(svgs)} inline SVGs on pockethost.io')
        if svgs:
            for i, s in enumerate(svgs[:3]):
                with open(f'Ideas/unprocesd logos/pockethost_inline_{i}.svg', 'w', encoding='utf-8') as f:
                    f.write(s)
                print(f'Saved pockethost_inline_{i}.svg')
except Exception as e:
    print('Error:', e)
