# GitHub Setup

## Purpose
Set up NorthStar as a private GitHub project for backup, version history, and controlled collaboration.

## 1) Local Repository Bootstrap
Run from project root:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initialize NorthStar repository with CI and automation scaffolding"
```

## 2) Create Private GitHub Repository
Using GitHub CLI:

```bash
gh repo create northstar-agency --private --source=. --remote=origin --push
```

If the repository already exists, set remote manually:

```bash
git remote add origin git@github.com:<owner>/northstar-agency.git
git push -u origin main
```

## 3) Branch/PR Workflow
- Keep `main` protected.
- Create feature branches for changes.
- Merge via Pull Request only.

Suggested branch naming:
- `feature/<topic>`
- `fix/<topic>`
- `chore/<topic>`

## 4) Branch Protection Baseline (GitHub UI)
For branch `main`, enable:
- Require a pull request before merging.
- Require status checks to pass before merging.
  - Include the `CI` workflow.
- Do not allow force pushes.

## 5) Local Working Pattern
```bash
git checkout -b feature/my-change
# edit files
npm run ci:smoke
git add -A
git commit -m "feat: my change"
git push -u origin feature/my-change
```

Open PR to `main` and merge only after CI passes.
