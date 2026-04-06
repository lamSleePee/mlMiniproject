# Joblit

AI-assisted, ATS-friendly resume builder (Next.js 14). Local demo works without API keys; add `GROQ_API_KEY` for live AI.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Try **Open builder** → `/builder/demo`.

## Push to GitHub (one-time setup)

1. Log in to GitHub from this machine (browser):

   ```bash
   gh auth login -h github.com -p https -w
   ```

2. Create the repo and push `main`:

   ```bash
   npm run push:github
   ```

   Or: `./scripts/push-to-github.sh`

Optional: `GITHUB_REPO_NAME=my-repo-name` if `joblit` is taken.

## Deploy (Vercel)

Import the GitHub repo, set `GROQ_API_KEY` in project settings if you want real AI responses.
