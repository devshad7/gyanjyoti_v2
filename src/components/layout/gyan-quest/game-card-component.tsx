import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const games = [
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Test and improve your memory by matching pairs of cards.",
    icon: "🧠",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    skills: ["Memory", "Concentration", "Pattern Recognition"],
  },
  {
    id: "word-scramble",
    title: "Word Scramble",
    description: "Unscramble letters to form meaningful words.",
    icon: "📝",
    color: "bg-pink-100 text-pink-600 border-pink-200",
    skills: ["Vocabulary", "Spelling", "Problem Solving"],
  },
  {
    id: "number-puzzle",
    title: "Number Puzzle",
    description: "Arrange numbers in the correct sequence by sliding tiles.",
    icon: "🔢",
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
    skills: ["Logical Thinking", "Strategy", "Spatial Awareness"],
  },
  {
    id: "pattern-recognition",
    title: "Pattern Recognition",
    description: "Identify and continue visual patterns to train your brain.",
    icon: "🔍",
    color: "bg-green-100 text-green-600 border-green-200",
    skills: ["Pattern Recognition", "Logical Reasoning", "Attention to Detail"],
  },
  {
    id: "speed-math",
    title: "Speed Math",
    description: "Solve math problems quickly to improve mental calculation.",
    icon: "⏱️",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    skills: ["Mental Math", "Quick Thinking", "Concentration"],
  },
  {
    id: "visual-memory",
    title: "Visual Memory",
    description: "Remember and recall visual information in sequence.",
    icon: "👁️",
    color: "bg-red-100 text-red-600 border-red-200",
    skills: ["Visual Memory", "Attention", "Recall"],
  },
]

export default function MindGamesPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-2">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Card key={game.id} className={`border-2 ${game.color} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{game.icon}</span>
                <CardTitle>{game.title}</CardTitle>
              </div>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Skills Developed:</h4>
                <div className="flex flex-wrap gap-2">
                  {game.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded-full text-sm border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/gyan-quest/${game.id}`}>Play Game</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-pink-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-pink-600">Benefits of Mind Games</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Regular mental exercise through mind games can provide numerous cognitive benefits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-pink-600">Improved Memory</h3>
            <p className="text-gray-700">
              Memory games help strengthen both short-term and long-term memory, making it easier to recall information.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Enhanced Concentration</h3>
            <p className="text-gray-700">
              Mind games require focus and attention, helping to improve your ability to concentrate for longer periods.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-yellow-600">Better Problem-Solving</h3>
            <p className="text-gray-700">
              Regularly engaging with puzzles and games enhances your ability to think critically and solve complex
              problems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
