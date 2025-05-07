import fitz
from langchain.text_splitter import RecursiveCharacterTextSplitter

def pdf_to_text_chunks(file_bytes: bytes, chunk_size=500) -> list[str]:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    text = ""
    
    for page in doc:
        text += page.get_text()
    doc.close()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=50,
        separators=["\n\n", "\n", ".", " ", ""]
    )
    return splitter.split_text(text)
