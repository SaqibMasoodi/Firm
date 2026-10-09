import cv2
import numpy as np
from PIL import Image

im_w = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
im_b = Image.open('Ideas/unprocesd logos/IMG_6591.PNG').convert('RGBA')

arr_w = np.array(im_w, dtype=np.float32)
arr_b = np.array(im_b, dtype=np.float32)

# 1. Variable element (white in 6590, black in 6591)
# Exact alpha:
diff = np.mean(arr_w[..., :3] - arr_b[..., :3], axis=-1) / 255.0
alpha_var = np.clip(diff, 0.0, 1.0)
alpha_var[alpha_var < 0.02] = 0.0

# 2. Orange element
# Identify where orange is
is_orange = (arr_w[..., 0] > 180) & (arr_w[..., 1] < 130) & (arr_w[..., 2] < 50)
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
orange_region = cv2.dilate(is_orange.astype(np.uint8), kernel).astype(bool)

# Sample pure orange color from core
pure_orange = np.median(arr_w[is_orange & (arr_w[..., 0] > 240)][..., :3], axis=0) # [253, 78, 2]
bg_color = np.array([1.0, 41.0, 158.0], dtype=np.float32)

v = pure_orange - bg_color
norm_v_sq = np.dot(v, v)

alpha_orange = np.zeros(arr_w.shape[:2], dtype=np.float32)
for y in range(arr_w.shape[0]):
    for x in range(arr_w.shape[1]):
        if orange_region[y, x] and alpha_var[y, x] < 0.1:
            u = arr_w[y, x, :3] - bg_color
            a = np.dot(u, v) / norm_v_sq
            alpha_orange[y, x] = np.clip(a, 0.0, 1.0)

alpha_orange[alpha_orange < 0.04] = 0.0

print('Computed alpha_var and alpha_orange!')

# Crop bounding box of all elements
combined_alpha = np.maximum(alpha_var, alpha_orange)
y_idx, x_idx = np.where(combined_alpha > 0.05)
pad = 30
y0, y1 = max(0, y_idx.min() - pad), min(1254, y_idx.max() + pad)
x0, x1 = max(0, x_idx.min() - pad), min(1254, x_idx.max() + pad)

# Generate Light Mode (Black + Orange on transparent)
out_dark = np.zeros((1254, 1254, 4), dtype=np.uint8)
# Orange pixels
out_dark[..., 0] = (pure_orange[0] * alpha_orange).astype(np.uint8)
out_dark[..., 1] = (pure_orange[1] * alpha_orange).astype(np.uint8)
out_dark[..., 2] = (pure_orange[2] * alpha_orange).astype(np.uint8)
# Black pixels (rgb is 0, alpha is alpha_var)
out_dark[..., 3] = np.clip((alpha_var + alpha_orange) * 255, 0, 255).astype(np.uint8)

im_out_dark = Image.fromarray(out_dark[y0:y1, x0:x1])
im_out_dark.save('Ideas/unprocesd logos/dashit_black_orange.png')

# Generate Dark Mode (White + Orange on transparent)
out_light = np.zeros((1254, 1254, 4), dtype=np.uint8)
out_light[..., 0] = np.clip(255.0 * alpha_var + pure_orange[0] * alpha_orange, 0, 255).astype(np.uint8)
out_light[..., 1] = np.clip(255.0 * alpha_var + pure_orange[1] * alpha_orange, 0, 255).astype(np.uint8)
out_light[..., 2] = np.clip(255.0 * alpha_var + pure_orange[2] * alpha_orange, 0, 255).astype(np.uint8)
out_light[..., 3] = np.clip((alpha_var + alpha_orange) * 255, 0, 255).astype(np.uint8)

im_out_light = Image.fromarray(out_light[y0:y1, x0:x1])
im_out_light.save('Ideas/unprocesd logos/dashit_white_orange.png')

print('Saved dashit_black_orange.png and dashit_white_orange.png!')
