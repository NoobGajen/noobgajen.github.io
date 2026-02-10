---
tags:
  - "#networking"
  - "#garuda-linux"
  - "#btrfs"
  - "#bootloader-repair"
---
## Easy Guide to Fixing GRUB on Garuda Linux (BTRFS)

This simple guide helps you fix the GRUB bootloader on **Garuda Linux** with a **BTRFS** file system. Follow these steps to install the necessary tools, mount partitions, fix GRUB, and check EFI entries.

---

### Step 1: Install `garuda-tools-base-git`

You need the **garuda-tools-base-git** package to manage GRUB on Garuda Linux. Install it using **pacman**:

```bash
sudo pacman -S garuda/garuda-tools-base-git
```

This package is only available for **Garuda Linux** and won’t work with other Arch-based distributions.

### Step 2: Automatically Mount Partitions (Recommended)

After installing the package, you can use **garuda-chroot** to automatically detect and mount your Linux system partitions. This can save you time and avoid errors.

```bash
sudo garuda-chroot -a
```

If you use this command, you can skip the next steps (2 and 3) and go directly to **Step 4**.

---

### Step 3: Manually Mount BTRFS and EFI Partitions (If Needed)

If you didn't use **garuda-chroot** or need to do it manually, follow these steps to mount your partitions:

1. Mount the **BTRFS** root partition with the `@` subvolume:

```bash
sudo mount /dev/nvme0n1p6 /mnt -o subvol=@
```

2. Mount the **EFI** partition:

```bash
sudo mount /dev/nvme0n1p5 /mnt/boot/efi
```

---

### Step 4: Enter the Chroot Environment

To fix GRUB, you need to work in a **chroot** environment. Use the appropriate command based on your distribution:

```bash
sudo garuda-chroot /mnt  ## For Garuda Linux
sudo arch-chroot /mnt    ## For other Arch-based distributions
```

---

### Step 5: Install GRUB and Check EFI Entries

While in the chroot environment, follow these steps:

1. Install GRUB to the **EFI** partition:

   ```bash
   grub-install /dev/nvme0n1p5
   ```

2. Alternatively, use these commands with specific EFI options:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=garuda --recheck     ## For Garuda Linux
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=GRUB --recheck       ## For Arch Linux
```


3. Check the EFI directory to see the added entries:

```bash
ls /boot/efi/EFI
```

   You should see the **garuda** entry along with any other entries.

4. Update the GRUB configuration:

```bash
update-grub
```

---

### Step 6: Reboot

After updating GRUB and checking EFI entries, reboot your system to apply the changes.

```bash
reboot
```
