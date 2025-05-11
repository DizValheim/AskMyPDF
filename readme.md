# 📚 AskMyPDF – AI PDF Question Answering App

AskMyPDF is a full-stack application that lets you upload a PDF and ask questions about its contents using natural language. It uses HuggingFace embeddings with FAISS to provide accurate semantic search responses from the document which then gets feeded as context to ollama Mistral LLM and provides fast answers to asked questions.

---

## 🚀 Features

- Upload any PDF (text-based)
- Chunk and embed the PDF using `sentence-transformers` (`all-MiniLM-L6-v2`)
- Store embeddings in FAISS vector index
- Query the document using semantic search
- 🔥 (Optional) Get full sentence answers using **Ollama** LLMs locally
- React frontend with real-time search and upload UI

---

## 🛠️ Tech Stack

### 🧠 Backend (FastAPI)
- `sentence-transformers` – for embeddings
- `faiss-cpu` – similarity search
- `PyMuPDF` – PDF parsing
- `FastAPI` – backend API
- `Ollama` – run LLMs locally (e.g., Mistral, LLaMA3)
- `python-dotenv` – config management

### 🎨 Frontend (React + TypeScript)
- React + Vite
- TailwindCSS
- Axios

---

## 🧪 Ollama Integration

You can optionally enable LLM-generated answers via [Ollama](https://ollama.com/) (runs on your local machine). This lets you go beyond retrieval — the app can now generate natural answers from top search chunks.

### 🔧 Setup:

1. Install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. Pull a model (e.g., `mistral`):
   ```bash
   ollama pull mistral
   ```

3. Run the model:
   ```bash
   ollama run mistral
   ```

4. The app will POST chunks to `http://localhost:11434/api/generate` with your query to generate an answer.

---

## 📁 Project Structure

```
askmypdf/
├── backend/
│   ├── main.py
│   ├── utils/
│   ├── vector_store/
│   └── .env
├── frontend/
│   ├── src/components/
│   └── src/api/
```

---

## 📌 Future Enhancements

- Better chunk-ranking with LangChain
- Chat history per document
- JWT-based user auth
- Docker setup for deployment
- Multi-model LLM routing (OpenAI + Ollama fallback)

---

## 💡 Acknowledgments

- HuggingFace
- Facebook FAISS
- FastAPI
- PyMuPDF
- [Ollama](https://ollama.com/)
