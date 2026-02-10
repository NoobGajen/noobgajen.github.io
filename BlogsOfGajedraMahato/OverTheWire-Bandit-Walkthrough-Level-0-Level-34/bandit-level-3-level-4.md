# Bandit: Level 3 → Level 4

The password for the next level is stored in a hidden file in the `inhere` directory.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit3`
* **Password:** `MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx`

***

#### So, The SSH syntax will be:

```bash
sshpass -p MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx ssh bandit3@bandit.labs.overthewire.org -p 2220
```

In Bash, files starting with a period `.` are considered hidden files and are not shown by default in file managers or when you simply execute the `ls` command in the terminal. To view hidden files with the `ls` command, you need to specify additional arguments such as `-a` or `--all`, which show all files in the current directory, including hidden ones.

Once you have discovered hidden files, you can access them for reading, writing, or modifying them:

```bash
cat .hidden_file
```

<figure><img src=".gitbook/assets/Level 3 to Level 4.png" alt=""><figcaption></figcaption></figure>
