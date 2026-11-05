---
layout: post
title: "I built a neural network without TensorFlow or PyTorch"
summary: "What I learned writing a convolutional neural network in plain NumPy, and how it reached 98.7% accuracy on handwritten digits."
topic: Deep learning
---

Most deep learning tutorials start with `import tensorflow`. For my latest projects I did the opposite: I wrote every layer myself in **NumPy**, including the convolution, pooling, the backward pass and the optimiser.

## What I built

- A **digit recogniser**: a small convolutional neural network (CNN) with about 52,000 parameters. It reaches **98.71% accuracy** on the 10,000 MNIST test images. [Try drawing a digit](https://abbasisarah.github.io/handwritten-digit-cnn/).
- A **depression-detection model** that reads one day of wrist-activity data. On people it had never seen, it reached 71% accuracy. [See the research project](https://abbasisarah.github.io/depression-bipolar_CNN/).

## Three things I learned

1. **A convolution is a matrix multiplication in disguise.** Cut the image into small patches, lay each patch out as a row, and one matrix product does the whole layer. This trick is called *im2col*.
2. **Always check your gradients.** I compared every hand-written gradient with a numerical estimate, (f(x + ε) − f(x − ε)) / 2ε. If they disagree, the network still trains, just badly, and you never find out why.
3. **How you test matters more than the model.** In health data, if the same person's days are in both training and test sets, accuracy looks close to 99% while the model has only learned to recognise the person. Testing on new people gave the honest number.

The code for both projects is on my [GitHub](https://github.com/AbbasiSarah).
