# Push to GitHub (auth required)

This machine has **no GitHub credentials**:

- `gh auth status` → not logged into any GitHub hosts
- `git push https://github.com/sanchobendinga/dive-hard-website.git` → `fatal: could not read Username for 'https://github.com': terminal prompts disabled`

Local repo is ready on `main` with remote `origin` already set.

## From this box (after you authenticate)

```bash
cd /workspace/dive-hard-website

# Option A — GitHub CLI
gh auth login
git push -u origin main

# Option B — HTTPS with a Personal Access Token (you paste it; do not commit it)
git push -u origin main
# Username: your GitHub username
# Password: PAT with `repo` scope

# Option C — SSH
git remote set-url origin git@github.com:sanchobendinga/dive-hard-website.git
git push -u origin main
```

## From your laptop

```bash
git clone /workspace/dive-hard-website dive-hard-website   # if shared FS
# or copy the folder, then:
cd dive-hard-website
git remote -v   # should show origin → https://github.com/sanchobendinga/dive-hard-website.git
git push -u origin main
```

Commit on main: `9f4692b` — Initial Dive Hard marketing site
