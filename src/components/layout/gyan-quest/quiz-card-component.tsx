import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
const subjects = [
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Test your skills in arithmetic, algebra, geometry, and more.",
    icon: "📐",
    color: "bg-blue-100 text-blue-600 border-blue-200",
  },
  {
    id: "science",
    title: "Science",
    description: "Explore physics, chemistry, biology, and environmental science.",
    icon: "🔬",
    color: "bg-green-100 text-green-600 border-green-200",
  },
  {
    id: "history",
    title: "History",
    description: "Journey through ancient civilizations to modern events.",
    icon: "🏛️",
    color: "bg-yellow-100 text-yellow-600 border-yellow-200",
  },
  {
    id: "geography",
    title: "Geography",
    description: "Discover countries, capitals, landforms, and natural resources.",
    icon: "🌍",
    color: "bg-pink-100 text-pink-600 border-pink-200",
  },
  {
    id: "literature",
    title: "Literature",
    description: "Explore famous authors, books, poems, and literary devices.",
    icon: "📚",
    color: "bg-purple-100 text-purple-600 border-purple-200",
  },
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your awareness of current affairs and general topics.",
    icon: "🧠",
    color: "bg-red-100 text-red-600 border-red-200",
  },
]

export default function QuizzesPage() {
  return (
    <>
    
    <div className="container mx-auto max-w-7xl px-4 py-2">
     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Card key={subject.id} className={`border-2 ${subject.color} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{subject.icon}</span>
                <CardTitle>{subject.title}</CardTitle>
              </div>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white rounded-full text-sm border">Beginner</span>
                <span className="px-2 py-1 bg-white rounded-full text-sm border">Intermediate</span>
                <span className="px-2 py-1 bg-white rounded-full text-sm border">Advanced</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/gyan-quest/${subject.id}`}>Start Quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-blue-50 rounded-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">How Our Quizzes Work</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our quizzes are designed to be engaging, educational, and adaptive to your learning needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4 text-center text-blue-600">1</div>
            <h3 className="text-xl font-semibold mb-2 text-center">Choose a Subject</h3>
            <p className="text-gray-700 text-center">
              Select from a variety of subjects based on your interests or learning goals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4 text-center text-pink-600">2</div>
            <h3 className="text-xl font-semibold mb-2 text-center">Answer Questions</h3>
            <p className="text-gray-700 text-center">
              Respond to multiple-choice, true/false, and other question formats.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-3xl mb-4 text-center text-yellow-600">3</div>
            <h3 className="text-xl font-semibold mb-2 text-center">Review Performance</h3>
            <p className="text-gray-700 text-center">
              Get instant feedback and a detailed scorecard to track your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
