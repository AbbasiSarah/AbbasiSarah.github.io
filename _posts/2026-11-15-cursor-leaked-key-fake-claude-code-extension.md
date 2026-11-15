---
layout: post
title: "How one leaked key let hackers sneak a fake Claude Code extension into Cursor"
summary: "Cursor says an access key exposed by its AI vendor Fireworks started a chain of break-ins that ended with a backdoored coding extension reaching up to 5,000 developers."
topic: Cybersecurity
---

Many of us now code with AI helpers inside editors like **Cursor** or VS Code. We install extensions with one click and trust them. This week, Cursor explained how that trust was broken, and the story starts with **one leaked key**.

## What happened

On **13 November 2026**, Cursor published an update on a security incident from late October. Here is the chain of events, as Cursor describes it:

1. Cursor had given an **access key** (a secret password that lets one computer system talk to another) to **Fireworks AI**, a company that runs AI models for it.
2. Fireworks was itself hacked in October, and that key was **exposed**.
3. The attacker used the key to read a **shared storage bucket** (an online folder for files). It held coding-agent records, mostly from **2025**, from sessions where users had **not** turned on Privacy Mode.
4. Some of those records still contained **passwords and keys** that should have been removed. The attacker used them to get into other Cursor systems.
5. On **29 October**, with another stolen credential, the attacker slipped modified copies of the **Claude Code extension** (versions **2.1.312 and 2.1.313**, for Windows and macOS) into the cache behind Cursor's extension marketplace.

The fake versions were live for about **11 hours** and could have reached **up to 5,000 users**. Cursor stresses that this is a possible number, not confirmed infections. It also says **Anthropic did not publish** these copies and Anthropic's own product was not vulnerable.

## How the fake extension worked

The extension ran hidden code the moment it loaded. It tried to **add the attacker's SSH key** (a digital key for logging into a computer remotely), open a **reverse tunnel** (a secret back door connection), and set itself to start again after a restart. It also sent out details like the computer's name, username, Git email and the **names** of secret-looking environment variables. On most machines remote login failed because it needed admin rights, but other changes may still have stuck.

## What Cursor changed

Cursor says it **moved all AI traffic away from Fireworks**, cut off the vendor's access, **rotated** (replaced) its credentials, rebuilt its marketplace and added more secret scanning. The last attacker activity it saw was on **1 November**, and it was blocked.

## What we can learn

1. **Your security depends on your vendors.** Cursor wasn't hacked first. A partner was.
2. **Never leave secrets in logs or data.** Old records with real passwords inside turned a small leak into a big one. Scan for secrets before you store anything.
3. **Deleting a bad extension isn't enough.** Cursor warns the backdoor can stay behind. Check SSH keys and startup scripts, and replace any passwords that were on the machine.
4. **Turn on privacy settings** in AI tools when your work is sensitive.
5. **Give keys the smallest power possible**, so one leak can't open every door.

---

**Sources:** [Cyber Security News](https://cybersecuritynews.com/cursor-data-breach/amp/) · [Business Upturn](https://businessupturn.com/technology/cursor-says-exposed-fireworks-access-key-led-to-claude-code-extension-attack/) · [GovInfoSecurity](https://www.govinfosecurity.com/cursor-confirms-anthropic-claude-code-extension-compromised-a-33263) · [The Next Web](https://thenextweb.com/news/tampered-claude-code-extension-cursor-ssh-backdoor) · [The Register](https://www.theregister.com/a/5308722)
