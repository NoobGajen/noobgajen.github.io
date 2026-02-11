---
title: "Table of Contents"
date: 2026-01-13
tags: ['networking', 'security', 'wireless-attacks', 'wireless-security', 'monitor-mode', 'packet-sniffing']
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

## Airmon-ng
To start monitoring mode on wlan0:

```bash
sudo airmon-ng start wlan0
```

## iwconfig
To enable monitor mode using iwconfig:

```bash
sudo ifconfig [INTERFACE] down
sudo iwconfig [INTERFACE] mode monitor
sudo ifconfig [INTERFACE] up
```

## iw
To enable monitor mode using iw:

```bash
sudo ip link set [INTERFACE] down
sudo iw [INTERFACE] set monitor control
sudo ip link set [INTERFACE] up
```

### Adding a New Monitor Interface
To add a new monitor interface:

```bash
sudo iw [INTERFACE] interface add [NEW_INTERFACE] type monitor
```

## Aircrack-ng Installation
To install aircrack-ng:

```bash
sudo apt-get update
sudo apt-get install aircrack-ng
```

## Airmon-ng Commands
To use airmon-ng commands:

```bash
sudo airmon-ng
sudo airmon-ng start [INTERFACE]
sudo airmon-ng stop [INTERFACE]
```

Note: It will disable monitor mode, but don't forget to restart your network manager. To do that, execute the following command:

```bash
sudo systemctl start NetworkManager
```

## Additional Airmon-ng Commands
To check for processes interfering with monitor mode:

```bash
sudo airmon-ng check
sudo airmon-ng check kill
sudo airmon-ng start [INTERFACE]
```

## Enabling Monitor Mode with iwconfig
To enable the monitor using the iwconfig command, follow these steps:

1. Stop monitoring mode on wlan0:
```bash
airmon-ng stop wlan0
```
2. Check for interfering processes:
```bash
airmon-ng check
```
3. Kill interfering processes:
```bash
airmon-ng check kill
```