# Reverse Engineering notes with GDB (pwndbg)

This guide walks through analyzing a basic binary (e.g., `crackme`) using `pwndbg`.

## 1. Initial Reconnaissance

Start `gdb` with the binary:
```bash
$ gdb ./crackme
```

### List Functions
To see all defined functions in the binary (useful to find `main` or custom functions):

```bash
pwndbg> info functions
```

**Output Analysis:**
- Look for `main`.
- Ignore standard library functions like `puts@plt`, `__isoc99_scanf@plt`, `_start`, etc., unless necessary.
- **Tip**: You can filtering with regex: `info functions main` or `info functions ^my_`.

---

## 2. Static Analysis (Disassembly)

Once you identify interesting functions (like `main`), disassemble them to see the instructions.

```bash
pwndbg> disassemble main
# Short form: disass main
```

### Analyzing the Assembly
Here is a breakdown of the key parts of the `main` function from your example:

**1. Stack Setup (Prologue)**
```assembly
0x00401176 <+0>:   endbr64                  ; security instruction (Control Flow Enforcement)
0x0040117a <+4>:   push   rbp               ; save old base pointer
0x0040117b <+5>:   mov    rbp,rsp           ; set new base pointer
0x0040117e <+8>:   sub    rsp,0x10          ; allocate space on stack for variables
```

**2. Stack Canary (Security)**
```assembly
0x00401182 <+12>:  mov    rax,QWORD PTR fs:0x28  ; load random canary value
0x0040118b <+21>:  mov    QWORD PTR [rbp-0x8],rax ; place it on the stack
0x0040118f <+25>:  xor    eax,eax                ; clear eax (return 0 safety)
```
> **Note**: `fs:0x28` is a special segment register used for thread-local storage. This code places a random "cookie" on the stack. Before the function returns, it checks if this value has changed (which would indicate a buffer overflow).

**3. User Input & Logic**
```assembly
0x00401198 <+34>:  call   0x401060 <puts@plt>            ; print prompt
...
0x004011b0 <+58>:  call   0x401080 <__isoc99_scanf@plt>  ; read input
0x004011b5 <+63>:  mov    eax,DWORD PTR [rbp-0xc]        ; move input variable into eax
0x004011b8 <+66>:  cmp    eax,0x539                      ; COMPARE input with 0x539
0x004011bd <+71>:  jne    0x4011cd <main+87>             ; JUMP if NOT EQUAL to error message
```
- `cmp eax, 0x539`: This is the critical check.
- `jne`: Jump Not Equal. If `eax != 0x539`, it jumps to the "fail" code (`0x4011cd`).
- If it doesn't jump, it falls through to the "success" code.

**4. Success Path**
```assembly
0x004011bf <+73>:  lea    rdi,[rip+0xe50]   ; load "Correct password" string
0x004011c6 <+80>:  call   0x401060 <puts@plt>
0x004011cb <+85>:  jmp    0x4011d9          ; skip the failure part
```

---

## 3. Dynamic Analysis (Debugging)

To confirm our theory, we run the program and inspect it while it runs.

### Setting Breakpoints
Set a breakpoint at the comparison instruction to inspect values right before the check.

```bash
pwndbg> break *0x4011b8
# OR by offset
pwndbg> break *main+66
```

### Running and storage
```bash
pwndbg> run
```
Enter a test password (e.g., `12345`). The program will stop at your breakpoint.

### Inspecting State
When hit, `pwndbg` shows the context (registers, stack, code, etc.).

**Check Registers:**
```bash
pwndbg> info registers eax
eax            0x3039              12345
```
This confirms `eax` holds your input (`12345` is `0x3039` in hex).

**Check the Target Value:**
The instruction is `cmp eax, 0x539`.
You can convert hex to decimal in GDB:
```bash
pwndbg> print 0x539
$1 = 1337
```
So we need to enter `1337`.

### Stepping Through
Use `ni` (Next Instruction) to execute one assembly line but trigger the jump.

```bash
pwndbg> ni
```
Check the `EFLAGS` register. specifically the **ZF** (Zero Flag).
- If `cmp` values are same, `ZF` is set to 1. `jne` will NOT jump.
- If `cmp` values differ, `ZF` is 0. `jne` WILL jump.

---

## 4. Verification

Rerun with the correct input.

```bash
pwndbg> run
Enter Password
1337
```
You should see the "Correct password" message and hit standard breakpoints or exit cleanly.

## Key Instructions Cheat Sheet

| Instruction | Meaning | Description |
| :--- | :--- | :--- |
| `cmp a, b` | Compare | Computes `a - b` and sets flags (doesn't store result). |
| `test a, b` | Boolean Compare | Computes `a & b` and sets flags. Often used as `test eax, eax` to check if 0. |
| `je` / `jz` | Jump Equal / Zero | Jump if operands were equal (ZF=1). |
| `jne` / `jnz` | Jump Not Equal | Jump if operands were different (ZF=0). |
| `jmp` | Jump | Unconditional jump. |
| `lea dst, [src]` | Load Effective Address | Calculates address of `[src]` and stores it in `dst`. |
| `mov dst, src` | Move | Copies data from `src` to `dst`. |
