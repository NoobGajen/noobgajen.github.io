---
title: "Bandit: Level 15 => Level 16"
date: 2020-01-16
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-15-level-16"]
description: "The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL encryption."
hidemeta: false
hideSummary: false
weight: 15
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level can be retrieved by submitting the password of the current level to port 30001 on localhost using SSL encryption.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit15`
* **Password:** `8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`

***

#### So, The SSH syntax will be:

```bash
sshpass -p 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo ssh bandit15@bandit.labs.overthewire.org -p 2220
```

The challenge is to submit the `bandit15` password to port 30001 on localhost using SSL encryption. We can do this using either `ncat` with SSL support or directly using `openssl`.

### **Method 1: Using `ncat` with SSL**

1.  **Using `ncat` with SSL:**

    ```bash
    echo 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo | ncat --ssl localhost 30001
    ```

* `echo 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`: This command prints the `bandit15` password.
* `|`: The pipe operator redirects the output of the `echo` command to the next command.
* `ncat --ssl localhost 30001`: This command uses `ncat` to connect to port 30001 on localhost with SSL encryption and return the password.

### **Method 2: Using `openssl` Directly**

1.  **Using `openssl` to Connect:**

    ```bash
    echo 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo | openssl s_client -connect localhost:30001 -quiet
    ```

* `echo 8xCjnmgoKbGLhHFAZlGE5Tmu4M2tKJQo`: This command prints the `bandit15` password.
* `|`: The pipe operator redirects the output of the `echo` command to the next command.
* `openssl s_client -connect localhost:30001 -quiet`: This command uses `openssl` to establish an SSL connection to port 30001 on localhost and sends the password. The `-quiet` option suppresses the verbose output.

<figure><img src="/images/Bandit/Level%2015%20to%20Level%2016.png" alt=""><figcaption></figcaption></figure>