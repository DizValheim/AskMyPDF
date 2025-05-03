import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/hello`)
    .then(res => res.json())
    .then(data => setMsg(data.message));
  }, [])

  return (<div style={{padding:"2rem"}}>
    <h1>{msg || "Loading..."}</h1>
  </div>);
}

export default App;