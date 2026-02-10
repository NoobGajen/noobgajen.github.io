---
title: "Bandit: Level 14 => Level 15"
date: 2020-01-15
weight: 14
---

The password for the next level can be retrieved by submitting the password of the current level to port 30000 on localhost.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit14`
* **private SSH key file:** `sshkey.private`

***

#### So, The SSH syntax will be:

```bash
ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

From the previous `bandit13` level challenges, we know that `bandit14` has access to the file `/etc/bandit_pass/bandit14`. We need to read this file to obtain the `bandit14` password, which is necessary for completing the next step.

```bash
cat /etc/bandit_pass/bandit14
# Output: MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS
```

Now that we have the `bandit14` password, we can use it to log in. While it’s possible to log in using the password directly, **it’s not necessary for this task**. But, We can also connect with SSH from creds:

```bash
sshpass -p MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS ssh bandit14@bandit.labs.overthewire.org -p 2220
```

***

#### Now, let's begin the challenges

To proceed, we need to submit the `bandit14` password to the localhost on port 30000 to retrieve the next level password:

```bash
nc localhost 30000
```

This command connects to port 30000 on localhost. When we paste and enter the current level's password, it will return the next level's password. Use the following command to automate this:

#### OR,

```bash
echo MU4VWeTyJk8ROof1qqmcBPaLh7lDCPvS | nc localhost 30000
```

This will send the `bandit14` password to port 30000 and return the password for the next level.

<figure><img src="/images/Bandit/Level%2014%20to%20Level%2015.png" alt=""><figcaption></figcaption></figure>