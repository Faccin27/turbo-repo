"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { Pacifico } from "next/font/google"
import { cn } from "../../../../packages/lib/utils"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

type Message = {
  content: string
  role: "user" | "assistant"
}

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <div
      className={cn("absolute", className)}
      style={{
        width,
        height,
        transform: `rotate(${rotate}deg)`,
        transition: `all 2.4s ease ${delay}s`,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r to-transparent",
          gradient,
          "backdrop-blur-[2px] border-2 border-white/[0.15]",
          "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
          "after:absolute after:inset-0 after:rounded-full",
          "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
        )}
      />
    </div>
  )
}

export default function AIChatbot() {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Olá! Como posso ajudar hoje?",
      role: "assistant",
    },
  ])

  const systemPrompt = `
  Quando for falar qualquer coisa comece sua fala com "TurboRepo lhe fala" ou algo assim tendo TurboRepo como inicialização.

  No final de sua fala diga ForjaDev Agradeçe ou algo assim.
`

  const genAI = new GoogleGenerativeAI("AIzaSyCe_rZZgF8EluXhoB55D6KhfEULC4VaVBM")
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (!message.trim()) {
        return
      }

      const userMessage: Message = {
        content: message,
        role: "user",
      }

      setMessages((prev) => [...prev, userMessage])

      const conversationHistory = messages
        .map((msg) => `${msg.role === "user" ? "Usuário" : "Assistente"}: ${msg.content}`)
        .join("\n")

      const fullPrompt = `${systemPrompt}\n\n${conversationHistory}\nUsuário: ${message}\nAssistente:`

      const res = await model.generateContent(fullPrompt)

      const assistantMessage: Message = {
        content: res.response.text(),
        role: "assistant",
      }

      setMessages((prev) => [...prev, assistantMessage])
      setMessage("")
    } catch (error) {
      const errorMessage: Message = {
        content: "Desculpe, ocorreu um erro. Por favor, tente novamente ou entre em contato conosco diretamente.",
        role: "assistant",
      }
      setMessages((prev) => [...prev, errorMessage])
      console.error("Erro na geração:", error)
    }
    setMessage("")
  }

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#030303] py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>

      <h2
        className={cn(
          "text-6xl font-bold mb-8 tracking-tight",
          "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
          pacifico.className,
        )}
      >
        Gemini
      </h2>

      <div className="w-full max-w-7xl mx-auto px-4 z-10">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div
            className="h-96 mb-4 overflow-y-auto bg-gradient-to-br from-indigo-500/10 to-rose-500/10
                    border border-white/10 rounded-lg shadow-lg p-4"
          >
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-white items-center flex justify-center mb-2">
                    <span className="text-black font-bold text-xl">GF</span>
                  </div>
                )}
                <div className={`${msg.role === "user" ? "ml-auto text-right" : ""} max-w-[80%]`}>
                  <p
                    className={`${
                      msg.role === "user" ? "bg-blue-500/30" : "bg-gray-700"
                    } inline-block rounded-lg px-4 py-2 text-white`}
                  >
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
              className="bg-gray-500/90 text-white px-4 py-2 rounded-r-lg hover:bg-gradient-to-br from-rose-800/10 via-rose-400 to-rose-800/10
 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

