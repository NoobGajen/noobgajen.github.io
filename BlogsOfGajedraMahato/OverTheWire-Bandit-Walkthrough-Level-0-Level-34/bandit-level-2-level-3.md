# Bandit: Level 2 → Level 3

The password for the next level is stored in a file called `spaces in this filename` located in the home directory.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit2`
* **Password:** `263JGJPfgU6LtdEvgfWU1XP5yac29mFx`

***

#### So, The SSH syntax will be:

```bash
sshpass -p 263JGJPfgU6LtdEvgfWU1XP5yac29mFx ssh bandit2@bandit.labs.overthewire.org -p 2220
```

In Bash, filenames with spaces are treated as different files. If a filename contains spaces and we want to access its contents, here are some ways to achieve this:

*   **Using quotes (`"`):**

    ```bash
    cat "spaces in this filename"
    ```
*   **Using single quotes (`'`):**

    ```bash
    cat 'spaces in this filename'
    ```
*   **Using backslash (`\`) to escape spaces:**

    ```bash
    cat spaces\ in\ this\ filename
    ```

<figure><img src=".gitbook/assets/Level 2 to Level 3.png" alt=""><figcaption></figcaption></figure>
