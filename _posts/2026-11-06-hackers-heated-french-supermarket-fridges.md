---
layout: post
title: "Hackers turned up the heat on 700 French supermarkets"
summary: "Internet-connected fridges were pushed to 50 °C overnight, spoiling tonnes of food and starting fires. Here is how a cyberattack reached the frozen-food aisle."
topic: Cybersecurity
---

On the night of **11–12 October 2026**, hackers took control of refrigeration systems in hundreds of supermarkets across France and pushed fridge and freezer temperatures as high as **50 °C**. By morning, meat, fish, dairy and ice cream had to be thrown away, and some stores had **fires**.

## How big was it?

- France's finance minister told parliament that about **700 stores** were affected.
- The chains hit included **Intermarché, Coopérative U, E.Leclerc, Carrefour and Monoprix**.
- The losses ran to **millions of euros** in spoiled food.
- Similar problems were reported in **Belgium and the Netherlands**.

The Paris prosecutor opened an investigation, and the Prime Minister asked France's cybersecurity agency, **ANSSI**, to lead the response. A minister said there was no risk to the country's food supply, but that the attack touched the heart of food security.

## How can someone hack a fridge?

Big supermarket fridges are run by small computers called **controllers**. They let engineers check temperatures and change settings remotely. ANSSI said the attacked systems were **Danfoss** controllers (models AK-SM800 and AK-SC355).

The problem is that many of these controllers were **reachable directly from the internet**, sometimes still with weak or default passwords. If an attacker can open the control panel, the attacker can change the temperature, just like the engineer can. In some stores the hackers reportedly triggered the *defrost* cycle remotely.

ANSSI told companies to:

1. **disconnect** these controllers from the internet, or restrict who can reach them;
2. **install software updates**;
3. **change passwords** and put remote access behind a secure connection (a VPN).

## Why this matters

We usually think of cyberattacks as stolen data or locked files. This one caused **physical damage**: wasted food, fires and empty shelves. Everything we connect to the internet, from cameras to coffee machines to fridges, is a door. If nobody locks it, someone will eventually walk in.

Two weeks later, the same kind of attack reached something even more sensitive: [French blood banks](/blog/hackers-targeted-french-blood-bank-fridges/).

---

**Sources:** [Al Jazeera](https://www.aljazeera.com/economy/2026/10/13/french-fridge-fright-why-supermarkets-have-become-target-for-hackers) · [Reuters via TimesLIVE](https://www.timeslive.co.za/news/world/2026-10-12-hackers-heat-french-supermarket-fridges-sparking-fires-and-food-losses/) · [AP via Spectrum News](https://mynews13.com/fl/orlando/ap-top-news/2026/10/13/cyberattack-targeting-refrigeration-systems-hits-700-supermarkets-french-government-says) · [To Vima](https://www.tovima.com/world/france-supermarket-cyberattack-raises-food-security-concerns/)
