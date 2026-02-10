---
title: "Bandit: Level 17 => Level 18"
date: 2020-01-18
weight: 17
---

There are 2 files in the homedirectory: `passwords.old and passwords.new`. The password for the next level is in `passwords.new` and is the only line that has been changed between `passwords.old and passwords.new`

**NOTE:** if you have solved this level and see ‘Byebye!’ when trying to log into bandit18, this is related to the next level, bandit19

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit17`
* **Password:** `EReVavePLFHtFlFsjn3hyzMlvSuSAcRD`

***

#### So, The SSH syntax will be:

```bash
sshpass -p EReVavePLFHtFlFsjn3hyzMlvSuSAcRD ssh bandit17@bandit.labs.overthewire.org -p 2220
```

We know there are two files in the home directory: `passwords.old` and `passwords.new`. The password we need is located in `passwords.new`, and it's the only line that has changed between these two files. We can easily retrieve it using the `diff` command.

```bash
diff passwords.new passwords.old
# Output:
# < x2gLTTjFwMOhQ8oWNbMN362QKxfRqGlO
# ---
# > znK19XRJuZTd8BvCEVW4NQjtNJbdFLNC
```

From this output, the difference between the two files is shown. Since we placed `passwords.new` as the first argument in the `diff` command, the password from `passwords.new` appears first, which is `x2gLTTjFwMOhQ8oWNbMN362QKxfRqGlO`.

<figure><img src="/images/Bandit/Level%2017%20to%20Level%2018.png" alt=""><figcaption></figcaption></figure>