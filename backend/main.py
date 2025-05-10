from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz
from utils import pdf_to_text_chunks
from embedding_store import embed_and_store, load_index_and_text, search
from pydantic import BaseModel
import ollama

from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

class SearchRequest(BaseModel):
    query: str
    top_k: int = 5

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.on_event("startup")
async def on_startup():
    load_index_and_text()

@app.get("/")
def read_root():
    return {"message": "Home Page!"}

@app.get("/api/hello")
def read_root():
    return {"message": "Hello from FastAPI!!"}

@app.post("/api/upload-and-embed")
async def upload_and_embed(file: UploadFile = File(...)):
    contents = await file.read()
    chunks = pdf_to_text_chunks(contents)
    num_chunks = embed_and_store(chunks)
    return {"message" : f"Embedded and stored {num_chunks} chunks"}

@app.post("/api/search")
def search_pdf(req: SearchRequest):
    try:
        results = search(req.query, req.top_k)
        return {"results" : results}
    except Exception as e:
        return {"error" : str(e)}
    
@app.post("/api/ask")
def ask_question(req: SearchRequest):
    try:
        retrieved_chunks = search(req.query, req.top_k)
        prompt = f""" Use the following context to answer the question:
        {retrieved_chunks}

        Question: {req.query}
        """

        response = ollama.chat(
            model="mistral",
            messages=[
                {"role": "system", "content": "You are a helpful PDF assistant."},
                {"role": "user", "content": prompt}
            ]
        )
        answer = response["message"]["content"]

        return {"answer" : answer}

    except Exception as e:
        return {"error" : str(e)}
    

        