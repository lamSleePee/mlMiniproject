#!/usr/bin/env bash
# Creates a GitHub repo (if needed) and pushes main. Requires: gh auth login (once) OR GITHUB_TOKEN.
set -euo pipefail

export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${GITHUB_REPO_NAME:-joblit}"
VISIBILITY="${GITHUB_REPO_VISIBILITY:-public}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    echo "$GITHUB_TOKEN" | gh auth login --with-token
  else
    echo "Not logged into GitHub. Run this once in your terminal (browser login):"
    echo "  gh auth login -h github.com -p https -w"
    echo "Then run this script again:"
    echo "  ./scripts/push-to-github.sh"
    exit 1
  fi
fi

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote 'origin' exists. Pushing..."
  git push -u origin main
  echo "Done."
  exit 0
fi

echo "Creating GitHub repo '${REPO_NAME}' (${VISIBILITY}) and pushing..."
gh repo create "${REPO_NAME}" \
  --"${VISIBILITY}" \
  --source=. \
  --remote=origin \
  --push

echo "Done. Repo: $(gh repo view --json url -q .url 2>/dev/null || echo '(run: gh repo view)')"
