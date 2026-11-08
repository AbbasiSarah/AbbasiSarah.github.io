---
layout: post
title: "Your first machine learning model in 8 steps (Google Colab)"
summary: "Predict a student's exam score from study hours with Linear Regression. Free notebook with exercises and solutions, no installation needed."
topic: Learn ML
---

<video class="post-video" controls playsinline preload="none" poster="{{ '/assets/videos/reel-first-ml-model-colab.jpg' | relative_url }}"><source src="{{ '/assets/videos/reel-first-ml-model-colab.mp4' | relative_url }}" type="video/mp4"></video>

**[▶ Open the notebook in Google Colab](https://colab.research.google.com/github/AbbasiSarah/ml-roadmap/blob/main/colab/01-predict-exam-score-linear-regression.ipynb)**. It's free, runs in your browser, and needs no installation.

## The exercise

We have data about 10 students: how many hours each one studied, and the score they got. A new student studied **6.5 hours**. What score will they get?

We'll answer with **Linear Regression**, the simplest machine learning model. It draws the best straight line through the data.

## The 8 steps

1. **Import the libraries:** pandas for tables, matplotlib for charts, scikit-learn for the model.
2. **Create the data:** two lists, hours and score, turned into a table (a DataFrame).
3. **Plot it:** the dots almost make a straight line, so a straight-line model fits.
4. **Split into X and y:** X is what we know (hours) and y is what we predict (score).
5. **Train:** `model.fit(X, y)`. The model learns a slope of **7.6**: every extra hour adds about 7.6 marks.
6. **Check:** R² is **0.998** (1 = perfect fit).
7. **Predict:** 6.5 hours → **76.3 marks**.
8. **Draw the line** and see the new student sitting right on it.

The model's rule is simply:

```
score = 7.6 × hours + 26.9
```

You can check it by hand: 7.6 × 6.5 + 26.9 = 76.3.

## Now you try

The notebook ends with three exercises:

1. Predict the score for **3.5 hours**.
2. Predict for **9 hours**. Is it safe to predict beyond our data?
3. Add a new student (5.5 hours, 69 marks) and train again. Does the slope change?

Solutions are hidden at the bottom of the notebook. Try first, then check!

## One honest note

R² = 0.998 is very high because this is small, clean practice data. Real data is messier. In real projects, we keep some data aside (a **test set**) and check the model on data it has never seen. That's the next exercise.

More exercises are in my [ML Roadmap on GitHub](https://github.com/AbbasiSarah/ml-roadmap/tree/main/colab).
