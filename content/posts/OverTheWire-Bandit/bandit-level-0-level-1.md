---
title: "Bandit: Level 0 => Level 1"
date: 2020-01-01
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-0-level-1"]
description: "The goal of this level is to log into the game using SSH.&#x20;"
hidemeta: false
hideSummary: false
weight: -1
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The goal of this level is to log into the game using SSH.&#x20;

### Here are the details which we need to login via SSH:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit0`
* **Password:** `bandit0`

***

#### So, The SSH syntax will be:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Press Enter, and you will be prompted for a password. Enter the correct password, and you will be logged into the SSH server.

<figure><img src="/images/Bandit/Level%200%20to%20Level%201.png" alt=""><figcaption></figcaption></figure>