---
title: "FFUF - Fuzz Faster U Fool"
date: 2026-01-13
tags: ['ffuf', 'fuzzing', 'web-fuzzing', 'directory-bruteforce', 'parameter-fuzzing', 'api-testing', 'vhost-enum', 'http-methods', 'proxy', 'login-bruteforce', 'rate-limiting', 'red-teaming', 'bug-bounty', 'post-exploitation', 'content-discovery', 'automation', 'web-security', 'ctf-tools', 'HTTP', 'ffuf-tool', 'security-testing']
---

## **1. Directory and File Brute Forcing**

*   **Basic Directory Fuzzing**:

    ```bash
    ffuf -w /path/to/wordlist.txt -u https://example.com/FUZZ/
    ```

    * Fuzz common directory names (e.g., `/admin/`, `/uploads/`).

***

### **2. Fuzzing Parameters**

1.  **Basic Parameter Fuzzing**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ
    ```

    * Replaces `FUZZ` with words from the wordlist to test URL parameters.
2.  **Filter by Status Code**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ -mc 200
    ```

    * Shows responses only for the `200 OK` status code.
3.  **Filter by Content Size**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ -fs 150
    ```

    * Filters results based on exact response size in bytes.
4.  **Fuzzing with JSON Payload (for APIs)**:

    ```bash
    ffuf -w methods.txt -d '{"param": "value"}' -H "Content-Type: application/json" -u https://example.com/api/FUZZ
    ```

    * Fuzzes parameter with JSON data. This is useful for testing API endpoints.
5.  **Fuzzing with Cookies**:

    ```bash
     ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ -H "Cookie: sessionID=abc123" 

     # OR,
     ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ -b "sessionID=abc123"
    ```

    * Sends authenticated requests with cookies.
6.  **Fuzzing with HTTP Headers**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/page.php?param=FUZZ -H "Authorization: Bearer <token>"
    ```

    * Use custom headers (e.g., for bearer tokens or other auth tokens).

***

### **3. Fuzzing HTTP Methods**

1.  **Basic HTTP Method Fuzzing**:

    ```bash
    ffuf -w methods.txt -X FUZZ -u https://example.com
    ```

    * Fuzzes HTTP methods like `GET`, `POST`, `PUT`, `DELETE`, etc. You can use a wordlist with common HTTP methods (`methods.txt`).

***

### **4. Using Proxy with FFUF**

1.  **HTTP Proxy**:

    ```bash
    ffuf -x http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Sends traffic through an HTTP proxy (e.g., Burp Suite running on `127.0.0.1:8080`).
2.  **Socks Proxy**:

    ```bash
    ffuf -x socks5://127.0.0.1:1080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Sends traffic through a SOCKS proxy, such as a proxy chain (`socks5://127.0.0.1:1080`).
3.  **Replay Proxy**:

    ```bash
    ffuf -replay-proxy http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Uses a replay proxy to capture requests, replaying them for debugging or additional analysis.

***

### **4. Fuzzing Virtual Hosts (VHosts)**

1.  **Basic Subdomain Bruteforce**:

    ```bash
    ffuf -w vhosts.txt -u http://FUZZ.example.com
    ```

    * Fuzzes for subdomains using entries from the wordlist.
2.  **Advanced VHost Fuzzing (Recommanded)**:

    ```bash
    ffuf -w subdomains.txt -u http://example.com -H "Host: FUZZ.example.com"
    ```

    * Fuzzes the `Host` header to discover hidden virtual hosts.

***

### **5. Brute-Forcing Login Pages**

1.  **Brute-Force Username & Password**:

    ```bash
    ffuf -X POST -u https://example.com/login.php -d 'username=admin&password=PASS' -w passwords.txt:PASS -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: MoodleSession=imj6f8kvqbhf07la0b6o7j1lq2" -r -fr 'Invalid Password.'
    ```

    * **`-d 'username=admin&password=PASS'`**: This is the data sent in the POST request. Here, `admin` is a fixed username, and `PASS` will be replaced by entries from our wordlist.
    * **`-r`**: This tells `ffuf` to follow redirects.
    * **`-fr 'Invalid Password.'`**: This option filters out responses that contain the phrase 'Invalid Password.', helping to identify successful logins.
2.  **Custom Content-Type**:

    ```bash
    ffuf -w passwords.txt:PASS -u https://example.com/api/login -X POST -H "Content-Type: application/json" -d '{"username": "admin", "password": "PASS"}'
    ```

    * Fuzzes login requests formatted in JSON (useful for APIs).

***

### **5. Handling Rate Limiting and Delays**

1.  **Delaying Between Requests**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/FUZZ -p 2
    ```

    * Adds a 2-second delay between each request to avoid rate-limiting.
2.  **Limiting Concurrent Requests**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/FUZZ -t 5
    ```

    * Limits concurrent requests to 5 for better control.

***

### **6. Using Request Files**

1.  **Custom Request Replay**:

    ```bash
    ffuf -request request.txt -w wordlist.txt
    ```

    * Replays a custom request saved in `request.txt`, fuzzing only the specified part.

***

### **7. Using Proxy with FFUF**

1.  **HTTP Proxy**:

    ```bash
    ffuf -x http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Sends traffic through an HTTP proxy (e.g., Burp Suite running on `127.0.0.1:8080`).
2.  **Socks Proxy**:

    ```bash
    ffuf -x socks5://127.0.0.1:1080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Sends traffic through a SOCKS proxy, such as a proxy chain (`socks5://127.0.0.1:1080`).
3.  **Replay Proxy**:

    ```bash
    ffuf -replay-proxy http://127.0.0.1:8080 -w wordlist.txt -u https://example.com/FUZZ
    ```

    * Uses a replay proxy to capture requests, replaying them for debugging or additional analysis.

***

#### **Advanced Techniques and Recommendations:**

1.  **Regex Filtering**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/FUZZ -fr "Unauthorized"
    ```

    * Filters out responses containing specific words using regex (`-fr`).
2.  **Following Redirections**:

    ```bash
    ffuf -w wordlist.txt -u https://example.com/FUZZ -r
    ```

    * Follows HTTP redirects in the response (`-r` flag).
3.  **Multiple Wordlist Delimiters**:

    ```bash
    ffuf -w ids.txt:ID -w names.txt:NAME -u https://example.com/api/users/ID/NAME
    ```

    * Use multiple wordlists with different delimiters for API fuzzing.