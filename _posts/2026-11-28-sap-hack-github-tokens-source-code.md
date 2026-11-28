---
layout: post
title: "SAP confirms a cyberattack after hackers reportedly used stolen tokens to change its code on GitHub"
summary: "German software giant SAP says it found suspicious activity and found no sign that customer business data was touched, while reports say attackers used employees' login tokens to copy and alter code on GitHub."
topic: Cybersecurity
---

**SAP** is one of the biggest software companies in the world. Huge businesses run their money, stock and staff records on its systems. This week, SAP confirmed it was hit by a cyberattack, and reports say the attackers went after the place where developers keep their code: **GitHub**.

## What happened

On **Thursday, 26 November 2026**, the German magazine **Der Spiegel** reported the attack, citing SAP insiders and an internal message to staff. On **27 November**, SAP confirmed it.

- According to the reports, attackers got hold of **SAP employees' authentication tokens**. A token is like a digital pass that proves you are already logged in, so you don't have to type your password again. Whoever holds a valid token can often act as you.
- Using these tokens, the attackers reportedly **copied and changed source code** stored on GitHub.
- Nobody has said **how the tokens were stolen** or **who the attackers are**.
- An internal memo reportedly gave the incident a code name: **"Project Granite"**.

SAP said it found "no evidence of unauthorized access to customer business data." It has **not publicly confirmed** the token theft or the code changes.

## What SAP did next

German media, including **Handelsblatt**, reported several emergency steps:

- **Replacing signing keys.** Signing keys are used to put a trusted "stamp" on software, so users know it really came from SAP. If attackers might have seen them, new ones are needed.
- **Limiting access to GitHub** for staff.
- **Pausing automated development processes**, the tools that build and ship code automatically. This affected many development teams.

## What we still don't know

SAP shares lots of public tools, samples and open-source projects on GitHub, so it is **not clear whether any private code was reached**. SecurityWeek notes that none of the reports say altered code made it into software sent to customers.

Some sources told Der Spiegel that **AI may have helped** the attackers. This is **unconfirmed**, and no technical proof has been shared. It is also not linked to an earlier attack on SAP's npm packages in April 2026.

## Why it matters

This is called a **software supply chain** risk. If attackers can change code at a big company, that code can travel to thousands of other companies that trust it. That is why SAP reacted so quickly, even before knowing the full picture.

## What we can learn

1. **Tokens are as precious as passwords.** Never paste them in chats, screenshots or public code. Give them short expiry times.
2. **Use the smallest access you need.** A token that can only read one repository does far less damage than one that can change everything.
3. **Turn on two-factor login** for your GitHub account, and check **Settings → Applications** for old apps you no longer use.
4. **Sign and review your code.** Signed commits and pull-request reviews make secret changes much harder to slip in.

---

**Sources:** [SecurityWeek](https://www.securityweek.com/sap-confirms-cyberattack-source-code-reportedly-compromised/) · [Techzine](https://www.techzine.eu/news/security/146116/sap-hit-by-hack-source-code-modified/) · [GBHackers](https://gbhackers.com/sap-hit-by-suspected-cyberattack/) · [FinanceFeeds](https://financefeeds.com/sap-hit-by-cyberattack-as-hackers-reportedly-steal-github-credentials-and-alter-source-code/)
