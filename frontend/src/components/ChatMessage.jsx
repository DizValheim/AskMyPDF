import { Bot, User } from "lucide-react";

export default function ChatMessage({ message, classes, isUser }) {
  const alignment = isUser ? "justify-end" : "justify-start";
  const bubbleColor = isUser ? "bg-[#655d51]" : "bg-[#928979]";

  return (
    <div className={`flex ${alignment} my-2 mx-2`}>
      <div className={`flex items-start max-w-[80%] md:max-w-[60%]`}>
        {!isUser && (
          <div className="flex-shrink-0 mr-3 mt-1 p-2 rounded-full bg-[#948979a0] text-[#948979]">
            <Bot size={18} />
          </div>
        )}
        <div
          className={`p-4 rounded-xl shadow-md transition duration-150 text-shadow-gray-800 ease-in-out ${bubbleColor}`}
        >
          <p className="text-sm break-words whitespace-pre-wrap">{message}</p>
        </div>
        {isUser && (
          <div className="flex-shrink-0 ml-3 mt-1 p-2 rounded-full bg-[#948979a0] text-[#948979]">
            <User size={18} />
          </div>
        )}
      </div>
    </div>
  );
}
