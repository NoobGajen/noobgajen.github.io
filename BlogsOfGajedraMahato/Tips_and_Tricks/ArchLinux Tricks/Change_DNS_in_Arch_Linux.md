---
tags:
  - "#networking"
  - "#security"
  - "#arch-linux"
  - "#dns-configuration"
  - "#network-configuration"
---
## Title: Configure Custom DNS Servers in Arch based Linux.

#### First of all, check `openresolv` package is installed in your system or not. if not then simply install it by:
```bash
sudo pacman -S extra/openresolv
```

#### Step 2: Remove Immutable Permissions
```bash
# Check for immutable permissions on /etc/resolv.conf
lsattr /etc/resolv*

# If immutable permissions exist, them remove it by
sudo chattr -i /etc/resolv.conf
```

#### Step 3: Set Custom DNS Servers
```bash
# Edit the resolvconf.conf file
sudo nano /etc/resolvconf.conf

# Configuration for resolvconf(8)
# See resolvconf.conf(5) for details

resolv_conf=/etc/resolv.conf
# If you run a local name server, you should uncomment the below line and
# configure your subscribers configuration files below.
#name_servers=127.0.0.1
###### Block malware with 1.1.1.1 for Families #####
name_servers=1.0.0.2
name_servers=1.1.1.2

###### Use 1.1.1.1 resolver ######
name_servers=1.0.0.1
name_servers=1.1.1.1

###### AdGuard DNS ######
# name_servers=94.140.14.59
# name_servers=94.140.14.49

######### AdGuard Non-filtering DNS #######
name_servers=94.140.14.141
name_servers=94.140.14.140



```

#### Enable `dhcpcd` services to work Custom DNS. if it is not installed in your system then install it by 
```bash
sudo pacman -S extra/dhcpcd 
sudo systemctl enable --now dhcpcd.service
```
**Conclusion:**
You've successfully configured custom DNS servers on Arch based Linux. Enjoy improved network security and privacy with your chosen DNS servers.

