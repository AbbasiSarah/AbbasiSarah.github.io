---
layout: post
title: "What is RAG? How AI chatbots answer from your own documents"
summary: "RAG lets a chatbot look things up in your files before it answers. Here is how it works in four simple steps, with a tiny Python example you can run today."
topic: Learn ML
---

Ask a normal AI chatbot about your college's exam rules or your clinic's opening hours, and it will often **guess**. It was never trained on your documents, so it fills the gap with something that sounds right. That is called a **hallucination**.

**RAG** fixes this. It stands for **Retrieval-Augmented Generation**, which is a long name for a simple idea:

> Before the AI answers, it first **looks up** the right part of your documents, then answers **using only that part**.

It is like an open-book exam. The student (the AI) is still smart, but now they check the book before writing the answer.

## RAG in four steps

**1. Split your documents into chunks.**
A 50-page handbook is too big to give the AI at once. So we cut it into small pieces, for example one paragraph each.

**2. Turn each chunk into numbers.**
Computers compare numbers, not words. An **embedding** model turns each chunk into a list of numbers (a *vector*), so that chunks with similar meaning get similar numbers. These vectors are saved in a **vector database**.

**3. Find the closest chunks to the question.**
When a user asks something, the question is also turned into a vector. The system finds the chunks whose numbers are closest to it. This is the **retrieval** part.

**4. Give the AI the question plus those chunks.**
The AI gets a prompt like *"Answer using only this information: … Question: …"*. Now its answer is based on your real documents. This is the **generation** part.

## Try it: a tiny RAG retriever in Python

You don't need a paid API to understand the idea. This example uses **TF-IDF** from scikit-learn as a simple stand-in for embeddings. Run it in Google Colab:

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. Your documents, already split into small chunks
chunks = [
    "Our clinic is open Monday to Saturday, 9 am to 7 pm.",
    "To book an appointment, call us or use the form on our website.",
    "We accept cash, card and most major insurance plans.",
    "Parking is free in the basement for all patients.",
]

# 2. Turn every chunk into numbers (a vector)
vectorizer = TfidfVectorizer()
chunk_vectors = vectorizer.fit_transform(chunks)

# 3. Turn the question into numbers and find the closest chunk
question = "What time do you open on Saturday?"
q_vector = vectorizer.transform([question])
scores = cosine_similarity(q_vector, chunk_vectors)[0]
best = scores.argmax()

print("Best chunk:", chunks[best])

# 4. This prompt is what you would send to the LLM
prompt = f"Answer using only this information:\n{chunks[best]}\n\nQuestion: {question}"
print(prompt)
```

The output picks the opening-hours chunk, because it shares the most important words with the question. In a real project you would swap TF-IDF for an embedding model, store the vectors in a vector database, and send the final prompt to an LLM.

## Where RAG is used

- **Student help desks** that answer from course handbooks and timetables
- **Clinic and business chatbots** that answer from FAQs, price lists and policies
- **Company assistants** that search internal documents and reports
- **Research tools** that find the right paper or paragraph in seconds

## Things to remember

1. **RAG is only as good as your documents.** Old or wrong files give old or wrong answers.
2. **Chunk size matters.** Too small and the meaning is lost; too big and the search gets fuzzy.
3. **Tell the AI to say "I don't know"** when the answer is not in the retrieved text. This keeps it honest.
4. **Keep private data private.** Only put documents into a chatbot that you are allowed to share with its users.

RAG is one of the most useful AI skills to learn right now, because almost every business has documents and questions about them.

---

*Want a chatbot like this for your clinic or small business? I build them at [saraautomates.com](https://saraautomates.com).*
