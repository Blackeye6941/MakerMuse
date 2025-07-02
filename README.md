# MakerMuse
# 🤖 Discord RAG Bot using Google Gemini + Pinecone + LangChain

This project is an intelligent Discord chatbot that uses **Google Gemini** (or other LLMs) with **RAG (Retrieval-Augmented Generation)**, powered by:

- 🔍 Website scraping + chunking
- 🧠 Embedding + vector storage in Pinecone
- 🧑‍💬 Discord interaction using LangChain or LangGraph

---

## 🚀 Features

- ✅ Automatically crawls and chunks your dynamic website
- ✅ Embeds content with Gemini or LLaMA model
- ✅ Stores vectors in Pinecone (or Chroma, etc.)
- ✅ Answers questions on Discord using the RAG pipeline
- ✅ Grounded responses using custom data

---

## 🧩 Tech Stack

| Layer         | Tech                  |
|---------------|------------------------|
| Language Model| Google Gemini / LLaMA |
| Embedding     | Google Embedding API or LLaMA Embeddings |
| Vector Store  | Pinecone (can swap with Chroma) |
| Website Scraping | Puppeteer + Cheerio |
| Chunking      | LangChain TextSplitter |
| Bot Framework |       Discord.js       |
| RAG Engine    | LangChain RAG pipeline |

---