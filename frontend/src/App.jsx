import { useEffect, useState } from "react";
import Search from "./components/Search";
import Ask from "./components/Ask";
import logo from "./assets/AskMyPDF_logo.png"
import DropZone from "./components/DropZone";
import Chat from "./components/Chat";

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
    <div className="min-h-dvh bg-[#1b1d1e] flex flex-col justify-center">
      <nav className="fixed top-0 p-3 px-20 w-full flex justify-between">
          <div><img className="" src={logo} alt="logo"  width={200}/></div>
          <div className="my-4"><a className="text-2xl font-bold text-[#dfd0b8] align-middle" href="https://github.com/DizValheim/AskMyPDF" target="blank">About⌝</a></div>
      </nav>

      <div className="min-h-[calc(100dvh-88px)] mt-22 grid grid-cols-2">
        <div className="flex flex-col justify-center">
            <div className="h-1/2 w-3/4 mx-auto text-center">
              <h1 className="my-2 text-3xl font-bold text-[#dfd0b8]">Upload any PDF document to begin </h1>
              <p className="my-2 text-xl font-bold text-[#948979]"> our intelligent assistant will process its contents and let you interact with it through natural language questions.</p>
              <DropZone />
            </div>
        </div>
        <div className="absolute left-1/2 top-50 w-0.5 h-150 rounded-full bg-[#dfd0b850]"></div>
        <div className="flex flex-col justify-center">
          <div className="h-6/7 w-2/3 mx-auto bg-[#94897910] rounded-2xl shadow-in">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
