import { useEffect, useState } from "react";
import Search from "./components/Search";

function App() {
  const [file, setFile] = useState(null)
  const [text, setText] = useState("")

  async function uploadPDF() {
    if(!file) return alert("Please Choose a file!");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-and-embed`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setText(data.message);
  }

  

  return (
    <div className="min-h-dvh bg-blue-200 flex flex-col justify-center">
      <div className="mx-auto text-white flex flex-col">
        <input className="p-5 my-5 bg-blue-300 rounded-xl outline-2 outline-dashed outline-blue-400 cursor-pointer" type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button className="p-5 bg-blue-400 outline-1 outline-blue-400 rounded-xl text-2xl font-bold cursor-pointer" onClick={uploadPDF}>Upload</button>
      </div>
      <div className="mx-auto">
        <div className="my-5 bg-blue-50 text-gray-700 rounded-xl"><pre className="p-5 text-wrap">{text || "No text to display..."}</pre></div>
      </div>
      <div className="mx-auto">
        <Search />
      </div>
    </div>
  );
}

export default App;
