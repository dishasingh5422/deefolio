# DEEFOLIO: hii this is my portfolio!

An editorial, scroll-led portfolio for Disha Singh. It uses Next.js, TypeScript, Tailwind CSS, GSAP ScrollTrigger, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal.

## Edit the portfolio

All replaceable copy, experience records, projects, contact links, résumé path, and visual asset paths live in [`data/portfolio.ts`](data/portfolio.ts).

To replace a visual placeholder:

1. Add a transparent PNG, WebP, AVIF, or SVG to `public/visuals/`.
2. Set the corresponding `asset` value in `data/portfolio.ts`, for example `/visuals/signal.webp`.
3. Keep the field empty to use the built-in typographic placeholder.

Replace `public/disha-singh-resume.txt` with the final résumé PDF and update `resumeUrl`. The published GitHub, LinkedIn, email, and phone values are centralized in `data/portfolio.ts` for easy maintenance.

## Quality checks

```bash
npm run lint
npm run build
```

The build exports a static site to `out/`. Motion is disabled when the visitor enables reduced-motion preferences, and all contact/menu actions remain usable without animations.

## Deploy to Vercel

Import this folder as a new Vercel project. Vercel detects Next.js automatically. The site is configured as a static export, so no server or environment variables are required.

You can also deploy from the CLI:

```bash
npx vercel
```
