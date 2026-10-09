import cv2
import numpy as np
from PIL import Image

# Load both IMG_6590 (white) and IMG_6591 (black)
im_white = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
im_black = Image.open('Ideas/unprocesd logos/IMG_6591.PNG').convert('RGBA')

arr_w = np.array(im_white)
arr_b = np.array(im_black)

print('arr_w shape:', arr_w.shape)
print('arr_b shape:', arr_b.shape)

# In IMG_6590:
# Blue background: [1, 41, 158]
# Orange: [253, 78, 2]
# White: [255, 255, 255]

# In IMG_6591:
# Blue background: [1, 41, 158]
# Orange: [253, 78, 2]
# Black: [0, 0, 0]

# Notice the mathematical relationship!
# Between IMG_6590 and IMG_6591, the blue background is identical, the orange is identical!
# The ONLY difference is that the white pixels in 6590 are black in 6591!
diff = np.abs(arr_w.astype(np.int32) - arr_b.astype(np.int32))
diff_sum = np.sum(diff[..., :3], axis=-1)

# Where diff_sum is large: that is EXACTLY the white/black element!
# Where diff_sum is small, but color is orange: that is EXACTLY the orange element!
print('Max diff:', np.max(diff_sum))
is_variable_element = diff_sum > 100 # This is the "D" blocks + "dash" text!

# Core orange element:
is_orange = (arr_w[..., 0] > 180) & (arr_w[..., 1] < 120) & (arr_w[..., 2] < 50) & (diff_sum < 50)
print('Variable element pixels:', np.sum(is_variable_element))
print('Orange element pixels:', np.sum(is_orange))
