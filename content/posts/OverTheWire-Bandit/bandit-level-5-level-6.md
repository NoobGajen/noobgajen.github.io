---
title: "Bandit: Level 5 => Level 6"
date: 2020-01-06
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-5-level-6"]
description: "The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:"
hidemeta: false
hideSummary: false
weight: 5
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level is stored in a file somewhere under the inhere directory and has all of the following properties:

* human-readable
* 1033 bytes in size
* not executable

***

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit5`
* **Password:** `4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw`

***

#### So, The SSH syntax will be:

```bash
sshpass -p 4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw ssh bandit5@bandit.labs.overthewire.org -p 2220
```

Since we have a file property, we can use the `find` command to find the exact file. Based on the hint, we know the next level's password file is in the `inhere` directory, which is located in our user's home directory. So, we can find it using the `find` command.

```bash
find . -type f -size 1033c ! -executable
```

**Here’s what each argument's mean:**

* **`find .`**: Means to look files in current directory recursively.
* **`-type f`**: Finds regular files (ignores directories and other types of files).
* **`-size 1033c`**: Filters for files exactly 1033 bytes in size.
* **`! -executable`**: Ensures the files found are not executable.

<figure><img src="/images/Bandit/Level%205%20to%20Level%206.png" alt=""><figcaption></figcaption></figure>