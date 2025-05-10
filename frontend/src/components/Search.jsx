import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  async function search() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, top_k: 5 }),
      });
      const data = await res.json();
      setResults(data.results);
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
          placeholder={loading ? "Searching..." : "Search"}
        />
        <button
          className="p-5 bg-blue-50 rounded-xl cursor-pointer"
          onClick={search}
        >
          🔍
        </button>
      </div>
      <ul className="mt-4 space-y-2 max-w-300">
        {loading ? <div className="bg-blue-50 w-300 h-30 rounded-xl animate-pulse">
        </div> : results.map((r, i) => (
          <li key={i} className="bg-blue-50 p-3 rounded-xl">
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
