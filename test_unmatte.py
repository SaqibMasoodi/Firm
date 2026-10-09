import cv2
import numpy as np
from PIL import Image

im = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
arr = np.array(im, dtype=np.float32)

r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]
bg_b = 158.0
bg_g = 41.0
bg_r = 1.0

# Mask of foreground region (dilated slightly to include all anti-aliased edge pixels)
is_core_fg = (r > 120) & ((g > 150) | (r - g > 80)) # white or orange core
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
fg_region = cv2.dilate(is_core_fg.astype(np.uint8), kernel).astype(bool)

# Classification of pixel as white-like or orange-like
is_orange = (r - g > 70) & (r > 100)
# Dilate orange label slightly within fg_region
orange_dilated = cv2.dilate(is_orange.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))).astype(bool)

# Target FG colors:
# Pure white: [255, 255, 255]
# Vibrant orange: let's sample core orange
core_orange_pixels = arr[is_orange & (r > 230)]
orange_color = np.median(core_orange_pixels[..., :3], axis=0) # roughly [255, 75, 0]
print('Core orange color:', orange_color)

# For each pixel in fg_region, estimate alpha
alpha = np.zeros(arr.shape[:2], dtype=np.float32)
out_rgb = np.zeros_like(arr[..., :3])

for y in range(arr.shape[0]):
    for x in range(arr.shape[1]):
        if not fg_region[y, x]:
            continue
        
        obs = arr[y, x, :3]
        if orange_dilated[y, x]:
            target = orange_color
            # Project (obs - bg) onto (target - bg)
            v = target - np.array([bg_r, bg_g, bg_b])
            u = obs - np.array([bg_r, bg_g, bg_b])
            a = np.dot(u, v) / (np.dot(v, v) + 1e-6)
            a = np.clip(a, 0.0, 1.0)
            alpha[y, x] = a
            out_rgb[y, x] = target
        else:
            target = np.array([255.0, 255.0, 255.0])
            v = target - np.array([bg_r, bg_g, bg_b])
            u = obs - np.array([bg_r, bg_g, bg_b])
            a = np.dot(u, v) / (np.dot(v, v) + 1e-6)
            a = np.clip(a, 0.0, 1.0)
            alpha[y, x] = a
            out_rgb[y, x] = target

# Apply smooth threshold to eliminate low-level background noise
alpha[alpha < 0.05] = 0.0

out_rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
out_rgba[..., :3] = np.clip(out_rgb, 0, 255).astype(np.uint8)
out_rgba[..., 3] = np.clip(alpha * 255, 0, 255).astype(np.uint8)

# Bounding box of non-zero alpha
y_nz, x_nz = np.where(out_rgba[..., 3] > 0)
pad = 20
y0, y1 = max(0, y_nz.min() - pad), min(arr.shape[0], y_nz.max() + pad)
x0, x1 = max(0, x_nz.min() - pad), min(arr.shape[1], x_nz.max() + pad)

im_clean = Image.fromarray(out_rgba[y0:y1, x0:x1])
im_clean.save('Ideas/unprocesd logos/dashit_unmatted_test.png')
print('Saved dashit_unmatted_test.png, size:', im_clean.size)
