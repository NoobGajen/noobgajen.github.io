---
title: "To extrack hash from private.asc file"
date: 2026-01-13
tags: ['security', 'gpg-keys', 'key-recovery']
---

To see available keys in your system
```
$ gpg --list-secret-keys
```


If you have a backup.gpg keys with encrypted format.

Then you need a key to decode it. If you found the key in some file. Then simple import that file in your syste
```
$ gpg --import private.asc
```

If the private.asc file is in encrypted format then they ask password to decrypt and import to our system. 
we can also crack private.asc key by extracting hash from it by using john


```
$ gpg2john private.asc > private.john
```

### To crack the hash file private.john
```
john --wordlist=/usr/share/dict/rockyou.txt private.john
```

Now, we have a password of private.asc file. Now, it's time to import in your system.
```
$ gpg --import private.asc
```

Now, we can decode our backup.pgp file because we have a keys in your system. 
```
$ gpg -d backup.pgp
```