# Bandit: Level 31 → Level 32

There is a git repository at ssh://bandit31-git@localhost/home/bandit31-git/repo via the port 2220. The password for the user bandit31-git is the same as for the user bandit31.

### Here are the details which we have from the previous level:

* **Host:** `bandit.labs.overthewire.org`
* **Port:** `2220`
* **Username:** `bandit31`
* **Password:** `fb5S2xb7bRyFmAvQYQGEqsbhVyJqhnDy`

***

This level is similar like previous level, we are again dealing with a git repository located at `ssh://bandit31-git@localhost/home/bandit31-git/repo` via port `2220`. The password for the user `bandit31-git` is the same as for the user `bandit31`. Let's construct the command to clone the repository to our system.

The repository is hosted on the `localhost` of the server, So the server address for us will be `bandit.labs.overthewire.org` instead of `localhost` in our command.

```bash
git clone ssh://bandit31-git@bandit.labs.overthewire.org:2220/home/bandit31-git/repo
```

This will prompt for the password because the repository is password-protected. We need to enter the password of `bandit31` because The password for the user `bandit31-git` is the same as `bandit31`.

**Exploring the Repository**

Navigate into the cloned repository and list its contents.

```bash
cd repo
ls -a
# Output:
# .git  .gitignore  README.md
```

**Checking the README.md File**

```bash
cat README.md
# Output:
# This time your task is to push a file to the remote repository.
# 
# Details:
#     File name: key.txt
#     Content: 'May I come in?'
#     Branch: master
```

The `README.md` file contains instructions for the task, which is to create a file named `key.txt` with specified content and push it to the remote repository.

**Creating the Key File**

Create the file `key.txt` with the content `May I come in?` and verify its creation by listing files and displaying its content.

```bash
echo 'May I come in?' > key.txt
ls -a
# Output:
# .git  .gitignore  key.txt  README.md
cat key.txt
# Output:
# May I come in?
```

**Checking the .gitignore File**

Check the `.gitignore` file to see if `key.txt` is excluded.

```bash
cat .gitignore
# Output:
# *.txt
```

The `.gitignore` file specifies which files should be ignored by Git. Since `*.txt` is listed, So `key.txt` will be ignored by default.

**Adding and Committing the Key File**

Now, we need to force add the `key.txt` file to the Git index and commit the changes because, `*.txt` is listed in `.gitignore`

```bash
git add -f key.txt
git commit -m 'key.txt file created to solve this challenge'
# Output:
# [master 64ff2dd] key.txt file created to solve this challenge
# 1 file changed, 1 insertion(+)
# create mode 100644 key.txt
```

**Pushing the Changes to the Remote Repository**

```bash
git push -vf origin master
# Output:
# Pushing to ssh://bandit.labs.overthewire.org:2220/home/bandit31-git/repo
# bandit31-git@bandit.labs.overthewire.org's password:
# Enumerating objects: 4, done.
# Counting objects: 100% (4/4), done.
# Delta compression using up to 4 threads
# Compressing objects: 100% (2/2), done.
# Writing objects: 100% (3/3), 359 bytes | 359.00 KiB/s, done.
# Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
# remote: ### Attempting to validate files... ####
# remote:
# remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
# remote:
# remote: Well done! Here is the password for the next level:
# remote: 3O9RfhqyAlVBEZpVb6LYStshZoqoSx5K
# remote:
# remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
# remote:
# To ssh://bandit.labs.overthewire.org:2220/home/bandit31-git/repo
# ! [remote rejected] master -> master (pre-receive hook declined)
# error: failed to push some refs to 'ssh://bandit.labs.overthewire.org:2220/home/bandit31-git/repo'
```

The password for the next level is `3O9RfhqyAlVBEZpVb6LYStshZoqoSx5K`.
