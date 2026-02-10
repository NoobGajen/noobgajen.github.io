---
title: "Kali Docker Persistent Container"
date: 2026-01-13
tags: ['docker', 'security', 'penetration-testing', 'ctf', 'kali-linux', 'containerization', 'devops']
---

## 📂 Files

**Dockerfile** (placed in empty folder)

```Dockerfile
FROM kalilinux/kali-rolling

ENV DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC

# install essentials: zsh sudo tzdata chrony util-linux iproute2
RUN apt update && apt install -y \
    zsh sudo tzdata chrony util-linux iproute2 \
  && useradd -m -s /usr/bin/zsh kali \
  && echo "kali:kali" | chpasswd \
  && usermod -aG sudo kali \
  && apt clean && rm -rf /var/lib/apt/lists/*

USER kali
WORKDIR /home/kali
ENTRYPOINT ["/usr/bin/zsh","-l"]
```

---

## 🛠️ Build Image

Run from the folder with `Dockerfile`

```bash
docker build -t kali-zsh-vm:privileged .
```

---

## 🚀 Create and Run Persistent Privileged Container

This creates **kali-persistent** with host timezone and `/tmp/test` mounted

```bash
docker run -it --name kali-persistent \
  --privileged \
  --mount type=bind,source=/tmp/test,target=/tmp/test \
  --mount type=bind,source=/etc/localtime,target=/etc/localtime,readonly \
  --mount type=bind,source=/etc/timezone,target=/etc/timezone,readonly \
  kali-zsh-vm:privileged
```

If host lacks `/etc/timezone` use:

```bash
docker run -it --name kali-persistent \
  --privileged \
  -e TZ="$(cat /etc/timezone 2>/dev/null || echo 'Etc/UTC')" \
  --mount type=bind,source=/tmp/test,target=/tmp/test \
  --mount type=bind,source=/etc/localtime,target=/etc/localtime,readonly \
  kali-zsh-vm:privileged
```

---

## ⏰ Quick Time Sync Inside Container

Run as **kali** (password = `kali`)

```bash
sudo chronyd -q 'server pool.ntp.org iburst'
date
```

Or use Google time:

```bash
sudo chronyd -q 'server time.google.com iburst'
date
```

To run chrony as daemon:

```bash
sudo chronyd
sudo chronyc makestep
```

---

## 🔑 Open the Container Later (Start or Attach)

Start and attach interactive login (drops into **kali** zsh):

```bash
docker start -ai kali-persistent
```

If container is running and you want a new shell as **kali**:

```bash
docker exec -it --user kali kali-persistent /usr/bin/zsh -l
```

If you need a **root shell**:

```bash
docker exec -it --user root kali-persistent bash
# or
docker exec -it --user root kali-persistent /bin/zsh -l
```

---

## 🔍 Verify Inside Container

```bash
whoami
groups
echo $SHELL
date
ls -ld /tmp/test
sudo whoami   # enter 'kali' to confirm sudo works
```

---

## 👤 Optional: Match kali UID/GID to Host

Change host dir ownership:

```bash
sudo chown $(id -u):$(id -g) /tmp/test
```

Or adjust UID/GID in Dockerfile before build:

```Dockerfile
# add before USER kali
RUN groupmod -g 1000 kali || true && usermod -u 1000 -g 1000 kali || true
```

---

## 🗑️ Stop and Remove Container or Image

Stop:

```bash
docker stop kali-persistent
```

Remove container:

```bash
docker rm kali-persistent
```

Remove image:

```bash
docker rmi kali-zsh-vm:privileged
```