---
title: "Bandit: Level 19 => Level 20"
date: 2020-01-20
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-19-level-20"]
description: "To gain access to the next level, you should use the `setuid` binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place `(/etc/bandit_pass)`, after you have used the setuid binary."
hidemeta: false
hideSummary: false
weight: 19
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
To gain access to the next level, you should use the `setuid` binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place `(/etc/bandit_pass)`, after you have used the setuid binary.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit19`
* **Password:** `cGWpMaKXVwDUNgPAVJbWYuGHVn9zl3j8`

***

#### So, The SSH syntax will be:

```bash
sshpass -p cGWpMaKXVwDUNgPAVJbWYuGHVn9zl3j8 ssh bandit19@bandit.labs.overthewire.org -p 2220
```

We are dealing with a [SUID](https://en.wikipedia.org/wiki/Suid) binary. [SUID](https://en.wikipedia.org/wiki/Suid) or [setuid](https://en.wikipedia.org/wiki/Setuid), is a special type of permission in Unix-like operating systems that allows users to execute a file with the permissions of the file's owner rather than their own permissions. This special permission bit (`s` in the permission string) can be set on executable files using the `chmod` command.

```bash
ls -l
# Output:
# total 16
# -rwsr-x--- 1 bandit20 bandit19 14880 Jun 16 02:47 bandit20-do
```

The file `bandit20-do` is owned by user `bandit20`. Therefore, when it gets executed by any user, it runs with the privileges of the `bandit20` user. This provides us with an opportunity to achieve our objective by executing commands as the `bandit20` user.

```bash
./bandit20-do
# Output:
# Run a command as another user.
# Example: ./bandit20-do id
```

This binary is designed to execute commands. Hence, we can directly use it to read files accessible to its owner.

```bash
./bandit20-do cat /etc/bandit_pass/bandit20
# Output:
# 0qXahG8ZjOVMN9Ghs7iOWsCfZyXOUbYO
```

<figure><img src="/images/Bandit/Level%2019%20to%20Level%2020.png" alt=""><figcaption></figcaption></figure>