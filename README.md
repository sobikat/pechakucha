# Pechakucha

A React app built with [Next.js](https://nextjs.org) (App Router).

## Prerequisites

- **Node.js** (v18 or newer) and **npm**

## Setup

```bash
cd pechakucha
npm install
```

## Run

**Development** (default: [http://localhost:3000](http://localhost:3000)):

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

## Project structure

- `src/app/layout.jsx` – root layout and metadata
- `src/app/page.jsx` – home page
- `src/app/globals.css` – global styles
- `src/components/PechakuchaTitle3D.jsx` – text animation iframe
- `public/text-animation-1/` – legacy Three.js / BAS animation assets

Edit `src/app/page.jsx` to change the landing content.
