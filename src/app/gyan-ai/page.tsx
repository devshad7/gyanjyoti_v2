import { ChatInterface } from "@/components/layout/GyanAI/chat-interface"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GyanAI | Gyan Jyoti",
  description:
    "Gyanjoti is a multiple award-winning academic platform developed in Nepal and used globally by students, parents and educators.",
};

export default function Home() {
  return (
    
    <main className="mx-auto max-w-8xl  md:p-4 lg:p-6">
      <ChatInterface />
    </main>
   
  )
}
