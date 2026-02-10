---
title: "File Transfer Over SSH Using `scp`"
date: 2026-01-13
tags: ['security', 'networking', 'scp', 'file-transfer']
---

---

## 📤 Uploading/Sending a Directory from Local to SSH Server

Use either of the following commands:

```bash
scp -P 22 -r ./shell/* u0_a418@192.168.0.20:/home/gnu/shell/
````

**OR**

```bash
scp -r -P 22 ./shell u0_a418@192.168.0.20:/home/gnu/shell/
```

---

## 📥 Downloading/Receiving a Directory from SSH Server to Local

```bash
scp -P 22 -r u0_a418@192.168.0.20:/home/gnu/* ./gnu/
```

**OR**

```bash
scp -r -P 22 u0_a418@192.168.0.20:/home/gnu ./gnu/
```

---

## 📤 Uploading/Sending a File from Local to SSH Server

```bash
scp -P 22 ./shell.php u0_a418@192.168.0.20:/home/gnu/shell.php
```

---

## 📥 Downloading/Receiving a File from SSH Server to Local

```bash
scp -P 22 u0_a418@192.168.0.20:/home/gnu/flag.txt ./flag.txt
```

> 📝 **Note:**
>
> * `-P 22`: Specifies the SSH port (22 by default)
> * `-r`: Recursively copy entire directories
> * Replace `192.168.0.20` with the target server's IP
> * Replace `u0_a418` with the correct SSH username