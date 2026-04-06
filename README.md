# mlMiniproject

This repository contains:

1. **Joblit** (root) — Next.js 14 resume builder with live PDF preview and optional Groq AI.
2. **`web/`** — separate Expo (React Native) app configured for web; used by the current Vercel project settings in `vercel.json`.

---

## Prerequisites

- **Node.js** 18+ for Joblit; **20.19.4+** recommended if you run the Expo app in `web/` (see `web/package.json` `engines`).
- **npm** (comes with Node).

---

## After you clone or pull

Always work from the folder that contains this `README.md` (the repo root).

```bash
cd mlMiniproject   # or your clone folder name
git pull origin main
```

### Run Joblit (Next.js) — main app at repo root

From the **repository root** (not inside `web/`):

```bash
npm install
npm run dev
```

- Open **http://localhost:3000**
- Use **Open builder** on the home page, or go directly to **http://localhost:3000/builder/demo** for the sample resume.

**Optional — real AI (Groq):**

1. Copy env template and add your key:

   ```bash
   cp .env.example .env.local
   ```

2. Set `GROQ_API_KEY` in `.env.local` (from [Groq Console](https://console.groq.com/)).  
   If you skip this, the app still runs using **demo fallbacks** for AI routes.

**Production build (sanity check):**

```bash
npm run build
npm start
```

---

### Run the `web/` Expo app (optional)

Only if you need the older Expo project:

```bash
cd web
npm install
npm run dev
```

Follow the terminal URL (Expo usually opens a dev page; port may differ from 3000).

---

## Deploy on Vercel

`vercel.json` at the repo root points the Vercel **install** and **build** at the **`web/`** app (`installCommand` / `buildCommand` / `outputDirectory`).  

Deploying **Joblit** from the repo root on Vercel requires changing the Vercel project to use the root `package.json` (Framework Preset: Next.js, root directory: `.`), or a separate Vercel project — it is **not** what the current `vercel.json` builds.

---

## Git push (contributors)

```bash
git add -A
git commit -m "Your message"
git push origin main
```

Or use `npm run push:github` if you use the included script and `gh` CLI.
