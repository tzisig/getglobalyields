from PIL import Image

def clean_logo(input_path, output_path, min_v=10, max_v=120):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pix = img.load()

    for y in range(height):
        for x in range(width):
            r, g, b, a = pix[x, y]
            
            # Distance from white for each channel
            dr = 255 - r
            dg = 255 - g
            db = 255 - b
            
            v = max(dr, dg, db)
            
            if v <= min_v:
                # Completely transparent
                pix[x, y] = (255, 255, 255, 0)
            elif v > max_v:
                # Fully opaque
                pix[x, y] = (r, g, b, 255)
            else:
                # Partially transparent
                alpha_f = (v - min_v) / (max_v - min_v)
                alpha = int(alpha_f * 255)
                
                # Recover foreground color
                # C = alpha_f * C_fg + (1 - alpha_f) * 255
                # => C_fg = (C - 255 * (1 - alpha_f)) / alpha_f
                def recover(c):
                    cfg = (c - 255 * (1 - alpha_f)) / alpha_f
                    return max(0, min(255, int(cfg)))
                
                nr = recover(r)
                ng = recover(g)
                nb = recover(b)
                
                pix[x, y] = (nr, ng, nb, alpha)

    img.save(output_path, "WEBP")
    print(f"Saved transparent logo to {output_path}")

if __name__ == "__main__":
    clean_logo(
        r"public/logo.webp",
        r"public/logo_transparent.webp",
        min_v=8,
        max_v=80
    )
