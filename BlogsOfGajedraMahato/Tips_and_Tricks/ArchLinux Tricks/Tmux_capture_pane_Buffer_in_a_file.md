---
tags:
  - "#automation"
  - "#tmux"
  - "#terminal-multiplexer"
---
# Saving the Current Pane Buffer in tmux

This guide explains how to save the contents of the current pane in `tmux` to a file.

## Step-by-Step Instructions

1. **Capture the Pane's Content**:
    - Press prefix key `Ctrl+b` to enter `tmux` command mode.
    - Type `:capture-pane -S - -E -` and press `Enter`. This captures the entire visible contents of the current pane to a buffer.

2. **Save the Buffer to a File**:
    - Press prefix key `Ctrl+b` again to enter `tmux` command mode.
    - Type `:save-buffer /tmp/pane_output.log` and press `Enter`. This saves the buffer content to a file named `/tmp/pane_output.log`.

## Combined Command Method

You can capture the pane's content and save it to a file using the following commands in your shell within the `tmux` session:

```sh
tmux capture-pane -S - -E -
tmux save-buffer /tmp/pane_output.log
```
