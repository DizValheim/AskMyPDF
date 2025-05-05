from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz

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

@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    contents = await file.read()

    with open("temp.pdf", "wb") as f:
        f.write(contents)
    
    text = ""
    with fitz.open("temp.pdf") as doc:
        for page in doc:
            text += page.get_text()
    
    return {"text": text}