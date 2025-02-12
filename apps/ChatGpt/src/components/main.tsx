"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Pacifico } from "next/font/google";
import { cn } from "../../../../packages/lib/utils";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

const API_KEY =
  "Adicione sua key";

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
  No final de sua fala diga ForjaDev Agradece ou algo assim.
  `;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage: Message = {
      content: message,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    const conversationHistory = messages
      .map(
        (msg) =>
          `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}`
      )
      .join("\n");

    const fullPrompt = `${systemPrompt}\n\n${conversationHistory}\nUsuário: ${message}\nAssistente:`;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...messages,
              { role: "user", content: message },
            ],
          }),
        }
      );

      const data = await response.json();
      const assistantMessage: Message = {
        content: data.choices[0].message.content,
        role: "assistant",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erro na geração:", error);
      setMessages((prev) => [
        ...prev,
        { content: "Erro ao processar a resposta.", role: "assistant" },
      ]);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303] py-16">
      <h2
        className={cn(
          "text-6xl font-bold mb-8 tracking-tight text-white",
          pacifico.className
        )}
      >
        ChatGPT
      </h2>
      <div className="w-full max-w-7xl mx-auto px-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="h-96 mb-4 overflow-y-auto border border-white/10 rounded-lg p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                {msg.role === "assistant" && (
                  <div className="font-bold text-green-400">GF</div>
                )}
                <p
                  className={`${msg.role === "user" ? "text-right" : "text-left"} text-white`}
                >
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua dúvida..."
              className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-gray-500 px-4 py-2 rounded-r-lg text-white"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
