---
title: "1. Merge `dev` into `stable`"
date: 2026-01-13
tags: ['git-branching', 'version-control']
description: " "
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

To copy the content from the `dev` branch to the `stable` branch in Git, you have a few options depending on your specific needs. Here are some common methods:


This will combine the histories of the two branches, creating a merge commit.
```bash
# Switch to the stable branch
git checkout stable

# Merge the dev branch into stable
git merge dev
```

## 2. Rebase `stable` onto `dev`
This will move the `stable` branch to the tip of the `dev` branch, applying the changes from `stable` on top of `dev`. This creates a linear history.
```bash
# Switch to the stable branch
git checkout stable

# Rebase stable onto dev
git rebase dev
```

## 3. Reset `stable` to `dev`
This will make the `stable` branch point to the same commit as `dev`, effectively making `stable` identical to `dev`. Be careful with this as it rewrites history.
```bash
# Switch to the stable branch
git checkout stable

# Reset stable to dev
git reset --hard dev
```

## 4. Cherry-pick Commits from `dev` to `stable`
If you only want specific commits from `dev` to be applied to `stable`, you can cherry-pick them.
```bash
# Switch to the stable branch
git checkout stable

# Cherry-pick specific commits from dev to stable
# You can repeat this for multiple commits
git cherry-pick <commit-hash>
```

## Choosing the Right Method
- **Merge**: Use this if you want to retain the history of both branches and create a merge commit.
- **Rebase**: Use this if you want a linear history and are okay with rewriting history.
- **Reset**: Use this if you want `stable` to be an exact copy of `dev`, but be cautious as it rewrites history.
- **Cherry-pick**: Use this if you only need specific commits from `dev` without merging all changes.