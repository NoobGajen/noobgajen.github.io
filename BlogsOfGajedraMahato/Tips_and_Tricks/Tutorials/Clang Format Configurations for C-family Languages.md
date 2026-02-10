---
tags:
  - "#clang-format"
  - "#code-formatting"
  - "#c++"
  - "#cpp"
---
## 🛠️ Clang Format Configurations for C-family Languages (C, C++, etc)

The `clang-format` tool works for multiple programming languages, not just C or C++. It supports:
* **C**
* **C++**
* **Objective-C**
* **Objective-C++**
* **JavaScript**
* **Java**
* **C#**
* **Protobuf**
* **TableGen**, etc.

### Style 1: Using Stroustrup Brace Style

* Uses Stroustrup-style braces (`else` on a new line).
* Short `if` statements are allowed on a single line.
* Template declarations always break.

```json
{
  "AccessModifierOffset": -4,
  "AllowShortIfStatementsOnASingleLine": true,
  "AlwaysBreakTemplateDeclarations": true,
  "Standard": "C++11",
  "BreakBeforeBraces": "Stroustrup",
  "ColumnLimit": 0
}
```

---

### Style 2: Custom Style 

* Based on LLVM style but customized.
* `else` goes on a new line.
* Braces after functions and control statements are on the same line.
* Compact and clean layout.

```json
{
  "Language": "Cpp",
  "BasedOnStyle": "LLVM",
  "BreakBeforeBraces": "Custom",
  "BraceWrapping": {
    "AfterFunction": false,
    "AfterControlStatement": false,
    "BeforeElse": true
  },
  "AllowShortIfStatementsOnASingleLine": true,
  "ColumnLimit": 0,
  "Standard": "C++11"
}
```

---

### Style 3: Same as Style 2 but with 4-space indentation and no tabs

* Useful to ensure consistent formatting across editors and systems.

```json
{
  "Language": "Cpp",
  "BasedOnStyle": "LLVM",
  "BreakBeforeBraces": "Custom",
  "BraceWrapping": {
    "AfterFunction": false,
    "AfterControlStatement": false,
    "BeforeElse": true
  },
  "AllowShortIfStatementsOnASingleLine": true,
  "ColumnLimit": 0,
  "Standard": "C++11",
  "IndentWidth": 4,
  "TabWidth": 4,
  "UseTab": "Never"
}
```

---

### ✅ Style 4: Same as Style 3 but keeps `else` on the same line (Your Favorite - Minimal Braces)

* If you prefer `} else` format instead of `}\nelse`.

```json
{
  "Language": "Cpp",
  "BasedOnStyle": "LLVM",
  "BreakBeforeBraces": "Custom",
  "BraceWrapping": {
    "AfterFunction": false,
    "AfterControlStatement": false,
    "BeforeElse": false
  },
  "AllowShortIfStatementsOnASingleLine": true,
  "ColumnLimit": 0,
  "Standard": "C++11",
  "IndentWidth": 4,
  "TabWidth": 4,
  "UseTab": "Never"
}
```