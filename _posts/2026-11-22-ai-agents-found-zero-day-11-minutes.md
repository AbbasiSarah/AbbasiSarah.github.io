---
layout: post
title: "Hackers' AI agents found a brand-new bug in 11 minutes"
summary: "Amazon says suspected China-linked hackers used a free AI hacking tool called Cairn to discover an unknown flaw in medical imaging software and take over a university server."
topic: Cybersecurity
---

We often hear that AI will help hackers one day. This week, Amazon shared a real case where **AI agents found a never-seen-before security hole on their own** and used it to break into a university computer. It is a useful story for anyone who builds or runs AI tools.

## What happened

On **20 November 2026**, **Amazon Threat Intelligence** published a report about a hacking campaign that started on **8 September 2026** against universities in **East Asia**.

- The attackers used **Cairn**, a free, **open-source** "penetration testing" framework. Penetration testing means attacking your own systems on purpose to find weak spots. Cairn runs a team of **AI agents** (AI programs that plan and take actions step by step) that share what they learn and work towards a goal.
- The human operator gave the agents a list of target addresses and one goal: **get shell access** (control of a computer through its command line).
- The agents found a server running **MONAI Label**, an open-source tool that helps researchers label medical scans like CT and MRI images for training AI models.
- After mapping the app's API, the agents found a **path traversal** bug. That means the app trusted a file name it was given, so a name like `../../` could escape the safe folder and write files anywhere. About **11 minutes** later, they could write files on the server.
- In a later session, they hid a small program in a Python startup file, triggered the app's training feature, and got a **root shell**: full control of the machine.

Amazon says, with **high confidence**, that this was a **zero-day**: a flaw nobody had known about or fixed. It links the attackers to China with only **moderate confidence**, based on clues like Chinese-language prompts and China Standard Time timestamps.

Amazon spotted all this because the attackers **left their own Cairn server open to the internet** without a password, showing their prompts and results.

## The AI didn't win every time

The agents also failed a lot. They spent about **16 hours and 148 steps** attacking a database at a university and got nowhere. Against a GPU server, they tried **more than 30,000 username and password combinations** for over six hours, with no luck. Later, the human operator gave the agents a way into a **second university's** network.

## Is it fixed?

The MONAI Label team published a security advisory on **18 November** and wrote a fix. Reports disagree about whether a patched version is ready to install yet. The Cloud Security Alliance says **version 0.8.5 and earlier** are affected and advises turning on login (authentication is **off by default**), keeping the server off public networks, and running it with limited permissions.

## What we can learn

1. **AI makes old mistakes faster to find.** Path traversal is a classic bug. AI agents simply never get tired of looking for it.
2. **Never trust input.** Always clean file names and paths before you use them in your code.
3. **Research tools need security too.** Lab servers and GPU machines are often left open. Turn on passwords and close what you don't need.
4. **Defenders can use AI as well.** The same kind of tool can help you test your own projects before attackers do.

---

**Sources:** [Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-monai-label-agent-discovered-zero-day-2026/) · [ShiftDelete](https://shiftdelete.net/en/cairn-ai-agents-zero-day-server-takeover) · [WindowsForum](https://windowsforum.com/news/amazon-cairn-ai-agents-exploited-monai-label-zero-day-to-gain-root-access.453437/) · [Mallory](https://mallory.ai/stories/01a1fa22-b472-7d45-9bbd-6aeff0bf64b2)
