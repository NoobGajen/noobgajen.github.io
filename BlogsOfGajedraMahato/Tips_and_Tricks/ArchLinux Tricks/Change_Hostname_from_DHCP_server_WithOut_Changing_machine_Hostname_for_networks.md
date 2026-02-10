---
tags:
  - "#networking"
  - "#dhcp-server"
  - "#hostname-assignment"
---
## Configuring DHCP Server to Assign Hostname via DHCP

#### Begin by installing the DHCP server package.
```bash
sudo pacman -S extra/dhcp dhcpcd
```

#### Next, set a custom hostname within the DHCP configuration file.
```bash
sudo vim /etc/dhcpcd.conf
```

Within this file, add or modify the `host` declaration to assign a specific hostname to a client:

```
hostname OPPO-A3s  ### This is set your device name OPPO-A3s in a network
```

### Finally, restart the DHCP server to apply the changes.
```bash
sudo systemctl restart dhcpd.service
sudo systemctl restart dhcpcd.service
```
