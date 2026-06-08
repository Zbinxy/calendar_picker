from PIL import Image, ImageDraw
import os

def make_icon(size):
    img = Image.new('RGBA', (size, size), (0,0,0,0))
    d = ImageDraw.Draw(img)
    s = size

    r0 = (91, 33, 182, 255)
    r1 = (147, 51, 234, 255)
    radius = max(2, s // 4)

    for x in range(s):
        t = x / (s - 1)
        r = int(r0[0] + t*(r1[0]-r0[0]))
        g = int(r0[1] + t*(r1[1]-r0[1]))
        b = int(r0[2] + t*(r1[2]-r0[2]))
        d.line([(x,0),(x,s-1)], fill=(r,g,b,255))

    mask = Image.new('L', (s, s), 0)
    dm = ImageDraw.Draw(mask)
    dm.rounded_rectangle([0,0,s-1,s-1], radius=radius, fill=255)
    img.putalpha(mask)

    d = ImageDraw.Draw(img)

    pad = max(1, s//6)
    top = max(1, s*14//48)
    bot = s - pad
    left = pad
    right = s - pad
    r2 = max(1, s//12)

    hh = max(1, s*9//48)
    d.rounded_rectangle([left, top, right, top+hh], radius=r2, fill=(255,255,255,64))
    d.rounded_rectangle([left, top+hh-max(1,s//16), right, top+hh+max(1,s//16)], fill=(255,255,255,64))

    lw = max(1, s//24)
    d.rounded_rectangle([left, top, right, bot], radius=r2, outline=(255,255,255,220), width=lw)

    hx1 = s*15//48; hx2 = s*30//48
    hy0 = s*9//48;  hy1 = s*18//48
    hw = max(1, s//16)
    d.rounded_rectangle([hx1, hy0, hx1+hw, hy1], radius=max(1,hw//2), fill=(255,255,255,255))
    d.rounded_rectangle([hx2, hy0, hx2+hw, hy1], radius=max(1,hw//2), fill=(255,255,255,255))

    if size >= 24:
        gx = [s*12//48, s*21//48, s*30//48]
        gy = [s*28//48, s*34//48]
        gw = s*6//48; gh1 = s*5//48; gh2 = s*4//48
        alphas = [255, 178, 89, 153, 89]
        for ci, x in enumerate(gx):
            d.rounded_rectangle([x, gy[0], x+gw, gy[0]+gh1], radius=max(1,gw//4),
                                 fill=(255,255,255,alphas[ci]))
        for ci, x in enumerate(gx[:2]):
            d.rounded_rectangle([x, gy[1], x+gw, gy[1]+gh2], radius=max(1,gw//4),
                                 fill=(255,255,255,alphas[ci+3]))

    return img

dirs = [
    r'u:\__PROJECTS\CALENDAR_PICKER\firefox-extension\icons',
    r'u:\__PROJECTS\CALENDAR_PICKER\chrome-extension\icons',
]

for out in dirs:
    for sz in [16, 32, 48, 128]:
        img = make_icon(sz)
        path = os.path.join(out, f'icon{sz}.png')
        img.save(path, 'PNG', optimize=True)
        print(f'saved {path}')
