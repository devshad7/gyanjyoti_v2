"use client";

import QuizComponent from "@/components/layout/gyan-quest/quiz-card-component";
import GamesComponent from "@/components/layout/gyan-quest/game-card-component";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PenLine } from "lucide-react";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl p-3 md:p-4 lg:p-6">
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full max-w-xs mx-auto grid-cols-2 mb-6">
            <TabsTrigger
              value="notes"
              className="data-[state=active]:bg-[#1e40af] data-[state=active]:text-white"
            >
              <PenLine className="h-4 w-4 mr-2" /> Quizzes
            </TabsTrigger>
            <TabsTrigger
              value="pdfs"
              className="data-[state=active]:bg-[#e91e63] data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" /> Mind Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="mt-0">
            <QuizComponent />
          </TabsContent>

          <TabsContent value="pdfs" className="mt-0">
            <GamesComponent />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
}
