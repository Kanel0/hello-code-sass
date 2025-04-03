import { useState } from "react";
import { useLocation } from "react-router-dom";
import Dashboard from "./dashboard";
import Input from "@/components/input/Input";
import { ButtonPrimary } from "@/components/common/Button";

function Contact() {
  const location = useLocation();
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Ajouter le message à la liste locale
    setMessages([...messages, { text: inputMessage, sender: "Me" }]);

    // Réinitialiser le champ d'entrée
    setInputMessage("");
  };

  return (
    <Dashboard currentPath={location.pathname}>
      <div className="p-6 bg-white rounded-lg shadow-lg flex flex-col h-[650px]">
        <h2 className="text-2xl font-semibold text-gray-700 font-[Klapt] mb-4">
          Messenger
        </h2>

        {/* Zone de messages */}
        <div className="flex-1 overflow-y-auto border rounded p-4 bg-gray-100">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-lg ${
                msg.sender === "Me" ? "bg-gray-800 text-white self-end" : "bg-gray-300"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input et bouton envoyer */}
        <div className="mt-4 flex">
          <Input
            type="text"
            className="flex-1 w-[900px] rounded-l-lg"
            placeholder="Écrivez un message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <ButtonPrimary
            className=" text-white  w-[200px] px-4 py-2 rounded-r-lg"
            onClick={handleSendMessage}
          >
            Send
          </ButtonPrimary>
        </div>
      </div>
    </Dashboard>
  );
}

export default Contact;
