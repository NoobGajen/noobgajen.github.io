---
title: "Persistent MAC Address Spoofing (Global + Per-Connection)  by QwenAi"
date: 2026-01-13
description: ""
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

*by QwenAI | Verified on Arch Linux + NetworkManager ≥ 1.18*

> ✅ **Goal**:  
> - Apply the *same* spoofed MAC to **all Wi-Fi connections** (global).  
> - Optionally set a custom **DHCP hostname** per network (e.g., `Galaxy-A06` instead of `Nix`).  
> 🔧 **Why it works**: Uses NM’s native `cloned-mac-address` and `dhcp-hostname` — no race conditions, no leaks.

---

## 🔧 1. Global MAC Spoofing (All Wi-Fi)

### Step 1: Create policy file
```bash
sudo mkdir -p /etc/NetworkManager/conf.d/
sudo tee /etc/NetworkManager/conf.d/99-global-mac-address.conf <<'EOF'
[keyfile]
unmanaged-devices=

[connection-wifi]
# Global default for *all* Wi-Fi connections
wifi.cloned-mac-address=DE:AD:BE:EF:CA:FE
EOF
```

> 📝 Replace `DE:AD:BE:EF:CA:FE` with your desired MAC (e.g., `90:01:C0:DE:13:37`).

---

### Step 2: Reload NetworkManager
```bash
sudo systemctl reload NetworkManager
# If changes don’t apply, restart:
# sudo systemctl restart NetworkManager
```

---

### Step 3: Verify
```bash
macchanger -s wlp4s0
# ✅ Expected output:
# Current MAC:   DE:AD:BE:EF:CA:FE
# Permanent MAC: 9c:2f:9d:77:9c:67
```

> 💡 List active connections:  
> `nmcli -g NAME con show --active`

---

## 🎯 2. Per-Network Hostname Spoofing (Optional)

Make your device appear as a different device (e.g., phone, IoT) in the router UI:

```bash
nmcli con modify "MyWiFi" \
  ipv4.dhcp-hostname "Galaxy-A06" \
  ipv4.dhcp-send-hostname yes
```

✅ Replace:
- `"MyWiFi"` → your connection name (e.g., `"HUAWEI-5G-8BbD"`)
- `"Galaxy-A06"` → any believable name (`Smart-TV`, `Printer-HP`, `Lumen`, etc.)

🔁 Reconnect to apply:
```bash
nmcli con down "MyWiFi" && nmcli con up "MyWiFi"
```

> 📌 **Why it works**: Most home routers (Huawei, TP-Link) display `dhcp-hostname` as *Device Name* — not the system hostname.

---

## 🔗 References
- Arch Wiki: [MAC spoofing — NetworkManager](https://wiki.archlinux.org/title/MAC_address_spoofing#NetworkManager)  
- `man NetworkManager.conf` → `connection-*.wifi.cloned-mac-address`