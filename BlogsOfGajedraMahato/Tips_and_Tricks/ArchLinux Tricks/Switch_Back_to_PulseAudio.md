---
tags:
  - "#networking"
  - "#audio-configuration"
  - "#linux-audio"
---
# Title: Switch Back to PulseAudio

### Title: Disable Pipewire Audio Service

To disable the Pipewire audio service, run the following commands:

```bash
systemctl --user disable pipewire pipewire.socket
systemctl --user mask pipewire pipewire.socket
systemctl --user enable --now pulseaudio.service
```

### Uninstalling Pipewire

To uninstall Pipewire, you can use the following command:

```bash
paru -Rdd pipewire-pulse pipewire-support pipewire-alsa
```

### Installing Pulseaudio

To install Pulseaudio, run:

```bash
paru -S pulseaudio-alsa pulseaudio-bluetooth pulseaudio-equalizer-ladspa pulseaudio-jack pulseaudio-lirc pulseaudio
```