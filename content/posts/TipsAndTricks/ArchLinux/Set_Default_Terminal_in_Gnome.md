---
title: "Set Default Terminal in Gnome"
date: 2026-01-13
tags: ['automation', 'gnome-settings', 'terminal-configuration']
description: ""
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

```bash
gsettings set org.gnome.desktop.default-applications.terminal exec tilix
gsettings set org.gnome.desktop.default-applications.terminal exec-arg -x
gsettings set org.gnome.desktop.default-applications.terminal exec-arg --quake
```