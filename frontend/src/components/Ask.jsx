import { useState } from "react";

export default function Ask() {
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
    <div>
      <div className="flex justify-center">
        <input
          className="p-5 mr-1 bg-blue-50 rounded-xl outline outline-blue-300"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loading ? "Loading..." : "Ask..."}
        />
        <button
          className="p-5 bg-blue-50 rounded-xl cursor-pointer"
          onClick={ask}
        >
          ➤
        </button>
      </div>

      {loading ? (
        <div className="my-10 bg-blue-50 w-300 h-30 rounded-xl animate-pulse"></div>
      ) : (
        <div className="my-10 p-5 bg-blue-50 w-300 h-30 rounded-xl">
            <pre className="text-wrap">{answer}</pre>
        </div>
      )}
    </div>
  );
}
