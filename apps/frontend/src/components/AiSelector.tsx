"use client"
import Link from "next/link"
import { motion } from "framer-motion"

interface AIOption {
  id: string
  title: string
  icon: string
  href: string
}

const aiOptions: AIOption[] = [
  { id: "docs", title: "Documentação", icon: "📚", href: "http://localhost:3007" },
  { id: "chatgpt", title: "ChatGPT", icon: "🤖", href: "http://localhost:4000" },
  { id: "gemini", title: "Gemini", icon: "🔮", href: "http://localhost:5000" },
  { id: "soon", title: "Soon...", icon: "🚀", href: "" },
]

export default function AISelectionCards() {
  return (
    <div className="w-full bg-[#030303] py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiOptions.map((option) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={option.href} passHref>
                <div
                  className={`
                    cursor-pointer transition-all duration-300 hover:scale-105
                    bg-gradient-to-br from-indigo-500/10 to-rose-500/10
                    border border-white/10 rounded-lg shadow-lg
                    ${option.id === "soon" ? "cursor-wait opacity-50" : ""}
                  `}
                >
                  <div className="flex flex-col items-center justify-center p-6 h-40">
                    <div className="text-4xl mb-4">{option.icon}</div>
                    <h3 className="text-xl font-semibold text-white">{option.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

