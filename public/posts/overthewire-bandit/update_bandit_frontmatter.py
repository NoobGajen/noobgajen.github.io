import os
import re
import glob

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Split frontmatter and content
    parts = re.split(r'^---\s*$', content, flags=re.MULTILINE)
    
    if len(parts) < 3:
        print(f"Skipping {filepath}: Invalid format")
        return

    frontmatter = parts[1]
    body = parts[2]
    
    # Extract existing title, date, weight
    title_match = re.search(r'title:\s*"(.*)"', frontmatter)
    date_match = re.search(r'date:\s*([\d-]+)', frontmatter)
    weight_match = re.search(r'weight:\s*(-?\d+)', frontmatter)
    
    title = title_match.group(1) if title_match else ""
    date = date_match.group(1) if date_match else ""
    weight = weight_match.group(1) if weight_match else ""

    # Determine tags
    filename_base = os.path.splitext(os.path.basename(filepath))[0]
    tags = ["OverTheWire", "Bandit", "SSH", "Linux", filename_base]
    if "git" in body.lower():
         tags.append("Git")
    
    # Extract description from body (first non-empty line that isn't a header)
    description = ""
    for line in body.strip().split('\n'):
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('Done') and len(line) > 20:
            description = line.replace('"', '\\"') # Escape quotes
            break
    
    if not description:
         description = f"Walkthrough for {title}"

    # Construct new frontmatter
    new_frontmatter = f"""---
title: "{title}"
date: {date}
tags: {str(tags).replace("'", '"')}
description: "{description}"
hidemeta: false
hideSummary: false
weight: {weight}
cover:
  image: "/images/Bandit/bandit-level.jpg"
  alt: "Bandit Wargame"
  relative: true
---"""

    # Reassemble file
    new_content = new_frontmatter + body
    
    with open(filepath, 'w') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

# Process all bandit files
files = glob.glob("bandit-level-*.md")
files.sort()

for file in files:
    update_file(file)
