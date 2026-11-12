---
layout: post
title: "Can one week of wrist movement screen for depression? I built an AI to find out"
summary: "WearCNN-Guard: a 1-D CNN written from scratch in NumPy, trained on 8,723 adults, that gives three honest answers and says 'not sure' when the data isn't enough."
topic: AI research
---

<video class="post-video" controls playsinline preload="none" poster="{{ '/assets/videos/reel-wearcnn-guard.jpg' | relative_url }}"><source src="{{ '/assets/videos/reel-wearcnn-guard.mp4' | relative_url }}" type="video/mp4"></video>

Depression changes how people move: sleep gets irregular, days get flatter, rest and activity lose their rhythm. Wrist trackers record exactly that. So I asked a simple question: **how far can one week of wrist movement go in screening for depression, and can the AI be honest about when it doesn't know?**

## The data

I used **NHANES 2011–2014**, a public US health survey in which **8,723 adults** wore a wrist activity tracker for a week and filled in the **PHQ-9** depression questionnaire. A PHQ-9 score of 10 or more counts as "depressed" (about 9% of people).

## The model

**WearCNN-Guard** is a **1-D convolutional neural network** that I wrote from scratch in NumPy, with no deep-learning framework. It reads each person's **average day** (minute by minute, in 10-minute steps) and **how much their days vary**, and outputs the probability of depression.

## Three honest answers

A probability alone can mislead. So I added **conformal prediction**, a statistical method that turns the score into one of three answers:

- **Likely depressed**
- **Likely not depressed**
- **Not sure:** use the PHQ-9 questionnaire

It comes with a **mathematical guarantee**: the answer includes the true one for **90% of people**. Using class-conditional calibration, that also holds **for depressed people**, the group that matters most.

## What I found

- The CNN reaches an **AUC of 0.65** from movement alone (0.68 with age and sex). That's clearly better than chance, but movement is only part of the picture.
- Only **about 1 in 3 people** get a confident answer. For the rest, the model honestly says "not sure", which is exactly when a questionnaire should be used.
- **Standard** conformal prediction can fail the people who matter: with one model it covered only **36–39% of depressed people**, even though overall coverage looked fine at 90%. Calibrating each group separately fixes this.

## Why it matters

Wearables are everywhere, and AI health claims are often overconfident. A screening tool that **knows its limits** is safer than one that always gives an answer.

**Next step:** testing the same pipeline on data from a consumer smartwatch.

*This is a research project, not a medical device or a diagnosis. If you are struggling, please talk to a professional.*

**[View the code on GitHub](https://github.com/AbbasiSarah/wearcnn-guard)**
