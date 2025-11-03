import { ChatInterface } from "@/components/layout/GyanAI/chat-interface"

import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Gyan AI | Gyan Jyoti",
  description: "GyanJyoti is a leading Nepali e-learning platform offering high-quality video courses, interactive quizzes, downloadable PDFs, and the intelligent Gyan AI Assistant to help secondary-level students improve academic performance and achieve excellence.",
};

export default function Home() {
  return (
    
    <main className="mx-auto max-w-8xl px-2 sm:px-4 lg:px-6">
      <ChatInterface />
    </main>
   
  )
}
