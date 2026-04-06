# Sujal — web app

Static **web** export only (no iOS/Android apps in this repo).

## Local dev

```bash
cd web
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Output: `web/dist/` (gitignored).

## Deploy on Vercel

### From repository root (recommended)

The repo includes `/vercel.json` at the **parent** of `web/`. Connect the **whole repo** to Vercel (do not set a custom Root Directory, or set it to `.`).

- **Install:** `npm install --prefix web`
- **Build:** `npm run build` inside `web`
- **Output:** `web/dist`

### From the `web` folder only

Set **Root Directory** to `web`, **Build Command** to `npm run build`, **Output Directory** to `dist`. You can delete the repo-root `vercel.json` if you use this layout.

### CLI

```bash
npm i -g vercel
vercel
```

Run from the **repository root** so the root `vercel.json` is used.
