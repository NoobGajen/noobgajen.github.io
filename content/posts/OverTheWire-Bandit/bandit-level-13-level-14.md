---
title: "Bandit: Level 13 => Level 14"
date: 2020-01-14
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-13-level-14"]
description: "The password for the next level is stored in `/etc/bandit_pass/bandit14` and can only be read by user `bandit14`. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. **Note:** `localhost` is a hostname that refers to the machine you are working on."
hidemeta: false
hideSummary: false
weight: 13
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level is stored in `/etc/bandit_pass/bandit14` and can only be read by user `bandit14`. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. **Note:** `localhost` is a hostname that refers to the machine you are working on.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit13`
* **Password:** `FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn`

***

#### So, The SSH syntax will be:

```bash
sshpass -p FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn ssh bandit13@bandit.labs.overthewire.org -p 2220
```

The password for the next level is stored in `/etc/bandit_pass/bandit14` and can only be read by the user `bandit14`. For this level, we don’t get the next password, we get a private SSH key that can be used to log into the next level. So, Let's copy that private SSH key to our box, and login using private ssh in the next level account.

<figure><img src="/images/Bandit/Level%2013%20to%20Level%2014%201.png" alt=""><figcaption></figcaption></figure>

Since we have read privileges for the SSH key, we can simply copy its contents and create a file with that content to log in to the next level. I will use `scp`, a tool designed to copy files over SSH between hosts.

```bash
scp -P 2220 bandit13@bandit.labs.overthewire.org:~/sshkey.private .
```

<figure><img src="/images/Bandit/Level%2013%20to%20Level%2014%202.png" alt=""><figcaption></figcaption></figure>

Now that we have the SSH key for the next level user bandit14, we can log in using it after giving appropriate permissions to the SSH file:

```bash
chmod 400 sshkey.private
```

Then, use the following command to connect:

```bash
ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

<figure><img src="/images/Bandit/Level%2013%20to%20Level%2014%203.png" alt=""><figcaption></figcaption></figure>