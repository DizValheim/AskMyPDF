import { useState } from "react";

export default function Chat() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState([]);

  async function ask() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, top_k: 5 }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch (err) {
      alert("Error searching PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center text-[#1b1d1e] shadow-2xl">
        <input
          className="p-5 mr-2 w-100 bg-[#948979] rounded-full font-bold outline-none"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? "Loading..." : "Ask..."}
        />
        <button
          className="p-5 h-15 w-15 bg-[#dfd0b8] rounded-full cursor-pointer flex items-center justify-center"
          onClick={ask}
        >
          ➤
        </button>
      </div>
      <div className={`absolute left-10 top-20 p-2 bg-[#948979] min-h-10 min-w-20 max-w-100 rounded-2xl text-center ${loading && "animate-pulse"}`}>
        {(loading) ? "..." : <pre className="text-wrap text-left">{answer}</pre>}
      </div>
    </div>
  );
}
