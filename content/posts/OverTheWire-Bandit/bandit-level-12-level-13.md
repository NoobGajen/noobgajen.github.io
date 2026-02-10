---
title: "Bandit: Level 12 => Level 13"
date: 2020-01-13
tags: ["OverTheWire", "Bandit", "SSH", "Linux", "bandit-level-12-level-13"]
description: "The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)"
hidemeta: false
hideSummary: false
weight: 12
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---
The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit12`
* **Password:** `7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4`

***

#### So, The SSH syntax will be:

```bash
sshpass -p 7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4 ssh bandit12@bandit.labs.overthewire.org -p 2220
```

As we know from the hint, the password for the next level is stored in the file `data.txt`, which is encoded and compressed multiple times. So, Let begin:

<figure><img src="/images/Bandit/Level%2012%20to%20Level%2013%201.png" alt=""><figcaption></figcaption></figure>

From `data.txt` file content, it seems like it contains the hex value of some type of file. So, first of all, we need to reverse the file from hex to its original form. But, I got a permission denied error, likely because we don't have write privileges in our home directory. So, we'll create a temporary directory in `/tmp` to accomplish our task.

1.  **Create a temporary directory in `/tmp` and change to that directory:**

    ```bash
    mkdir /tmp/data
    cd /tmp/data
    ```
2.  **Reverse the hex back to the original file format:**

    ```bash
    xxd -r ~/data.txt data1
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data1
    ```
3.  **Check the file type:**

    ```bash
    file data1
    # Output: data1: gzip compressed data, was "data2.bin", last modified: Sun Jun 16 02:47:25 2024, max compression, from Unix, original size modulo 2^32 578
    ```
4.  **Since the file is gzip compressed data, rename it with `.gz` extension and unzip it:**

    ```bash
    mv -v data1 data1.gz
    gunzip -d data1.gz
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data1
    ```
5.  **Check the file type again:**

    ```bash
    mv -v data1 data2
    file data2
    # Output: data2: bzip2 compressed data, block size = 900k
    ```
6.  **Since the file is bzip2 compressed data, rename it with `.bz2` extension and unzip it:**

    ```bash
    mv -v data2 data2.bz2
    bunzip2 data2.bz2
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data2
    ```
7.  **Check the file type again:**

    ```bash
    mv -v data2 data3
    file data3
    # Output: data3: gzip compressed data, was "data4.bin", last modified: Sun Jun 16 02:47:25 2024, max compression, from Unix, original size modulo 2^32 20480
    ```
8.  **Since the file is gzip compressed data again, rename it with `.gz` extension and unzip it:**

    ```bash
    mv -v data3 data3.gz
    gunzip -d data3.gz
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data3
    ```
9.  **Check the file type again:**

    ```bash
    mv -v data3 data4
    file data4
    # Output: data4: POSIX tar archive (GNU)
    ```
10. **Since the file is a tar archive, rename it with `.tar` extension and extract it:**

    ```bash
    mv -v data4 data4.tar
    tar -xvf data4.tar
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data4.tar  data5.bin
    ```
11. **Check the file type of the extracted file:**

    ```bash
    file data5.bin
    # Output: data5.bin: POSIX tar archive (GNU)
    ```
12. **Since the file is a tar archive again, rename it with `.tar` extension and extract it:**

    ```bash
    mv -v data5.bin data5.tar
    tar -xvf data5.tar
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data4.tar  data5.tar  data6.bin
    ```
13. **Remove the tar file and check the file type of the next extracted file:**

    ```bash
    rm -v data5.tar
    file data6.bin
    # Output: data6.bin: bzip2 compressed data, block size = 900k
    ```
14. **Since the file is bzip2 compressed data again, rename it with `.bz2` extension and unzip it:**

    ```bash
    mv -v data6.bin data6.bz2
    bunzip2 data6.bz2
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data4.tar  data6
    ```
15. **Check the file type again:**

    ```bash
    mv -v data6 data7
    file data7
    # Output: data7: POSIX tar archive (GNU)
    ```
16. **Since the file is a tar archive again, rename it with `.tar` extension and extract it:**

    ```bash
    mv -v data7 data7.tar
    tar -xvf data7.tar
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data4.tar  data7.tar  data8.bin
    ```
17. **Check the file type of the next extracted file:**

    ```bash
    file data8.bin
    # Output: data8.bin: gzip compressed data, was "data9.bin", last modified: Sun Jun 16 02:47:25 2024, max compression, from Unix, original size modulo 2^32 49
    ```
18. **Since the file is gzip compressed data again, rename it with `.gz` extension and unzip it:**

    ```bash
    mv -v data8.bin data8.gz
    gunzip -d data8.gz
    ```

    **Output of `ls -a`:**

    ```bash
    ls -a
    .  ..  data4.tar  data7.tar  data8
    ```
19. **Check the file type again:**

    ```bash
    file data8
    # Output: data8: ASCII text
    ```
20. **Finally, read the contents of the ASCII text file to get the password:**

    ```bash
    cat data8
    # Output: The password is FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn
    ```
21. **Optional: Rename the file for clarity:**

    ```bash
    mv -v data8 password.txt
    cat password.txt
    # Output: The password is FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn
    ```

<figure><img src="/images/Bandit/Level%2012%20to%20Level%2013%202.png" alt=""><figcaption></figcaption></figure>