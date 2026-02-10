# Bandit: Level 11 → Level 12

The password for the next level is stored in the file `data.txt`, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit11`
* **Password:** `dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr`

***

#### So, The SSH syntax will be:

```bash
sshpass -p dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr ssh bandit11@bandit.labs.overthewire.org -p 2220
```

As we know from the hint, the password for the next level is stored in the file `data.txt`, which contains ROT13 encoded data. ROT13 is a simple substitution cipher where each letter of the original text is replaced by the letter 13 positions after it in the alphabet. This transformation hides the original message.

#### To retrieve the password, we need to decode the ROT13 encoded data.

```bash
cat data.txt | tr '[a-zA-Z]' '[n-za-mN-ZA-M]'
```

* **`cat data.txt`**: Outputs the contents of `data.txt`.
* **`tr '[a-zA-Z]' '[n-za-mN-ZA-M]'`**: Decodes the ROT13 encoded string back into its original form by translating each letter to the letter 13 positions after it.

The pipe (`|`) symbol is used to pass the output of one command as standard input to the next command. In the above example, the output of `cat data.txt` is passed to `tr '[a-zA-Z]' '[n-za-mN-ZA-M]'` as standard input, and `tr` translates the ROT13 encoded text back to its original form.

<figure><img src=".gitbook/assets/Level 11 to Level 12.png" alt=""><figcaption></figcaption></figure>
