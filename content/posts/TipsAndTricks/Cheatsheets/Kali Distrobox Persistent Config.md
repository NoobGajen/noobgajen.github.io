---
title: "Kali Distrobox Persistent Config"
date: 2026-01-13
tags: ['docker', 'kali-linux', 'containerization', 'devops', 'distrobox', 'kali-distrobox', 'container-management']
---

## 📂 Files

**Dockerfile + Distrobox commands** (single block)

```dockerfile
FROM docker.io/kalilinux/kali-rolling

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

Run from the folder with the `Dockerfile`

```bash
docker build -t kali-zsh-vm:distrobox .
```

---

## 🚀 Create Distrobox (privileged with host TZ)

This creates a Distrobox named `kali` from your built image. It uses privileged mode and sets timezone to Asia/Kathmandu.

```bash
distrobox create \
  --hostname podman \
  --name kali \
  --image kali-zsh-vm:distrobox \
  --additional-flags "--privileged --env TZ=Asia/Kathmandu" \
  --nvidia \
  -I
```

---

## 🧭 Enter the Box

Enter as `kali` user with a login shell so dotfiles load

```bash
distrobox enter kali -- sudo su kali -s /usr/bin/zsh
```