# Bandit: Level 1 → Level 2

The password for the next level is stored in a file called `-` located in the home directory.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit1`
* **Password:** `ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If`

***

#### So, The SSH syntax will be:

```bash
sshpass -p ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If ssh bandit1@bandit.labs.overthewire.org -p 2220
```

In Bash, this `-` symbol has a special meaning. If you try to use `cat -`, it won't read the content of a file named `-`. Instead, it will start waiting for input and then return the same input as output. To read the content of a file named `-`, you can use the full path or escape the `-` symbol. Here are some ways to achieve this:

*   **Using the full path:**

    ```bash
    cat /home/bandit1/-
    ```
*   **Using the relative path:**

    ```bash
    cat ./-
    ```
*   **Escaping the `-` symbol:**

    ```bash
    cat ./\-
    ```

<figure><img src=".gitbook/assets/Level 1 to Level 2.png" alt=""><figcaption></figcaption></figure>
