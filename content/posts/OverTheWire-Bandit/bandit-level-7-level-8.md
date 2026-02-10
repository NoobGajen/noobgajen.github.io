---
title: "Bandit: Level 7 => Level 8"
date: 2020-01-08
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-7-level-8"]
description: "The password for the next level is stored in the file `data.txt` next to the word `millionth`"
hidemeta: false
hideSummary: false
weight: 7
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level is stored in the file `data.txt` next to the word `millionth`

***

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit7`
* **Password:** `morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj`

***

#### So, The SSH syntax will be:

```bash
sshpass -p morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj ssh bandit7@bandit.labs.overthewire.org -p 2220
```

As we know, The password of the next level is at next to the word `millionth`. So, we can use the `grep` command to match the line containing the word `millionth` and retrieve the password.

```bash
grep millionth data.txt
```

**OR,**

```bash
cat data.txt | grep millionth
```

<figure><img src="/images/Bandit/Level%207%20to%20Level%208%20%281%29.png" alt=""><figcaption></figcaption></figure>