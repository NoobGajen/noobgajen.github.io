---
title: "🎵 How to Use Jockie Music Bot. 🎶"
date: 2026-01-13
tags: ['automation', 'discord-bot', 'music-bot', 'bot-commands', 'discord']
---

Jockie Music Bot is a powerful Discord bot for playing music from various platforms like **YouTube, Spotify, SoundCloud, and more**. This guide will help you **control playback, manage the queue, adjust audio settings, and more**.  

## **🔎 Search & Add Music**  
```bash
m!search <song name>         # Search for a song and choose from results  
m!play <song name or link>   # Play a song or add it to the queue  
m!play --now <Music Link>    # Play immediately, skipping the queue  
m!play <playlist link>       # Play an entire YouTube/Spotify playlist  
m!playradio <genre>          # Play a genre-based radio station  
```
## **▶️ Playback Commands**  
```bash
m!pause                      # Pause the current song  
m!resume                     # Resume the paused song  
m!stop                       # Stop playback and clear the queue  
m!disconnect                 # Make the bot leave the voice channel  
```
## **⏭️ Navigation Commands**  
```bash
m!next                       # Skip to the next song  
m!previous                   # Go back to the previous song  
m!seek <time>                # Jump forward (e.g., m!seek 1m30s)  
m!seek <-time>               # Jump backward (e.g., m!seek -30s)  
```
## **📋 Queue Management**  
```bash
m!queue                      # Show the current queue  
m!current                    # Show details of the currently playing song  
m!clearqueue                 # Remove all songs from the queue  
m!remove <position>          # Remove a specific song (e.g., m!remove 2)  
m!remove <from> <to>         # Remove a range of songs (e.g., m!remove 2 5)  
m!shuffle                    # Shuffle the queue  
m!shuffleoff                 # Disable shuffle  
m!loop                       # Loop the current song  
m!loopoff                    # Disable loop  
```
## **🎶 Audio Control**  
```bash
m!volume <1-100>             # Adjust volume (default 100)  
m!bassboost <level>          # Increase bass (low, medium, high, off)  
m!nightcore                  # Enable nightcore effect  
m!vaporwave                  # Enable vaporwave effect  
m!speed <0.5 - 2.0>          # Change playback speed  
```
## **🎤 Lyrics & Info**  
```bash
m!lyrics                     # Get lyrics of the current song  
m!np                         # Now playing (song details)  
m!song info                   # Get full details about the current song  
```
## **🔄 Auto & Smart Features**  
```bash
m!autoplay                   # Enable autoplay for recommendations  
m!autoplayoff                # Disable autoplay  
m!24/7                       # Keep bot active 24/7 in the voice channel  
```