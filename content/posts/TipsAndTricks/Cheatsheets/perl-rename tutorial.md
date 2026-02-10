---
title: "Tutorial: String Manipulation in Perl with s///, y///, and s///g"
date: 2026-01-13
tags: ['automation', 'string-manipulation', 'file-renaming', 'regex', 'security', 'perl-scripting']
---

Perl provides powerful operators for manipulating strings using regular expressions. Here's a breakdown of each operator with examples:

### s/// (Substitution Operator)

**Syntax:** `s/old-pattern/new-pattern/`

**Purpose:** Replaces occurrences of `old-pattern` with `new-pattern` in a string.

**Example:** `s/John/Doe/` replaces the first instance of "John" with "Doe".

**Example 1: Replace "John" with "Doe"**

```
text = "Hello John. John is a friend.";
regex = s/John/Doe/;
# Result: "Hello Doe. John is a friend."
```

**Example 2: Replace "white" with "black"**

```
text = "The walls are white, and the door is white.";
regex = s/white/black/;
# Result: "The walls are black, and the door is white."
```

### y/// (Transliteration Operator)

**Syntax:** `y/old-chars/new-chars/`

**Purpose:** Translates characters from `old-chars` with corresponding characters from `new-chars`.

**Example:** `y/aeiou/AEIOU/` replaces lowercase vowels with uppercase vowels.

**Example 1: Uppercase Vowels**

```
text = "This is an example.";
regex = y/aeiou/AEIOU/;
# Result: "ThIs Is An ExAmplE."
```


### s///g (Global Substitution)

**Syntax:** `s/old-pattern/new-pattern/g`

**Purpose:** The `g` modifier with the substitution operator (`s///`) performs the replacement globally throughout the string, not just the first occurrence.

**Example:** `s/John/Doe/g` replaces all instances of "John" with "Doe".

**Example 1: Replace All "John" with "Doe"**

```
text = "John is John's first name, and John is his last name.";
regex = s/John/Doe/g;
# Result: "Doe is Doe's first name, and Doe is his last name."
```

**Example 2: Replace All "white" with "black"**

```
text = "The walls are white, and the door is white.";
regex = s/white/black/g;
# Result: "The walls are black, and the door is black."
```

## Using perl-rename for Batch File Renaming

**1. Installation**

Use your system's package manager to install `perl-rename` or `rename` (depending on your system).

**2. Basic Syntax**
   - The basic syntax for using perl-rename is as follows:
```bash
perl-rename 's/old-pattern/new-pattern/' files
```
   - This command will replace occurrences of `old-pattern` with `new-pattern` in the specified files.
   **Example:** If you have files named `myfile-old-pattern` and `myfile-new-pattern`, running the command will rename them accordingly.

**3. Rename All .txt Files to Include Timestamp**
   - Rename all .txt files to include a timestamp in their filenames with the following command:
```bash
perl-rename 's/.txt$/_'$(date +%Y%m%d%H%M%S)'.txt/' *.txt
```
   - This command appends a timestamp to the end of each .txt filename.
   **Example:** If you have a file named `example.txt`, running the command will rename it to `example_20231013120000.txt`.

**4. Replace Spaces with Underscores**
   - To replace spaces in filenames with underscores, use the following command:
```bash
perl-rename 's/ /_/g' *
```
   - This will replace all spaces with underscores in the current directory.
   **Example:** If you have a file named `my file.txt`, running the command will rename it to `my_file.txt`.

**5. Rename Files with a Counter**
   - Rename files with a counter using this command:
```bash
perl-rename 's/(\d+)/sprintf("%03d",$1+1)/e' *.jpg
```
   - This will rename files with a numeric counter, ensuring three digits for the count.
   **Example:** If you have files named `image001.jpg`, `image002.jpg`, and `image003.jpg`, running the command will rename them to `image002.jpg`, `image003.jpg`, and `image004.jpg`, respectively.

**6. Add a Prefix to Filenames**
   - Add a prefix to filenames with this command:
```bash
perl-rename 's/^/prefix_/' *
```
   - This will add the prefix "prefix_" to all filenames in the current directory.
   **Example:** If you have a file named `file.txt`, running the command will rename it to `prefix_file.txt`.

**7. Capture Alphanumeric String in Filename**
   - Capture an alphanumeric string within a filename with this command:
```bash
perl-rename 's/ myfile ([A-Za-z0-9]+) movies/myfile $1 film/' *.txt
```

   - This command captures the alphanumeric string and replaces the filename accordingly.
   **Example:** If you have a file named `myfile_example_movies.txt`, running the command will rename it to `myfile_example_film.txt`.