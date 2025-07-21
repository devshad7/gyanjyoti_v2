"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react"

type Problem = {
  question: string
  answer: number
}

export default function SpeedMathPage() {
  const [currentProblem, setCurrentProblem] = useState<Problem>({ question: "", answer: 0 })
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)

  const generateProblem = (): Problem => {
    const operations = ["+", "-", "×", "÷"]
    const operation = operations[Math.floor(Math.random() * operations.length)]

    let num1: number, num2: number, answer: number, question: string

    switch (operation) {
      case "+":
        num1 = Math.floor(Math.random() * 50) + 1
        num2 = Math.floor(Math.random() * 50) + 1
        answer = num1 + num2
        question = `${num1} + ${num2}`
        break
      case "-":
        num1 = Math.floor(Math.random() * 50) + 25
        num2 = Math.floor(Math.random() * 25) + 1
        answer = num1 - num2
        question = `${num1} - ${num2}`
        break
      case "×":
        num1 = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        answer = num1 * num2
        question = `${num1} × ${num2}`
        break
      case "÷":
        answer = Math.floor(Math.random() * 12) + 1
        num2 = Math.floor(Math.random() * 12) + 1
        num1 = answer * num2
        question = `${num1} ÷ ${num2}`
        break
      default:
        num1 = 1
        num2 = 1
        answer = 2
        question = "1 + 1"
    }

    return { question, answer }
  }

  const startGame = () => {
    setGameActive(true)
    setGameOver(false)
    setScore(0)
    setStreak(0)
    setTimeLeft(60)
    setUserAnswer("")
    setCurrentProblem(generateProblem())
  }

  const resetGame = () => {
    setGameActive(false)
    setGameOver(false)
    setScore(0)
    setStreak(0)
    setTimeLeft(60)
    setUserAnswer("")
    setCurrentProblem({ question: "", answer: 0 })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameActive || userAnswer === "") return

    const answer = Number.parseInt(userAnswer)
    if (answer === currentProblem.answer) {
      setScore(score + 1)
      setStreak(streak + 1)
      if (streak + 1 > bestStreak) {
        setBestStreak(streak + 1)
      }
    } else {
      setStreak(0)
    }

    setUserAnswer("")
    setCurrentProblem(generateProblem())
  }

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && gameActive) {
      setGameActive(false)
      setGameOver(true)
    }
    return () => clearInterval(interval)
  }, [gameActive, timeLeft])

  // Initialize first problem
  useEffect(() => {
    setCurrentProblem(generateProblem())
  }, [])

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
          <h1 className="text-3xl font-bold mb-2 text-purple-600">Speed Math</h1>
          <p className="text-gray-600 mb-4">Solve as many math problems as you can in 60 seconds</p>
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
                <div className="text-2xl font-bold text-green-600">{streak}</div>
                <div className="text-sm text-gray-600">Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{bestStreak}</div>
                <div className="text-sm text-gray-600">Best</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-600" : "text-purple-600"}`}>
                  {timeLeft}
                </div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {!gameActive && !gameOver ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to test your math skills?</h3>
              <p className="text-gray-600 mb-6">
                You&apos;ll have 60 seconds to solve as many problems as possible. Try to build up a streak for bonus points!
              </p>
              <Button onClick={startGame} size="lg">
                Start Game
              </Button>
            </div>
          ) : gameOver ? (
            <div className="text-center p-4">
              <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
              <h3 className="text-xl font-bold text-purple-600 mb-2">Time&apos;s Up!</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  Problems Solved: <span className="font-bold">{score}</span>
                </p>
                <p className="text-gray-700">
                  Best Streak: <span className="font-bold">{bestStreak}</span>
                </p>
                <p className="text-gray-700">
                  Average: <span className="font-bold">{score > 0 ? ((score / 60) * 60).toFixed(1) : 0}</span> problems
                  per minute
                </p>
              </div>
              <div className="mb-4">
                <div className="text-lg font-semibold">
                  {score >= 50
                    ? "Math Genius! 🧠"
                    : score >= 30
                      ? "Excellent! 🎯"
                      : score >= 20
                        ? "Good Job! 👍"
                        : score >= 10
                          ? "Keep Practicing! 📚"
                          : "Try Again! 💪"}
                </div>
              </div>
              <Button onClick={startGame}>Play Again</Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-4xl font-bold mb-4 text-purple-600">{currentProblem.question} = ?</div>
                <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="text-center text-xl mb-4"
                    autoFocus
                  />
                  <Button type="submit" className="w-full" disabled={userAnswer === ""}>
                    Submit
                  </Button>
                </form>
              </div>

              {streak > 0 && <div className="text-green-600 font-semibold">🔥 Streak: {streak}</div>}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600">
        <p>Press Enter to submit your answer quickly!</p>
      </div>
    </div>
  )
}
