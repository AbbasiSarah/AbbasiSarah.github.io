// Code Quest challenges. Types: "blank" (fill the ____), "output" (what does it print?),
// "bug" (click the line with the bug), "concept" (pick the answer).
// answer = index of the correct option (or bug line, counting from 0). note = roadmap topic id.
window.QUEST = [
  {
    id: "python", title: "Python Plains", badge: "Pythonista", icon: "🐍",
    intro: "Warm up with lists, loops and dictionaries.",
    challenges: [
      { type: "blank", q: "Complete the list comprehension so it makes the squares of 0–4.",
        code: "squares = [x**2 ____ x in range(5)]\nprint(squares)   # [0, 1, 4, 9, 16]",
        options: ["for", "in", "while", "each"], answer: 0,
        why: "A list comprehension reads like English: [expression for item in iterable].", note: "python-basics" },
      { type: "output", q: "What does this print?",
        code: "nums = [3, 1, 2]\nnums.sort()\nprint(nums[-1])",
        options: ["3", "2", "1", "[1, 2, 3]"], answer: 0,
        why: "sort() orders the list in place: [1, 2, 3]. Index -1 is the last item: 3.", note: "python-basics" },
      { type: "output", q: "What does this print?",
        code: "d = {'a': 1}\nd['b'] = d.get('b', 0) + 1\nprint(d)",
        options: ["{'a': 1, 'b': 1}", "{'a': 1, 'b': 0}", "KeyError", "{'a': 2}"], answer: 0,
        why: "get('b', 0) returns 0 when 'b' is missing, so d['b'] becomes 1. No KeyError.", note: "python-basics" },
      { type: "bug", q: "This crashes when called with an empty list. Click the line that fails.",
        code: "def average(nums):\n    total = 0\n    for n in nums:\n        total += n\n    return total / len(nums)\n\nprint(average([]))",
        answer: 4,
        why: "len([]) is 0, so total / 0 raises ZeroDivisionError. Check for an empty list first.", note: "python-basics" }
    ]
  },
  {
    id: "data", title: "Data Desert", badge: "Data Wrangler", icon: "🐼",
    intro: "NumPy arrays and Pandas tables.",
    challenges: [
      { type: "output", q: "What does this print?",
        code: "import numpy as np\na = np.array([1, 2, 3])\nprint(a * 2)",
        options: ["[2 4 6]", "[1, 2, 3, 1, 2, 3]", "[1 2 3 1 2 3]", "TypeError"], answer: 0,
        why: "NumPy multiplies every element (vectorisation). A Python list would repeat instead: [1, 2, 3, 1, 2, 3].", note: "numpy" },
      { type: "output", q: "What is the shape?",
        code: "import numpy as np\nm = np.zeros((3, 4))\nprint(m.T.shape)",
        options: ["(4, 3)", "(3, 4)", "(12,)", "(4,)"], answer: 0,
        why: ".T transposes: rows become columns, so (3, 4) becomes (4, 3).", note: "linear-algebra" },
      { type: "blank", q: "Get the average sales per city.",
        code: "df.____('city')['sales'].mean()",
        options: ["groupby", "sort_values", "merge", "drop"], answer: 0,
        why: "groupby splits the table by city, then .mean() summarises each group.", note: "pandas" },
      { type: "output", q: "What does this print?",
        code: "import pandas as pd\ns = pd.Series([1, None, 3])\nprint(s.mean())",
        options: ["2.0", "nan", "1.33", "TypeError"], answer: 0,
        why: "Pandas skips missing values (NaN) by default: (1 + 3) / 2 = 2.0.", note: "cleaning" }
    ]
  },
  {
    id: "ml", title: "Model Mountains", badge: "Model Builder", icon: "🌲",
    intro: "Train, test and avoid the classic traps.",
    challenges: [
      { type: "blank", q: "Split the data so you can test on unseen rows.",
        code: "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = ____(X, y, test_size=0.2)",
        options: ["train_test_split", "cross_val_score", "fit_transform", "split"], answer: 0,
        why: "train_test_split shuffles and holds out 20% of rows as a test set.", note: "supervised" },
      { type: "concept", q: "99% of emails are not spam. A model that ALWAYS says \"not spam\" has what accuracy?",
        options: ["99%, but it catches 0% of spam", "50%", "1%", "0%"], answer: 0,
        why: "High accuracy can be useless on imbalanced data. Check recall and precision too.", note: "evaluation" },
      { type: "bug", q: "This code leaks test information into training. Click the guilty line.",
        code: "scaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\nX_train, X_test, y_train, y_test = train_test_split(X_scaled, y)\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))",
        answer: 1,
        why: "The scaler learns the mean and std from ALL rows, test rows included. Split first, then fit the scaler on the training rows only (or use a Pipeline).", note: "evaluation" },
      { type: "concept", q: "Which model usually wins on spreadsheet-style (tabular) data?",
        options: ["Gradient boosting", "A single decision tree", "K-means", "A CNN"], answer: 0,
        why: "Gradient-boosted trees (XGBoost, LightGBM, HistGradientBoosting) are the go-to for tables.", note: "trees" }
    ]
  },
  {
    id: "dl", title: "Neural Forest", badge: "Neural Ninja", icon: "🧠",
    intro: "Neurons, layers and training loops.",
    challenges: [
      { type: "output", q: "What does this print?",
        code: "relu = lambda x: max(0, x)\nprint(relu(-3), relu(2))",
        options: ["0 2", "-3 2", "3 2", "0 0"], answer: 0,
        why: "ReLU keeps positive numbers and turns negatives into 0.", note: "neural-nets" },
      { type: "blank", q: "Complete the PyTorch training step.",
        code: "loss = loss_fn(model(xb), yb)\noptimizer.zero_grad()\nloss.backward()\noptimizer.____()",
        options: ["step", "update", "train", "fit"], answer: 0,
        why: "backward() computes gradients; step() uses them to update the weights.", note: "pytorch" },
      { type: "concept", q: "Training loss keeps falling but validation loss starts rising. What is happening?",
        options: ["Overfitting", "Underfitting", "Data leakage", "The learning rate is too small"], answer: 0,
        why: "The model is memorising the training data. Try more data, dropout, weight decay or early stopping.", note: "neural-nets" },
      { type: "concept", q: "A 28×28 image goes through Conv2d(1, 8, 3, padding=1) then MaxPool2d(2). Output shape?",
        options: ["8 × 14 × 14", "8 × 28 × 28", "1 × 14 × 14", "8 × 26 × 26"], answer: 0,
        why: "padding=1 keeps 28×28 with 8 filters; pooling by 2 halves it to 14×14.", note: "cnn" }
    ]
  },
  {
    id: "ai", title: "AI Galaxy", badge: "AI Architect", icon: "🚀",
    intro: "LLMs, RAG and agents: the trending frontier.",
    challenges: [
      { type: "concept", q: "What does RAG stand for?",
        options: ["Retrieval-Augmented Generation", "Random Attention Graph", "Recurrent Adaptive Gradient", "Reinforced AI Generation"], answer: 0,
        why: "RAG retrieves relevant documents first, then the LLM generates an answer grounded in them.", note: "rag" },
      { type: "concept", q: "Your chatbot doesn't know your company's latest policies. Best first fix?",
        options: ["RAG over the policy documents", "Fine-tune on the policies", "Use a bigger model", "Lower the temperature"], answer: 0,
        why: "RAG adds up-to-date knowledge without retraining. Fine-tuning is better for style or format, not facts.", note: "rag" },
      { type: "output", q: "Attention weights use softmax. What does this print?",
        code: "import numpy as np\ns = np.array([1.0, 1.0])\nprint(np.exp(s) / np.exp(s).sum())",
        options: ["[0.5 0.5]", "[1. 1.]", "[2.718 2.718]", "[0. 1.]"], answer: 0,
        why: "Equal scores get equal attention: softmax turns them into weights that sum to 1.", note: "transformers" },
      { type: "concept", q: "An AI agent can send emails. What is the most important safety step?",
        options: ["Ask a human to approve before sending", "Use a faster model", "Give it more tools", "Remove the step limit"], answer: 0,
        why: "Agents that take real actions need guardrails: approval for risky steps and a step limit.", note: "agents" }
    ]
  }
];
