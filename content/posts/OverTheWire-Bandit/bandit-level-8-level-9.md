---
title: "Bandit: Level 8 => Level 9"
date: 2020-01-09
weight: 8
---

The password for the next level is stored in the file `data.txt` and is the only line of text that occurs only once.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit8`
* **Password:** `dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc`

***

#### So, The SSH syntax will be:

```bash
sshpass -p dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc ssh bandit8@bandit.labs.overthewire.org -p 2220
```

As we know from the hint, the password for the next level is stored in the file `data.txt` and is the only line of text that appears exactly once. So, Let's begin to find it:

```bash
cat data.txt | sort | uniq -c | grep '1 '
```

* **`cat data.txt`**: Outputs the contents of `data.txt`.
* **`sort`**: Arranges the output alphabetically.
* **`uniq -c`**: Counts and displays each unique line, indicating how many times it appears.
* **`grep '1 '`**: Filters the output to show lines that appear only once.

<figure><img src="/images/Bandit/Level%208%20to%20Level%209.png" alt=""><figcaption></figcaption></figure>