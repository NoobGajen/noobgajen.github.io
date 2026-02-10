---
title: "IDA Debugger Key Notes (Default)"
date: 2026-01-13
---

### Execution control

* **F7** runs **step into** so it enters the next function
* **F8** runs **step over** so it goes to next instruction without entering function
* **F9** runs **continue process** until breakpoint or crash
* **Ctrl + F2** stops the debugger
* **Ctrl + F9** restarts the process

---

### Breakpoints

* **F2** toggles breakpoint on current line
* **Shift + F2** deletes all breakpoints
* **Alt + B** opens breakpoint list

---

### Navigation during debug

* **EIP RIP highlighted** shows current instruction
* **Space** switches graph view and linear view
* **G** jumps to address
* **Esc** goes back

---

### Registers and memory

* **Alt + R** opens registers window
* **Alt + M** opens memory window
* **Alt + S** opens stack view
* **Ctrl + Alt + R** refreshes registers

---

### Practical CTF flow

1. Press **F9** to run program
2. Hit **F2** on main or check function
3. Use **F8** to trace logic
4. Use **F7** only when entering crypto or check routine
5. Watch registers and stack

---

## Laptop Friendly Tip

If F keys are painful then remap:

* Step over → **Ctrl + N**
* Step into → **Ctrl + I**
* Continue → **Ctrl + D**

Set this in:

```
Options → Shortcuts
```