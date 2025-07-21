"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react"

type Pattern = {
  sequence: string[]
  options: string[]
  correct: string
}

const shapes = ["🔴", "🔵", "🟡", "🟢", "🟣", "🟠", "⚫", "⚪"]
const patterns: Pattern[] = [
  {
    sequence: ["🔴", "🔵", "🔴", "🔵"],
    options: ["🔴", "🟡", "🔵", "🟢"],
    correct: "🔴",
  },
  {
    sequence: ["🔴", "🔵", "🟡", "🔴", "🔵"],
    options: ["🟡", "🔴", "🔵", "🟢"],
    correct: "🟡",
  },
  {
    sequence: ["🔴", "🔴", "🔵", "🔴", "🔴", "🔵"],
    options: ["🔴", "🔵", "🟡", "🟢"],
    correct: "🔴",
  },
  {
    sequence: ["🔵", "🟡", "🟢", "🔵", "🟡"],
    options: ["🟢", "🔵", "🟡", "🔴"],
    correct: "🟢",
  },
  {
    sequence: ["🔴", "🔵", "🔵", "🟡", "🟡", "🟡"],
    options: ["🔴", "🟢", "🟡", "🔵"],
    correct: "🟢",
  },
]

export default function PatternRecognitionPage() {
  const [currentPattern, setCurrentPattern] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const resetGame = () => {
    setCurrentPattern(0)
    setScore(0)
    setLives(3)
    setGameOver(false)
    setShowResult(false)
    setSelectedAnswer(null)
    setIsCorrect(null)
  }

  const handleAnswer = (answer: string) => {
    if (showResult) return

    setSelectedAnswer(answer)
    const correct = answer === patterns[currentPattern].correct
    setIsCorrect(correct)
    setShowResult(true)

    if (correct) {
      setScore(score + 1)
    } else {
      setLives(lives - 1)
    }

    setTimeout(() => {
      if (correct && currentPattern < patterns.length - 1) {
        setCurrentPattern(currentPattern + 1)
        setShowResult(false)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else if (!correct && lives > 1) {
        setShowResult(false)
        setSelectedAnswer(null)
        setIsCorrect(null)
      } else {
        setGameOver(true)
      }
    }, 1500)
  }

  const pattern = patterns[currentPattern]

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
           <Link href="/gyan-quest">
           <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gyan Quest
          </Link>
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-green-600">Pattern Recognition</h1>
          <p className="text-gray-600 mb-4">Identify the next shape in the sequence</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{score}</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{lives}</div>
                <div className="text-sm text-gray-600">Lives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {currentPattern + 1}/{patterns.length}
                </div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!gameOver ? (
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">What comes next in this pattern?</h3>
                <div className="flex justify-center items-center gap-2 mb-4">
                  {pattern.sequence.map((shape, index) => (
                    <span key={index} className="text-4xl">
                      {shape}
                    </span>
                  ))}
                  <span className="text-4xl text-gray-400">?</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                {pattern.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`
                      aspect-square flex items-center justify-center text-4xl rounded-lg border-2 transition-all
                      ${
                        showResult && selectedAnswer === option
                          ? isCorrect
                            ? "bg-green-100 border-green-300"
                            : "bg-red-100 border-red-300"
                          : showResult && option === pattern.correct
                            ? "bg-green-100 border-green-300"
                            : "bg-white border-gray-300 hover:bg-gray-50"
                      }
                      ${showResult ? "cursor-default" : "cursor-pointer"}
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className="mt-4">
                  {isCorrect ? (
                    <p className="text-green-600 font-semibold">Correct! Well done!</p>
                  ) : (
                    <p className="text-red-600 font-semibold">Incorrect. The answer was {pattern.correct}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-4">
              <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
              <h3 className="text-xl font-bold text-green-600 mb-2">Game Over!</h3>
              <p className="text-gray-700 mb-4">
                You scored {score} out of {patterns.length} patterns correctly!
              </p>
              <div className="mb-4">
                <div className="text-lg font-semibold">
                  {score === patterns.length
                    ? "Perfect Score! 🎉"
                    : score >= patterns.length * 0.8
                      ? "Excellent! 👏"
                      : score >= patterns.length * 0.6
                        ? "Good Job! 👍"
                        : "Keep Practicing! 💪"}
                </div>
              </div>
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600">
        <p>Look for repeating sequences, alternating patterns, or progressive changes.</p>
      </div>
    </div>
  )
}
