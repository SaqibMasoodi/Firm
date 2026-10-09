import cv2
import numpy as np
from PIL import Image

im_w = Image.open('Ideas/unprocesd logos/IMG_6590.PNG').convert('RGBA')
arr_w = np.array(im_w)

# Binary masks
mask_white = ((arr_w[..., 0] > 190) & (arr_w[..., 1] > 190) & (arr_w[..., 2] > 190)).astype(np.uint8) * 255
mask_orange = ((arr_w[..., 0] > 190) & (arr_w[..., 1] < 130) & (arr_w[..., 2] < 70)).astype(np.uint8) * 255

# Apply slight Gaussian blur and re-threshold for smooth anti-aliased contour extraction
blur_w = cv2.GaussianBlur(mask_white, (3, 3), 0.8)
_, smooth_w = cv2.threshold(blur_w, 127, 255, cv2.THRESH_BINARY)

blur_o = cv2.GaussianBlur(mask_orange, (3, 3), 0.8)
_, smooth_o = cv2.threshold(blur_o, 127, 255, cv2.THRESH_BINARY)

# Find contours with hierarchy
contours_w, hier_w = cv2.findContours(smooth_w, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)
contours_o, hier_o = cv2.findContours(smooth_o, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_TC89_KCOS)

# Function to convert contour to SVG path with polygon approximation
def contour_to_path(cnt, epsilon=0.8):
    approx = cv2.approxPolyDP(cnt, epsilon, True)
    pts = approx.reshape(-1, 2)
    if len(pts) < 3:
        return ""
    d = f"M {pts[0][0]},{pts[0][1]} "
    for p in pts[1:]:
        d += f"L {p[0]},{p[1]} "
    d += "Z"
    return d

paths_w = []
for i, c in enumerate(contours_w):
    if cv2.contourArea(c) > 500:
        p = contour_to_path(c, 0.8)
        if p:
            paths_w.append(p)

paths_o = []
for i, c in enumerate(contours_o):
    if cv2.contourArea(c) > 300:
        p = contour_to_path(c, 0.8)
        if p:
            paths_o.append(p)

# Full bounding box: x in [240, 1005], y in [215, 1055]
# Let's crop coordinates to viewBox
all_pts = []
for c in contours_w:
    if cv2.contourArea(c) > 500:
        all_pts.append(c.reshape(-1, 2))
for c in contours_o:
    if cv2.contourArea(c) > 300:
        all_pts.append(c.reshape(-1, 2))

all_pts = np.vstack(all_pts)
min_x, min_y = all_pts.min(axis=0)
max_x, max_y = all_pts.max(axis=0)
pad = 30
vb_x0 = int(min_x - pad)
vb_y0 = int(min_y - pad)
vb_w = int(max_x - min_x + pad * 2)
vb_h = int(max_y - min_y + pad * 2)

white_d = " ".join(paths_w)
orange_d = " ".join(paths_o)

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb_x0} {vb_y0} {vb_w} {vb_h}">
  <path fill-rule="evenodd" fill="#000000" d="{white_d}" />
  <path fill-rule="evenodd" fill="#ff4d00" d="{orange_d}" />
</svg>'''

with open('Ideas/unprocesd logos/dashit_vector_test.svg', 'w') as f:
    f.write(svg_content)
print('Saved dashit_vector_test.svg')
