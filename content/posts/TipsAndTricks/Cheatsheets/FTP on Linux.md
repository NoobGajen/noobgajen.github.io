---
title: "File Transfer via FTP on Linux"
date: 2026-01-13
tags: ['ftp-commands', 'networking', 'ftp-enumeration', 'file-transfer']
---

---

## 🧰 Using `ftp` Command

### 1. Connect to FTP Server
Replace `10.10.10.98` with your target FTP server IP or domain:

```bash
ftp 10.10.10.98
````

---

### 2. Login as Anonymous

```plaintext
Name (10.10.10.98:yourusername): anonymous
Password: (press Enter)
```

---

### 3. Set Binary Mode

To handle all types of files properly:

```plaintext
ftp> binary
```

---

### 4. Disable Prompting (for Multiple Files)

```plaintext
ftp> prompt off
Interactive mode off.
```

---

### 5. Download Files (Wildcard)

```plaintext
ftp> mget *
```

> ⚠️ Note: Standard `ftp` does **not support recursive** download.
> For recursive download, use a better client like `lftp`.

---

## 🕸️ Using `wget` Command

### 1. Recursive Download in Active Mode

```bash
wget --no-passive-ftp -m ftp://anonymous:anonymous@10.10.10.98
```

---

### 2. Enable Verbose Debug Output

```bash
wget --no-passive-ftp -m -d ftp://anonymous:anonymous@10.10.10.98
```

> 🔍 `-d` is useful for troubleshooting and debugging the connection.

---

## 🔁 Using `lftp` Command

### 1. Install `lftp` (if not installed)

```bash
sudo apt-get install lftp
```

---

### 2. Connect to FTP Server

```bash
lftp -u anonymous,anonymous ftp://10.10.10.98
```

---

### 3. Use `mirror` Command to Download Recursively

```plaintext
lftp ftp://10.10.10.98:~> mirror --verbose
```

> ✅ `mirror` allows full recursive download with progress display.