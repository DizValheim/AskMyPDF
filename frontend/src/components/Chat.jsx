import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import { Bot } from "lucide-react";

export default function Chat() {
  const initialMessages = [
    {
      id: 1,
      text: "Hello! I'm a PDF Analyzer bot. Ask a question below and I'll answer it from the PDF!",
      isUser: false,
    },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  async function ask() {
    if (!input.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: input.trim(),
      isUser: true,
    };

    // Add User message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const userText = input.trim();
    setInput("");

    setIsTyping(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userText, top_k: 10 }),
      });
      const data = await res.json();
      console.log(data);

      const newMessage = {
        id: Date.now(),
        text: data.answer,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (err) {
      alert("Error searching PDF");
    } finally {
      setIsTyping(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative h-[710px] w-full px-5 pt-2 flex flex-col">
      <div className="flex-1 pb-40 overflow-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        {isTyping && (
          <div className="flex justify-start my-2 mx-2">
            <div className="flex-shrink-0 mr-3 mt-1 p-2 rounded-full bg-[#948979a0] text-[#948979]">
              <Bot size={18} />
            </div>
            <div className="p-4 rounded-xl bg-[#928979] text-shadow-gray-800 shadow-md">
              <div className="flex space-x-1">
                <span
                  className="animate-bounce w-2 h-2 bg-gray-800 rounded-full"
                  style={{ animationDelay: "0s" }}
                ></span>
                <span
                  className="animate-bounce w-2 h-2 bg-gray-800 rounded-full"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="animate-bounce w-2 h-2 bg-gray-800 rounded-full"
                  style={{ animationDelay: "0.4s" }}
                ></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="z-5 absolute bottom-0 w-full h-20 left-1/2 rounded-b-[2.3vw] transform -translate-x-1/2 bg-linear-180 from-0% from-[#94897901] via-80% via-[#94897940] to-[#94897960]"></div>
      <div className="z-10 absolute bottom-3 w-full left-1/2 transform -translate-x-1/2 flex items-center text-amber-100">
        <input
          className="p-5 mr-2 ml-auto w-100 bg-[#94897901] rounded-full font-bold border-3 border-t-[#EEEEEE40] border-s-[#EEEEEE40] border-b-[#99999940] border-e-[#99999940] outline-none backdrop-blur-xs"
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyDown}
          placeholder={isTyping ? "Loading..." : "Ask..."}
        />
        <button
          className="p-5 mr-auto h-15 w-15 bg-[#dfd0b801] border-3 border-t-[#EEEEEE40] border-s-[#EEEEEE40] border-b-[#99999940] border-e-[#99999940] backdrop-blur-2xl rounded-full cursor-pointer flex items-center justify-center"
          onClick={ask}
        >
          <span className="-rotate-45">➤</span>
        </button>
      </div>
    </div>
  );
}
