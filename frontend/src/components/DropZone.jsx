import { useRef, useState } from "react";

export default function DropZone() {
  const [pdfFile, setPdfFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false)
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);

  function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragging(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);
  }

  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    setDragging(false);

    const file = event.dataTransfer.files[0];

    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      console.log("PDF file uploaded: ", file.name);
    } else {
      alert("Please drop a valid PDF file.");
    }
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      console.log("PDF file uploaded: ", file.name);
    } else {
      alert("Please drop a valid PDF file.");
    }
  }

  async function uploadPDF() {
    if(!pdfFile) return alert("Please Choose a file!");

    const formData = new FormData();
    formData.append("file", pdfFile);
    setAnalyzing(true);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-and-embed`, {
      method: 'POST',
      body: formData,
    });

    setAnalyzing(false);
    setAnalyzed(true);
    const data = await res.json();
    setText(data.message);
  }

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-9/10 h-2/5 mx-auto my-10 ${analyzed || analyzing ? "hidden": "flex flex-col" }  rounded-xl bg-[#94897930] outline-2 outline-dashed outline-[#dfd0b8] cursor-pointer `}
      >
        <div className="w-full text-center">
            <div className="mt-5"><img height={70} width={70} className="block mx-auto" src="https://img.icons8.com/?size=100&id=82775&format=png&color=948979" alt="Doc Img" /></div>
            <p className="mt-2 text-xl text-[#dfd0b8]">{pdfFile? `Uploaded: ${pdfFile.name}` : "Click or drag and drop your PDF here"}</p>
        </div>
      </div>
        <button className={`w-9/10 p-5 bg-[#948979] rounded-xl text-[#dfd0b8] ${(analyzed || analyzing) && "hidden"} text-2xl font-bold cursor-pointer ${analyzing && "animate-pulse"}`} onClick={uploadPDF}>{analyzing ? "Analyzing..." : (analyzed ? "Analyzed!" : "Analyze")}</button>
      <div className={` ${!analyzing ? "hidden" : "flex flex-col"} justify-center`}>
        <img className="block mx-auto my-10 animate-spin" height={100} width={100} src="https://img.icons8.com/?size=100&id=33889&format=png&color=dfd0b8" alt="checkmark" />
      </div>
      <div className={` ${!analyzed ? "hidden" : "flex flex-col"} justify-center`}>
        <img className="block mx-auto my-10" height={100} width={100} src="https://img.icons8.com/?size=100&id=UrUFNWAeX8fJ&format=png&color=dfd0b8" alt="checkmark" />
        <p className="text-2xl text-[#dfd0b8] font-bold">{pdfFile?.name}: {text}</p>
      </div>
    </>
  );
}
