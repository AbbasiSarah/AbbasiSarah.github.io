---
layout: post
title: "Google DeepMind's AI just proved Signal's encryption is safe in 4 weeks"
summary: "AI agents wrote millions of lines of math proofs showing Signal's real encryption code keeps messages private, work that usually takes experts years."
topic: AI research
---

When you send a message on Signal or Google Messages, how do you *know* nobody else can read it? Usually we trust that clever people checked the code. This week, Google DeepMind showed that AI can help **prove it with maths**.

## What happened

On **10 November 2026**, Google DeepMind announced **AlphaProof Code**, a new system that combines human experts with AI agents to check that software does exactly what it promises.

Its first big test was the **Signal Protocol**, the encryption used by the Signal app and Google Messages. The team checked a real build of **libsignal** (Signal's main code library), right down to the **machine code that runs on Arm processors**, the chips inside most phones.

The whole job took **four weeks**. According to DeepMind, expert teams have historically needed **years** for similar work.

## How it works

The method is called **formal verification**: instead of testing code with a few examples, you write a mathematical proof that it is correct for *every* possible case.

1. **Humans decide what to prove.** Researchers, helped by AI models, turned Signal's security goals into precise maths rules. Human experts reviewed every one.
2. **AI agents write the proofs.** Agents powered by **Gemini Carbon** wrote **more than six million lines** of proofs in **Lean**, a language that checks proofs automatically.
3. **Humans review the tricky parts.** The agents flagged about **1%** of the code for people to check. Lean checked the rest.

What did they prove? For example, **forward secrecy**: if a hacker steals your phone's keys today, your *old* messages stay private. They also checked the opening "handshake" against a future where **quantum computers** could break older encryption.

To test the system, the team put **two old, already-fixed bugs** back into a separate copy of the code. Both times, AlphaProof Code produced a proof that the code was **no longer secure**. So it can catch problems, not just say "all good."

Signal's CTO, **Ehren Kret**, called turning live code into Lean theorems "a major breakthrough."

## Why it matters

Normal testing can show that bugs exist, but never that they don't. Formal proofs can, but they've been too slow and expensive for most projects. If AI makes this weeks instead of years, safety-critical software could finally get this level of checking. DeepMind says it wants to try power grids and medical devices next.

But it's not magic. The proofs only cover the **core protocol code**, not the whole app, and they rely on the researchers' assumptions about how attackers behave.

## What we can learn

1. **AI is becoming a checker, not just a writer.** The most exciting AI work isn't always generating code. Sometimes it's proving code is right.
2. **Humans still set the goals.** The AI proved things, but people decided *what* was worth proving.
3. **Try Lean.** If you like maths and coding, Lean is a great skill to explore, and DeepMind has made its verification files **free on GitHub**.

---

**Sources:** [Google DeepMind](https://deepmind.google/blog/introducing-alphaproof-code/) · [CyberInsider](https://cyberinsider.com/google-deepmind-signal-encryption-machine-code-verification/) · [The Decoder](https://the-decoder.com/google-deepminds-alphaproof-code-verified-signals-cryptographic-core-in-four-weeks-instead-of-years/)
