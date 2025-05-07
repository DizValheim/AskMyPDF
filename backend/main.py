from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz
from utils import pdf_to_text_chunks
from embedding_store import embed_and_store
from dotenv import load_dotenv
load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

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