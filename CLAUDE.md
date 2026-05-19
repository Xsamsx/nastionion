# Anastasia CV Website

Personal portfolio/CV website for Anastasia — SMM specialist, targeting expert, and content creator based in Kyiv, Ukraine.

## Stack

- **Astro** — static site generator
- **Tailwind CSS v4** — styling
- **Vanilla CSS animations** — subtle fade-ins

## Design Direction

- **Aesthetic**: Old money meets hipster — elegant but with personality
- **Vibe**: Not another boring minimal portfolio. Color-blocked, bold, memorable.
- **Typography**: Cormorant Garamond (serif headings) + Inter (body)

## Color Palette

| Name       | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| forest     | `#1E3A2F` | Hero, services section, dark   |
| cream      | `#F5F2ED` | Light sections, text on dark   |
| ivory      | `#FDFBF8` | Highlights                     |
| burgundy   | `#6B2D3C` | Contact section, CTA           |
| sage       | `#7D9B84` | Secondary text, accents        |
| terracotta | `#C67D5E` | Accent highlights, links       |
| ink        | `#1A1A1A` | Footer, dark text              |
| muted      | `#6B6B6B` | Secondary text on light        |

## Logo

The logo is an **arch shape** that subtly forms the letter "A" (for Anastasia). 

- Minimal single-line SVG
- Represents a doorway/portal — inviting people into her world
- Old money architectural reference

SVG path: `M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46`

## Project Structure

```
src/
├── layouts/
│   └── Layout.astro        # Base HTML, fonts, meta
├── components/
│   └── ArchLogo.astro      # SVG arch logo component
├── pages/
│   └── index.astro         # Main CV page
├── styles/
│   └── global.css          # Tailwind + custom theme
public/
└── favicon.svg             # Arch favicon (forest bg)
```

## Page Sections

1. **Hero** (forest green) — Name, tagline, location badge
2. **About** (cream) — Brief intro paragraph
3. **Services** (forest green) — SMM, Targeting, Content (numbered cards)
4. **Experience** (cream) — Timeline with colored dots
5. **Contact/Співпраця** (burgundy) — CTA with social links
6. **Footer** (ink/black) — Copyright + mini logo

## Animations

- `section-fade` — fade up on load with staggered delays
- Hover effects on service cards and links
- Blurred floating shapes in hero for depth

## Commands

```bash
npm run dev      # Start dev server (localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Content to Update

When updating for the real Anastasia:

1. **index.astro**:
   - Instagram handle (currently `@nastion`)
   - Email address (currently `hello@anastasia.com`)
   - Telegram handle
   - Experience entries (dates, descriptions)
   - About text

2. **Layout.astro**:
   - Meta description
   - Page title

## Future Enhancements

- [ ] Portfolio/case studies section with images
- [ ] Testimonials from clients
- [ ] Blog/content section
- [ ] Dark mode toggle
- [ ] Language switcher (UA/EN)
- [ ] Contact form
