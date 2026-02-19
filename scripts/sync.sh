#!/usr/bin/env bash
set -euo pipefail

DRY_RUN="false"
SKIP_SMOKE="false"
COMMIT_MESSAGE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN="true"
      shift
      ;;
    --skip-smoke)
      SKIP_SMOKE="true"
      shift
      ;;
    -m|--message)
      COMMIT_MESSAGE="${2:-}"
      if [[ -z "${COMMIT_MESSAGE}" ]]; then
        echo "Error: commit message cannot be empty."
        exit 1
      fi
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: scripts/sync.sh [--dry-run] [--skip-smoke] [-m|--message \"msg\"]"
      exit 1
      ;;
  esac
done

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Error: not inside a git repository."
  exit 1
fi

BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [[ "${BRANCH}" == "HEAD" ]]; then
  echo "Error: detached HEAD. Checkout a branch before syncing."
  exit 1
fi

if [[ "${SKIP_SMOKE}" != "true" ]]; then
  if npm run | rg -q "ci:smoke"; then
    echo "Running smoke checks..."
    npm run ci:smoke
  else
    echo "No ci:smoke script found. Skipping smoke checks."
  fi
fi

echo "Staging changes..."
git add -A

if git diff --cached --quiet; then
  echo "No staged changes to commit."
  exit 0
fi

if [[ -z "${COMMIT_MESSAGE}" ]]; then
  COMMIT_MESSAGE="chore: sync $(date -u +'%Y-%m-%d %H:%M UTC')"
fi

echo "Commit message: ${COMMIT_MESSAGE}"
if [[ "${DRY_RUN}" == "true" ]]; then
  echo "[dry-run] Would commit and push to branch '${BRANCH}'."
  git status --short --branch
  exit 0
fi

git commit -m "${COMMIT_MESSAGE}"

if git rev-parse --abbrev-ref --symbolic-full-name "@{u}" >/dev/null 2>&1; then
  echo "Pulling latest with rebase..."
  git pull --rebase
  echo "Pushing to remote..."
  git push
else
  echo "No upstream set for '${BRANCH}'. Setting upstream on first push..."
  git push -u origin "${BRANCH}"
fi

echo "Sync complete."
