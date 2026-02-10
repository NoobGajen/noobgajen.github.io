---
tags:
  - "#networking"
  - "#security"
  - "#mac-spoofing"
  - "#systemd"
  - "#network-configuration"
---
# Title: Spoofing MAC Address in a Persistent fashion

This method allows users to change their WiFi adapter's MAC address persistently. It also enables users to bypass MAC address blacklisting by network owners, as it allows connection to WiFi networks with a spoofed MAC address.

### Step 1: Writing a systemd Service

Create a systemd service to change your MAC address and place it in the `/etc/systemd/system/` directory with the name `mac-spoofer.service`.

```bash
cat /etc/systemd/system/mac-spoofer.service
```
```
[Unit]
Description=MAC Address Change/spoofing wlo1
Wants=network-pre.target
Before=network-pre.target
BindsTo=sys-subsystem-net-devices-wlo1.device
After=sys-subsystem-net-devices-wlo1.device

[Service]
Type=oneshot
User=root
ExecStart=/usr/bin/ifconfig wlo1 down
ExecStart=/usr/bin/macchanger -r -b wlo1
ExecStart=/usr/bin/ifconfig wlo1 up

[Install]
WantedBy=multi-user.target
```

### Step 2: Creating a Dispatcher Script

Create a script in the `/etc/NetworkManager/dispatcher.d/` directory and grant it executable permission. This directory contains scripts to handle various network-related events, which are automatically executed in response to specific events managed by NetworkManager.

```bash
sudo vim /etc/NetworkManager/dispatcher.d/mac-spoofer.sh
sudo chmod +x /etc/NetworkManager/dispatcher.d/mac-spoofer.sh
```
```bash
#!/bin/bash

# Assign command line arguments to variables
INTERFACE="$1"  # Network interface name
ACTION="$2"     # Action performed on the interface (e.g., "up" or "down")

# Check if the action is "up" and interface is "wlo1"
if [ "$ACTION" = "up" ] && [ "$INTERFACE" = "wlo1" ]; then
    systemctl start mac-spoofer.wlo1.service  # Start the mac-spoofer service for wlo1 interface

# Check if the action is "up" and interface is "wlan0"
elif [ "$ACTION" = "up" ] && [ "$INTERFACE" = "wlan0" ]; then
    systemctl start mac-spoofer.wlan0.service  # Start the mac-spoofer service for wlan0 interface
fi

```

### Pro Tips:
This systemd service uses the `macchanger` tool to change the MAC address. To install it, execute `sudo pacman -S macchanger` in your terminal.

If your WiFi adapter interface name is the same as `wlo1`, but something different, like `wlan0` or something else, Then, simply replace `wlo1` with your interface name in `mac-spoofer.service` and `mac-spoofer.sh` files. This script will work fine.

If you want to set a custom MAC address, edit the `/etc/systemd/system/mac-spoofer.service` file and replace `ExecStart=/usr/bin/macchanger -r -b wlo1` with `ExecStart=/usr/bin/macchanger -m 44:95:aa:9b:81:90 wlo1`, where `44:95:aa:9b:81:90` is the custom MAC address.

#### Credit: `retr0 ☥` aka @vndr1x for sharing great insight about systemd service.


This method has been tested on Arch Linux with the `systemd` init system and its NetworkManager, which is the default in Arch Linux. It should also work on other distributions using systemd as the init system and its NetworkManager for network management.
