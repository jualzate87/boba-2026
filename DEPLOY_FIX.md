# One-Time Deploy Fix

Your PAT can't push workflow files. Do this **once** on GitHub:

## Step 1: Update the workflow file

1. Go to: https://github.com/jualzate87/boba-2026/edit/main/.github/workflows/deploy.yml
2. Find line 27: `- run: npm ci`
3. Change it to: `- run: npm install`
4. Click **Commit changes**

## Step 2: Enable GitHub Pages

1. Go to: https://github.com/jualzate87/boba-2026/settings/pages
2. Under **Source**, select **GitHub Actions**
3. Save

## Done

The next push to `main` will deploy. The site will be live at:

**https://jualzate87.github.io/boba-2026/**
