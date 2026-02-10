---
title: "Bandit: Level 9 => Level 10"
date: 2020-01-10
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-9-level-10"]
description: "The password for the next level is stored in the file `data.txt` in one of the few human-readable strings, preceded by several `=` characters."
hidemeta: false
hideSummary: false
weight: 9
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level is stored in the file `data.txt` in one of the few human-readable strings, preceded by several `=` characters.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit9`
* **Password:** `4CKMh1JI91bUIZZPXDqGanal4xvAg0JM`

***

#### So, The SSH syntax will be:

```bash
sshpass -p 4CKMh1JI91bUIZZPXDqGanal4xvAg0JM ssh bandit9@bandit.labs.overthewire.org -p 2220
```

As we know from the hint, the password for the next level is stored in the `data.txt` file in one of the few human-readable strings, preceded by several `=` characters. So, We can easily retrieve it using the `grep` command, but since `data.txt` is not in ASCII text, we need to use the `strings` command to extract only those characters that fall within the ASCII character set:

1.  **View the contents of `data.txt`:**

    ```bash
    ls
    data.txt
    ```
2.  **Determine the file type of `data.txt`:**

    ```bash
    file data.txt
    data.txt: data
    ```

    The `file` command indicates that `data.txt` contains generic data.
3.  **Search for human-readable strings preceded by '=':**

    ```bash
    strings data.txt | grep '='
    ```

<figure><img src="/images/Bandit/Level%209%20to%20Level%2010.png" alt=""><figcaption></figcaption></figure>