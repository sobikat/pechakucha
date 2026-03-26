# Pechakucha

A React website built with [Vite](https://vitejs.dev).

## Prerequisites

- **Node.js** (v18 or newer), which includes `npm`. If you see "npm not found", install Node first:

### Installing Node.js (macOS)

**Option A — Easiest: official installer**

1. Open **[https://nodejs.org](https://nodejs.org)** and download the **LTS** version.
2. Run the installer and follow the steps.
3. Quit and reopen your terminal (or Cursor), then run:
   ```bash
   node -v
   npm -v
   ```
   You should see version numbers.

**Option B — Using Homebrew** (if you use [Homebrew](https://brew.sh)):

```bash
brew install node
```

## Setup

```bash
cd react-website
npm install
```

## Run

**Development server** (with hot reload):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Production build:**

```bash
npm run build
```

**Preview production build locally:**

```bash
npm run preview
```

## Project structure

- `src/App.jsx` – main app component
- `src/main.jsx` – React entry point
- `src/index.css` – global styles
- `public/` – static assets
- `index.html` – HTML entry point

Edit `src/App.jsx` to start building your site.
