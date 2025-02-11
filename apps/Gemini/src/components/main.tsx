"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Message = {
  content: string;
  role: "user" | "assistant";
};

export default function AIChatbot() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Olá! Como posso ajudar hoje?",
      role: "assistant",
    },
  ]);
  
  const systemPrompt = `
  Quando for falar qualquer coisa comece sua fala com "TurboRepo lhe fala" ou algo assim tendo TurboRepo como inicialização.

  No final de sua fala diga ForjaDev Agradeçe ou algo assim.
`;

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCe_rZZgF8EluXhoB55D6KhfEULC4VaVBM"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Adiciona uma verificação inicial se a mensagem está vazia
      if (!message.trim()) {
        return;
      }

      // Add user message to chat
      const userMessage: Message = {
        content: message,
        role: "user",
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Create conversation history for context
      const conversationHistory = messages
        .map(msg => `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}`)
        .join("\n");

      const fullPrompt = `${systemPrompt}\n\n${conversationHistory}\nUsuário: ${message}\nAssistente:`;
      
      const res = await model.generateContent(fullPrompt);
      
      // Add assistant response to chat
      const assistantMessage: Message = {
        content: res.response.text(),
        role: "assistant",
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setMessage("");
    } catch (error) {
      const errorMessage: Message = {
        content: "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato conosco diretamente.",
        role: "assistant",
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error("Erro na geração:", error);
    }
    setMessage("");
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-gray-900 rounded-lg shadow-lg p-6">
          <div className="h-96 mb-4 overflow-y-auto bg-gray-800 rounded-lg p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-white items-center flex justify-center mb-2">
                    <span className="text-black font-bold text-xl">GF</span>
                  </div>
                )}
                <div className={`${msg.role === "user" ? "ml-auto text-right" : ""} max-w-[80%]`}>
                  <p className={`${
                    msg.role === "user" ? "bg-blue-500/30" : "bg-gray-700"
                  } inline-block rounded-lg px-4 py-2 text-white`}>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua dúvida sobre nossos serviços aqui..."
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500/30 text-white px-4 py-2 rounded-r-lg hover:bg-violet-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}