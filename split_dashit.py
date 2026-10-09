import cv2
import numpy as np
from PIL import Image

im = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
arr = np.array(im)

r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

# Color segmentation with anti-aliasing preservation
# Blue background is around [1, 41, 158]
# Distance to blue:
blue_ref = np.array([1, 41, 158], dtype=np.float32)
rgb = arr[..., :3].astype(np.float32)
dist_to_blue = np.linalg.norm(rgb - blue_ref, axis=-1)

# Notice corners are black (outside app icon)
# Let's inspect where foreground is
# Foreground has high red: white (R>200, G>200, B>200) and orange (R>220, G around 80, B around 0)
is_fg = (r > 150)

# Connected components or contours of fg
y_indices, x_indices = np.where(is_fg)
print(f'Overall FG: y in [{y_indices.min()}, {y_indices.max()}], x in [{x_indices.min()}, {x_indices.max()}]')

# Let's split into Icon (upper) and Text (lower)
# Let's find horizontal gap between icon and text
row_counts = np.sum(is_fg, axis=1)
# Find where row_counts is 0 between min and max
in_gap = np.where((row_counts == 0) & (np.arange(1254) > y_indices.min()) & (np.arange(1254) < y_indices.max()))[0]
print('Gap y lines:', in_gap[:5], '...', in_gap[-5:])
split_y = in_gap[len(in_gap)//2]
print('Split y:', split_y)
