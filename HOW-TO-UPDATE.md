# How to update your SheCodesAI site (no coding needed)

Every change is made on github.com in this repository. After you click **Commit changes**,
the site updates by itself within 1-2 minutes.

## Write a new AI Trends post
1. Open the `_posts` folder and click **Add file → Create new file**.
2. Name it like this: `2026-11-20-my-post-title.md` (date first, then words joined by dashes).
3. Paste this at the top, then write your post below it:

```
---
layout: post
title: "Your post title"
summary: "One sentence that appears in the post list."
topic: AI news
---

Your text here. Use ## for a heading, **bold**, and [link text](https://...).
```
4. Click **Commit changes**.

## Add an Instagram Reel
1. On Instagram, open the reel → **...** → **Copy link**.
2. Open `_data/reels.yml`, click the pencil (Edit), and add a new line at the top of the list:
   `- https://www.instagram.com/reel/XXXXXXXXXXX/`
3. Click **Commit changes**.

## Add or edit a project
Open `_data/projects.yml`, click the pencil, copy one project block and change the words.

## Change your links (Instagram, LinkedIn, email)
Open `_config.yml`, click the pencil, and edit the addresses in quotes.

## Keep it secure
- Turn on two-factor authentication on GitHub (Settings → Password and authentication).
- Never paste passwords, API keys or private information into any file here: everything in this repository is public.
