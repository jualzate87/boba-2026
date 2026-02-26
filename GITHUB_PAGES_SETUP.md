# Enable GitHub Pages (Live Demo)

Your token needs the `workflow` scope to push the deployment files. Add these manually on GitHub:

## Step 1: Update vite.config.ts

1. Go to https://github.com/jualzate87/boba-2026/blob/main/vite.config.ts
2. Click the pencil icon (Edit)
3. Change line 5 from `plugins: [react()],` to:
```
  base: '/boba-2026/',
  plugins: [react()],
```
4. Click **Commit changes**

## Step 2: Update src/main.tsx

1. Go to https://github.com/jualzate87/boba-2026/blob/main/src/main.tsx
2. Click Edit
3. Change `<BrowserRouter>` to `<BrowserRouter basename="/boba-2026/">`
4. Click **Commit changes**

## Step 3: Create the workflow file

1. Go to https://github.com/jualzate87/boba-2026
2. Click **Add file** → **Create new file**
3. Name it: `.github/workflows/deploy.yml`
4. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - uses: actions/deploy-pages@v4
        id: deployment
```

5. Click **Commit changes**

## Step 4: Enable GitHub Pages

1. Go to https://github.com/jualzate87/boba-2026/settings/pages
2. Under **Source**, select **GitHub Actions**
3. The workflow will run automatically. Wait 1–2 minutes.

## Live URL

**https://jualzate87.github.io/boba-2026/**
