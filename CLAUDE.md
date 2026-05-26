# Anastasia CV Website

Personal portfolio/CV website for Anastasia — SMM specialist, targeting expert, and content creator based in Kyiv, Ukraine.

## Stack

- **Vite + React** — build tool and UI library
- **TypeScript** — type safety
- **Tailwind CSS v4** — styling

## Design Direction

- **Aesthetic**: Old money meets hipster — elegant but with personality
- **Vibe**: Not another boring minimal portfolio. Color-blocked, bold, memorable.
- **Typography**: Cormorant Garamond (serif headings) + Inter (body)

## Color Palette

| Name       | Hex       | Usage                          |
|------------|-----------|--------------------------------|
| black-off  | `#1B1B1B` | Hero, dark sections            |
| nude       | `#E8D9C1` | Light text, accents            |
| ivory      | `#FDFBF8` | Highlights                     |
| burgundy   | `#4B1D3F` | Contact section, CTA           |
| rose-smoke | `#D8A7B1` | Primary accent                 |
| soft-orchid| `#E5D1D9` | Secondary accent               |

## Logo

The logo is an **arch shape** that subtly forms the letter "A" (for Anastasia). 

SVG path: `M4 46 C4 20, 20 4, 20 4 C20 4, 36 20, 36 46`

## Project Structure

```
src/
├── components/
│   └── CustomCursor.tsx    # Custom cursor component
├── App.tsx                 # Main page with all sections
├── index.css               # Tailwind + custom theme
└── main.tsx                # Entry point
public/
└── favicon.svg             # Arch favicon
```

## Commands

```bash
npm run dev      # Start dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

- Deploys to GitHub Pages via GitHub Actions
- Base path: `/nastionion/`
- Repo: https://github.com/Xsamsx/nastionion
