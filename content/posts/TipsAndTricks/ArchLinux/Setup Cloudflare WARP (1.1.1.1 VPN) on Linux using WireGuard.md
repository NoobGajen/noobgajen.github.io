---
title: "📡 Setup Cloudflare WARP (1.1.1.1 VPN) on Arch Linux and Debian using WireGuard"
date: 2026-01-13
description: ""
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

## 🧰 Requirements
Make sure you have:
- A working internet connection
- `networkmanager` and `systemd` installed (default on most systems)
---
## ✅ Step 1: Install Required Packages
### 🐧 For Arch Linux:
```bash
sudo pacman -S wireguard-tools wireguard-dkms networkmanager networkmanager-wireguard curl
````
### 🐧 For Debian/Ubuntu/Kali/Parrot:
```bash
sudo apt update -y
sudo apt install wireguard resolvconf curl -y
```
> ⚠️ If `networkmanager` is missing:
```bash
sudo apt install network-manager
```
---
## 🛠️ Step 2: Install `wgcf` (WARP Config Generator)
### 🐧 For Arch Linux:
```bash
sudo pacman -S wgcf
```
### 🐧 For Debian-based distros:
Download from [wgcf GitHub Releases](https://github.com/ViRb3/wgcf/releases)
Then:
```bash
chmod +x wgcf_*_linux_amd64
sudo mv -v wgcf_*_linux_amd64 /usr/bin/wgcf
```
---
## 📦 Step 3: Register WARP Account
```bash
wgcf register
```
> This creates `wgcf-account.toml`
---
## 📄 Step 4: Generate WireGuard Config
```bash
wgcf generate
```
> This creates `wgcf-profile.conf`
---
## 🪪 Step 5: Move Config to System Directory
```bash
sudo mv -v wgcf-profile.conf /etc/wireguard/
```
---
## 🚀 Step 6: Start and Stop WARP Tunnel
### ✅ Start Tunnel:
```bash
sudo wg-quick up wgcf-profile
sudo wg-quick up ./wgcf-profile.conf   ### if you are using custom file
```
> ❗ If you get:
```
resolvconf: signature mismatch: /etc/resolv.conf
```
Fix it:
```bash
sudo resolvconf -u
```
and run again the Start Tunnel command:
```bash
sudo wg-quick up wgcf-profile
sudo wg-quick up ./wgcf-profile.conf   ### if you are using custom file
```
### ⛔ Stop Tunnel:
```bash
sudo wg-quick down wgcf-profile
sudo wg-quick down ./wgcf-profile.conf   ### if you are using custom file
```
## 🧪 Step 7: Test If WARP is Working
```bash
curl https://www.cloudflare.com/cdn-cgi/trace
```
Look for:
```
warp=on
```
If you see that line, WARP VPN is active ✅
---
## 🌀 Optional: Enable Auto Start on Boot
```bash
sudo systemctl enable wg-quick@wgcf-profile
```
---
## ℹ️ About This Guide
> **Cloudflare WARP VPN** is free and gives fast reliable internet. Since **Telegram is banned in Nepal** and many students use it to download courses and materials, this guide helps you set up WARP on **Arch Linux** and **Debian**.
If you are using any other distro, just install the same packages using your package manager or build from GitHub.