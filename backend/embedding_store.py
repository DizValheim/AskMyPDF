import os
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from typing import List

model = SentenceTransformer("all-MiniLM-L6-v2")

index = None
stored_text = []

def embed_and_store(chunks: List[str]) -> int:
    global index, stored_text
    
    embeddings = model.encode(chunks, convert_to_numpy=True)

    if index is None:
        dim = embeddings.shape[1]
        index = faiss.IndexFlatL2(dim)

    index.add(embeddings)
    stored_text.extend(chunks)

    os.makedirs("vector_store", exist_ok=True)

    faiss.write_index(index, "vector_store/faiss.index")

    with open("vector_store/texts.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(stored_text))

    return len(chunks)

def load_index_and_text() -> None:
    global index, stored_text

    # Load FAISS index
    if os.path.exists("vector_store/faiss.index"):
        index = faiss.read_index("vector_store/faiss.index")
    
    # Load stored text
    if os.path.exists("vector_store/texts.txt"):
        with open("vector_store/texts.txt", "r", encoding="utf-8") as f:
            stored_text = f.read().splitlines()