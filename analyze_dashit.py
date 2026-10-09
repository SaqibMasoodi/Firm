import cv2
import numpy as np
from PIL import Image

im = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
arr = np.array(im)

print('Image size:', arr.shape)

# Let's inspect background color (corners)
corner_color = arr[10, 10]
print('Corner color:', corner_color)

# Inside blue background color
center_bg = arr[200, 100]
print('Center BG color (blue):', center_bg)

# Find mask of the blue background vs white / orange foreground
# White foreground: R > 200, G > 200, B > 200
# Orange foreground: R > 200, G < 120, B < 50
# Blue background: R < 50, G < 80, B > 150

r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

white_mask = (r > 200) & (g > 200) & (b > 200)
orange_mask = (r > 200) & (g < 140) & (b < 50)
fg_mask = white_mask | orange_mask

print(f'Foreground pixels: {np.sum(fg_mask)}, White: {np.sum(white_mask)}, Orange: {np.sum(orange_mask)}')
