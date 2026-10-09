import cv2
import numpy as np
from PIL import Image

im_w = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
arr_w = np.array(im_w)

# In IMG_6590, white elements have high green and blue compared to blue bg
# Blue bg: R ~ 1, G ~ 41, B ~ 158
# White elements: R > 200, G > 200, B > 200
# Orange elements: R > 200, G < 120, B < 50

# Threshold white:
mask_white = (arr_w[..., 0] > 180) & (arr_w[..., 1] > 180) & (arr_w[..., 2] > 180)
# Threshold orange:
mask_orange = (arr_w[..., 0] > 180) & (arr_w[..., 1] < 140) & (arr_w[..., 2] < 80)

# Check contours of mask_white
contours_w, hier_w = cv2.findContours(mask_white.astype(np.uint8), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
print(f'White contours count: {len(contours_w)}')
for i, c in enumerate(contours_w):
    area = cv2.contourArea(c)
    if area > 100:
        x, y, w, h = cv2.boundingRect(c)
        print(f'  White contour {i}: area={area:.0f}, bbox=({x},{y},{w},{h})')

contours_o, hier_o = cv2.findContours(mask_orange.astype(np.uint8), cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
print(f'Orange contours count: {len(contours_o)}')
for i, c in enumerate(contours_o):
    area = cv2.contourArea(c)
    if area > 50:
        x, y, w, h = cv2.boundingRect(c)
        print(f'  Orange contour {i}: area={area:.0f}, bbox=({x},{y},{w},{h})')
