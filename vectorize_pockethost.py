import cv2
import numpy as np
from PIL import Image

# 1. PocketHost vectorization
im = Image.open('Ideas/unprocesd logos/IMG_6299.PNG').convert('L')
arr = np.array(im)

# Threshold
_, thresh = cv2.threshold(arr, 127, 255, cv2.THRESH_BINARY)

# Find contours
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)

print(f'PocketHost found {len(contours)} contours')

# Let's crop to bounding box
y_indices, x_indices = np.where(thresh > 0)
x0, y0 = x_indices.min(), y_indices.min()
x1, y1 = x_indices.max(), y_indices.max()
w = x1 - x0 + 1
h = y1 - y0 + 1
margin = 20
svg_w = w + margin * 2
svg_h = h + margin * 2

svg_paths = []
for i, c in enumerate(contours):
    # approximate polygon
    approx = cv2.approxPolyDP(c, 1.2, True)
    pts = approx.reshape(-1, 2)
    path_d = f"M {pts[0][0] - x0 + margin},{pts[0][1] - y0 + margin} "
    for p in pts[1:]:
        path_d += f"L {p[0] - x0 + margin},{p[1] - y0 + margin} "
    path_d += "Z"
    svg_paths.append((path_d, hierarchy[0][i][3] != -1)) # is_hole

print('PocketHost approximated polygon counts:')
for i, p in enumerate(svg_paths):
    print(f'  Path {i}: hole={p[1]}')

# Combine all into a single path with fill-rule="evenodd"
combined_d = " ".join([p[0] for p in svg_paths])

svg_str = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {svg_w} {svg_h}" fill="currentColor">
  <path fill-rule="evenodd" d="{combined_d}" />
</svg>'''

with open('Ideas/unprocesd logos/pockethost_vector.svg', 'w') as f:
    f.write(svg_str)
print('Saved pockethost_vector.svg')
