---
title: "ChatGPT Secret Codes - Hidden Prompts & Power Features"
date: 2026-01-13
tags: ['ChatGPT', 'prompt-engineering', 'chatgpt-tips', 'ai-tools']
---

---

* **Note:** These may behave slightly differently depending on which version of ChatGPT you’re using (free vs Plus, GPT-3.5 vs GPT-4o).  
* Works with GPT-powered tools (like Claude, Perplexity, etc.) too \- try it and let me know what works where.

---

## **Codes (You just type them as a prompt)**

### **1\. `ELI10:` – Explain Like I’m 10**

👶 Simplifies complex topics so even a child can understand.

📌 *Use for:* tech, science, finance, AI, etc.

**Example:**

`ELI10: How does quantum computing work?`

---

### **2\. `\\human` – Make it sound *actually* human**

🗣 Converts robotic-sounding AI responses into natural, conversational tone.

📌 *Use for:* emails, captions, replies, website copy… anything you want to sound like *you*.

**Example:**

`\\human Write a cold DM to a potential client without sounding pushy.`

---

### **3\. `TL;DR:` – Too Long; Didn’t Read**

📚 Summarizes long stuff in 2–3 sentences.

*Perfect for:* articles, docs, emails, blog drafts.

**Example:**

`TL;DR — What is cloud computing?`

---

### **4\. `JARGONIZE:` – Make it sound smart**

🧑‍💼 Converts simple language into expert-level, nerdy tone.

*Use for:* LinkedIn posts, whitepapers, grant proposals, pitch decks.

**Example:**

`JARGONIZE: Explain how cloud storage works.`

---

### **5\. `LISTIFY:` – Turn ideas into neat bullet lists**

📋 Converts any explanation into digestible list format.

*Use for:* blogs, Instagram carousels, tweets.

**Example:**

`LISTIFY: Best smartphones under ₹30,000 in 2025`

---

## **⚙️ Custom Instructions (Set once, use forever)**

Go to:

**ChatGPT \> Settings \> Personalization \> Custom Instructions**

Paste the below commands under:

*“What would you like ChatGPT to know about you?”* and *“How would you like ChatGPT to respond?”*

### **Paste These:**

1\. If I type /W or /w in my response, you will browse the web.  
2\. If I type /fix, fix all grammatical issues with the content, make it easy to understand, focus on clarity. Only respond with the proofread text.  
3\. If I type /human, respond in a way that sounds natural and human — not like it was written by AI.

---

### **✨ Examples of These:**

`/W best smartphones under ₹30,000 in 2025`

→ Browses the web and gives fresh, updated info.

`/fix This phone have a bestest camera for video shoot.`

→ Fixes grammar and returns: *This phone has one of the best cameras for video shooting.*

`/human Write an email to my boss asking for sick leave.`

→ Writes it like a real person would.

---

## **🔬 Hidden Parameters (Advanced, but powerful)**

| Parameter | What it Does | Example |
| ----- | ----- | ----- |
| `temp:` | Controls randomness. Lower \= more focused, Higher \= more creative. | `temp: 0.7 Tell me a story about a magical kingdom.` |
| `div_penalty:` | Encourages variety in words used. | `div_penalty: 1.5 Write a unique product description.` |
| `max_tokens:` | Limits output length. | `max_tokens: 50 Describe a sunset.` |
| `top_p:` | Controls breadth of options. Higher \= more randomness. | `top_p: 0.8 Write a creative story intro.` |
| `freq_penalty:` | Penalizes overused words. | `freq_penalty: 1 Write with rare vocabulary.` |
| `pres_penalty:` | Avoids repeating the prompt too much. | `pres_penalty: -1 Echo this: The sky is blue.` |
| `best_of:` | Chooses the best out of X generations. | `best_of: 3 What are AI's benefits?` |
| `n:` | Outputs X variations of the response. | `n: 4 Suggest YouTube titles for a video on AI tools.` |
| `echo:` | Decides whether to repeat input in response. | `echo: true Tell me about productivity hacks.` |
| `stop_sequences:` | Stops generation after certain phrases. | `stop_sequences: ["Conclusion:", "In short,"]` |
| `user_attributes:` | Personalizes output based on user info. | `user_attributes: {"age": "25", "interests": ["AI", "productivity"]}` |
| `system_level_settings:` | Controls memory, speed, or power use. | `system_level_settings: {"memory": "high"}` |