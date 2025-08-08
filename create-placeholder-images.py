#!/usr/bin/env python3
"""
Create placeholder images for Gentleman Programming social media
Requires: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_images():
    """Create all required placeholder images"""
    
    # Windows 95 colors
    TEAL = (0, 128, 128)
    WHITE = (255, 255, 255)
    GRAY = (192, 192, 192)
    
    # Create public directory if it doesn't exist
    if not os.path.exists('public'):
        os.makedirs('public')
    
    # 1. OG Image (1200x630)
    og_img = Image.new('RGB', (1200, 630), TEAL)
    draw = ImageDraw.Draw(og_img)
    
    # Add Windows 95 style border
    draw.rectangle([10, 10, 1190, 620], outline=GRAY, width=3)
    draw.rectangle([13, 13, 1187, 617], outline=WHITE, width=1)
    
    # Add title bar
    draw.rectangle([15, 15, 1185, 50], fill=GRAY)
    
    try:
        # Try to use default system font
        title_font = ImageFont.truetype("Arial.ttf", 60) if os.name == 'nt' else ImageFont.load_default()
        subtitle_font = ImageFont.truetype("Arial.ttf", 36) if os.name == 'nt' else ImageFont.load_default()
    except:
        # Fallback to default font
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Add text
    draw.text((600, 200), "Gentleman Programming", fill=WHITE, font=title_font, anchor="mm")
    draw.text((600, 300), "Professional Software Development", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 350), "Mentoring & Corporate Training", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 450), "Google GDE • Microsoft MVP", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 500), "Windows 95 Experience", fill=WHITE, font=subtitle_font, anchor="mm")
    
    og_img.save('public/og-image.png', 'PNG', optimize=True)
    print("✅ Created og-image.png (1200x630)")
    
    # 2. Twitter Image (1200x675)
    twitter_img = Image.new('RGB', (1200, 675), TEAL)
    draw = ImageDraw.Draw(twitter_img)
    
    # Add border
    draw.rectangle([10, 10, 1190, 665], outline=GRAY, width=3)
    
    # Add text
    draw.text((600, 200), "Gentleman Programming", fill=WHITE, font=title_font, anchor="mm")
    draw.text((600, 300), "Expert Software Development", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 350), "Mentoring & Training", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 450), "Google Developer Expert", fill=WHITE, font=subtitle_font, anchor="mm")
    draw.text((600, 500), "Microsoft MVP", fill=WHITE, font=subtitle_font, anchor="mm")
    
    twitter_img.save('public/twitter-image.png', 'PNG', optimize=True)
    print("✅ Created twitter-image.png (1200x675)")
    
    # 3. Logo (512x512)
    logo_img = Image.new('RGBA', (512, 512), (0, 0, 0, 0))  # Transparent background
    draw = ImageDraw.Draw(logo_img)
    
    # Create Windows 95 style icon
    draw.rectangle([40, 40, 472, 472], fill=TEAL, outline=GRAY, width=4)
    draw.rectangle([44, 44, 468, 468], outline=WHITE, width=2)
    
    try:
        logo_font = ImageFont.truetype("Arial.ttf", 120) if os.name == 'nt' else ImageFont.load_default()
    except:
        logo_font = ImageFont.load_default()
    
    # Add GP initials
    draw.text((256, 256), "GP", fill=WHITE, font=logo_font, anchor="mm")
    
    logo_img.save('public/logo.png', 'PNG', optimize=True)
    print("✅ Created logo.png (512x512)")
    
    # 4. Create favicon variants
    favicon_sizes = [
        (16, 16, 'favicon-16x16.png'),
        (32, 32, 'favicon-32x32.png'),
        (180, 180, 'apple-touch-icon.png'),
        (192, 192, 'favicon-192x192.png'),
        (512, 512, 'favicon-512x512.png')
    ]
    
    for width, height, filename in favicon_sizes:
        favicon = logo_img.resize((width, height), Image.Resampling.LANCZOS)
        favicon.save(f'public/{filename}', 'PNG', optimize=True)
        print(f"✅ Created {filename} ({width}x{height})")
    
    print("\n🎉 All placeholder images created successfully!")
    print("📁 Images saved in: /public/")
    print("📝 See IMAGE_SPECIFICATIONS.md for design guidelines")
    print("🔗 Test social previews at: https://metatags.io/")

if __name__ == "__main__":
    create_placeholder_images()