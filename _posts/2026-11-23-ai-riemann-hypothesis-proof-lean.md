---
layout: post
title: "A mathematician says AI helped him prove the Riemann Hypothesis, and Lean checked it"
summary: "Levent Alpöge says he proved one of math's most famous unsolved problems with help from Claude, and the Lean and Mathlib communities say the computer-checked proof is correct."
topic: AI research
---

The **Riemann Hypothesis** has been called the most famous unsolved problem in mathematics. It is **more than 160 years old**, and nobody has been able to prove it. This week, a mathematician says he did it, working with an AI, and the proof was checked by a computer rather than only by people.

## What happened

On **20 November 2026**, mathematician **Levent Alpöge**, who works at **Anthropic**, released a proof of the Riemann Hypothesis written in **Lean**. Lean is a programming language for maths: you write a proof as code, and a small, trusted program called the **kernel** checks every single step. If anything is wrong, the code will not pass.

- The proof is a Lean library of about **17 million lines of code**, split into about **175,187 files**.
- In his note, Alpöge says he worked with **Claude** for **roughly six weeks**, and that Claude "far outpaced me near the finish line."
- On **21 November**, the **Lean and Mathlib communities** released a joint statement, endorsed by the **Lean FRO** and the **Mathlib Initiative**. (Mathlib is Lean's big shared library of maths.) They said they have **"full confidence"** that the proof is correct.

## How it was checked

A computer check is only useful if two things are true: the proof passes, and the statement really says what we think it says. So checkers did both.

1. **Dozens of people** downloaded the code and rebuilt it on their own machines.
2. They used tools such as **comparator** to confirm that the theorem proved is exactly Mathlib's standard definition of the Riemann Hypothesis, not a weaker look-alike.
3. Several **independent kernels** (different programs that check Lean proofs) accepted it, and the proof uses only Lean's **three standard axioms** (basic starting rules).

MIT mathematician **Andrew Sutherland** published logs of his checks. Some longer checks were still running on 22 November.

## Why it matters

This could be one of the biggest moments in the history of maths, and AI helped make it. It also shows a new way to trust AI work: instead of believing a chatbot, we can ask it to write proofs that a strict checker verifies.

There are still open questions:

- **No human-readable paper yet.** Lean says the proof is correct, but mathematicians still need to understand *why* it works. Alpöge himself warns his summary may need corrections.
- **The bigger "generalized" version** is only partly covered. Reports say only one family of cases, for **Dirichlet L-functions**, has been checked so far.
- **The $1 million Clay prize** is not automatic. The Clay Institute requires publication and a waiting period of two years, and it still listed the problem as unsolved on 21 November.

## What we can learn

1. **Check, don't just trust.** The most powerful AI result of the year came with a way to verify it. Build that habit into your own projects with tests.
2. **AI works best with people.** Alpöge guided the work for weeks; Claude sped it up.
3. **Formal tools are worth learning.** Lean is free, and its community is welcoming to beginners. It could become a key skill for AI and maths.
4. **Big claims need time.** Correct code is a huge step, but understanding and peer review come next.

---

**Sources:** [Lean Community blog](https://leanprover-community.github.io/blog/posts/riemann-hypothesis/) · [AgentsPulse](https://agentspulse.github.io/tutorials/riemann-hypothesis-lean-proof/) · [Kingy AI](https://kingy.ai/blog/levent-alpoge-claude-riemann-hypothesis-proof/) · [DEV Community](https://dev.to/delimitter/lean-and-mathlib-communities-certify-alpoges-proof-of-the-riemann-hypothesis-as-correct-40h) · [LavX News](https://news.lavx.hu/article/lean-and-mathlib-communities-certify-proof-of-riemann-hypothesis)
