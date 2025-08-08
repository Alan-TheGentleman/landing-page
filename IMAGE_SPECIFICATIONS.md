# 🎨 Social Media Image Specifications

## Required Images for SEO/Social Media

### 1. **Open Graph Image** (`/public/og-image.png`)
- **Dimensions**: 1200 x 630 pixels
- **Format**: PNG
- **Max Size**: 5MB (ideal: under 1MB)
- **Purpose**: Facebook, LinkedIn, WhatsApp previews
- **Design Requirements**:
  - Windows 95 themed design
  - Include "Gentleman Programming" title
  - Tagline: "Professional Software Development Mentoring"
  - Google GDE & Microsoft MVP badges
  - Retro computer/desktop visual elements
  - Teal (#008080) background matching Windows 95 theme

### 2. **Twitter Image** (`/public/twitter-image.png`)
- **Dimensions**: 1200 x 675 pixels (16:9 ratio)
- **Format**: PNG
- **Max Size**: 5MB (ideal: under 1MB)
- **Purpose**: Twitter/X card previews
- **Design Requirements**:
  - Similar to OG image but optimized for Twitter's aspect ratio
  - Clear, readable text at small sizes
  - High contrast for mobile viewing

### 3. **Logo** (`/public/logo.png`)
- **Dimensions**: 512 x 512 pixels (square)
- **Format**: PNG with transparency
- **Max Size**: 200KB
- **Purpose**: PWA icon, structured data, general branding
- **Design Requirements**:
  - Square format with transparent background
  - Windows 95 style icon aesthetic
  - Works at multiple sizes (scalable)
  - Clear at 16x16 up to 512x512

### 4. **Favicon Set** (Additional)
- **favicon-16x16.png**: 16 x 16 pixels
- **favicon-32x32.png**: 32 x 32 pixels
- **favicon-192x192.png**: 192 x 192 pixels (Android)
- **favicon-512x512.png**: 512 x 512 pixels (PWA)
- **apple-touch-icon.png**: 180 x 180 pixels (iOS)

## 🎯 Quick Creation Guide

### Using ImageMagick (Command Line)

```bash
# Create placeholder images with correct dimensions
# OG Image (1200x630)
convert -size 1200x630 xc:'#008080' \
  -font Arial -pointsize 72 -fill white \
  -gravity center -annotate +0+0 'Gentleman Programming\nSoftware Development Mentoring' \
  public/og-image.png

# Twitter Image (1200x675)
convert -size 1200x675 xc:'#008080' \
  -font Arial -pointsize 72 -fill white \
  -gravity center -annotate +0+0 'Gentleman Programming\nGoogle GDE | Microsoft MVP' \
  public/twitter-image.png

# Logo (512x512)
convert -size 512x512 xc:transparent \
  -fill '#008080' -draw 'rectangle 50,50 462,462' \
  -font Arial -pointsize 200 -fill white \
  -gravity center -annotate +0+0 'GP' \
  public/logo.png

# Favicon 32x32
convert public/logo.png -resize 32x32 public/favicon-32x32.png

# Favicon 16x16
convert public/logo.png -resize 16x16 public/favicon-16x16.png

# Apple Touch Icon
convert public/logo.png -resize 180x180 public/apple-touch-icon.png

# PWA Icons
convert public/logo.png -resize 192x192 public/favicon-192x192.png
convert public/logo.png -resize 512x512 public/favicon-512x512.png
```

### Using Canva/Figma Templates

1. **OG Image Template**:
   - Canvas: 1200 x 630px
   - Background: #008080 (Windows 95 teal)
   - Border: 3px solid #C0C0C0 (Windows frame)
   - Title Bar: Classic Windows 95 style
   - Font: MS Sans Serif or similar retro font

2. **Content to Include**:
   - Main Title: "Gentleman Programming"
   - Subtitle: "Professional Software Development Mentoring"
   - Badges: "Google Developer Expert" | "Microsoft MVP"
   - Visual: Retro computer or Windows 95 desktop
   - Call to Action: "Learn from the Best in Tech"

## 🚀 Implementation Checklist

- [ ] Create og-image.png (1200x630)
- [ ] Create twitter-image.png (1200x675)
- [ ] Create logo.png (512x512)
- [ ] Create favicon-32x32.png
- [ ] Create favicon-16x16.png
- [ ] Create apple-touch-icon.png (180x180)
- [ ] Create favicon-192x192.png (Android)
- [ ] Create favicon-512x512.png (PWA)
- [ ] Compress all images (TinyPNG/ImageOptim)
- [ ] Test social media previews with:
  - Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

## 💡 Design Tips

1. **Text Readability**: Ensure text is readable when image is scaled down to thumbnail size
2. **Brand Consistency**: Use Windows 95 aesthetic throughout
3. **High Contrast**: White text on teal background for maximum legibility
4. **Safe Zones**: Keep important content away from edges (10% margin)
5. **File Size**: Optimize for web - use PNG compression tools

## 🎨 Color Palette

```css
/* Windows 95 Theme Colors */
--teal: #008080;        /* Primary background */
--gray: #C0C0C0;        /* Window borders */
--dark-gray: #808080;   /* Shadows */
--white: #FFFFFF;       /* Text */
--black: #000000;       /* Window text */
--blue: #000080;        /* Selected items */
```

## 📱 Testing Tools

- **Meta Tags Preview**: https://metatags.io/
- **Social Media Preview**: https://socialsharepreview.com/
- **PWA Asset Generator**: https://pwa-asset-generator.nikolaskama.me/

---

**Note**: After creating these images, place them in the `/public` folder and ensure they're included in the Angular build configuration.