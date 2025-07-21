"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react"

type GameState = "ready" | "showing" | "memorizing" | "testing" | "result" | "gameOver"

export default function VisualMemoryPage() {
  const [gameState, setGameState] = useState<GameState>("ready")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gridSize, setGridSize] = useState(3)
  const [sequence, setSequence] = useState<number[]>([])
  const [userSequence, setUserSequence] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [showingIndex, setShowingIndex] = useState(-1)

  const generateSequence = (length: number, gridSize: number) => {
    const newSequence: number[] = []
    const totalCells = gridSize * gridSize

    for (let i = 0; i < length; i++) {
      let randomIndex
      do {
        randomIndex = Math.floor(Math.random() * totalCells)
      } while (newSequence.includes(randomIndex))
      newSequence.push(randomIndex)
    }

    return newSequence
  }

  const startLevel = () => {
    const sequenceLength = Math.min(level + 2, 8)
    const newGridSize = level <= 3 ? 3 : level <= 6 ? 4 : 5

    setGridSize(newGridSize)
    setSequence(generateSequence(sequenceLength, newGridSize))
    setUserSequence([])
    setCurrentStep(0)
    setShowingIndex(-1)
    setGameState("showing")
  }

  const resetGame = () => {
    setGameState("ready")
    setLevel(1)
    setScore(0)
    setLives(3)
    setGridSize(3)
    setSequence([])
    setUserSequence([])
    setCurrentStep(0)
    setShowingIndex(-1)
  }

  // Show sequence animation
  useEffect(() => {
    if (gameState === "showing") {
      let timeoutId: NodeJS.Timeout

      const showNext = (index: number) => {
        if (index < sequence.length) {
          setShowingIndex(sequence[index])
          timeoutId = setTimeout(() => {
            setShowingIndex(-1)
            setTimeout(() => showNext(index + 1), 300)
          }, 600)
        } else {
          setGameState("testing")
        }
      }

      timeoutId = setTimeout(() => showNext(0), 1000)

      return () => clearTimeout(timeoutId)
    }
  }, [gameState, sequence])

  const handleCellClick = (index: number) => {
    if (gameState !== "testing") return

    const newUserSequence = [...userSequence, index]
    setUserSequence(newUserSequence)

    if (index === sequence[currentStep]) {
      if (currentStep === sequence.length - 1) {
        // Level completed
        setScore(score + level * 10)
        setLevel(level + 1)
        setGameState("result")
        setTimeout(() => {
          if (level >= 10) {
            setGameState("gameOver")
          } else {
            startLevel()
          }
        }, 2000)
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      // Wrong answer
      setLives(lives - 1)
      if (lives <= 1) {
        setGameState("gameOver")
      } else {
        setGameState("result")
        setTimeout(() => startLevel(), 2000)
      }
    }
  }

  const getCellClass = (index: number) => {
    const baseClass =
      "aspect-square rounded-lg border-2 transition-all cursor-pointer flex items-center justify-center font-bold"

    if (gameState === "showing" && showingIndex === index) {
      return `${baseClass} bg-red-200 border-red-400`
    }

    if (gameState === "testing") {
      if (userSequence.includes(index)) {
        const isCorrect = sequence[userSequence.indexOf(index)] === index
        return `${baseClass} ${isCorrect ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400"}`
      }
      return `${baseClass} bg-gray-100 border-gray-300 hover:bg-gray-200`
    }

    return `${baseClass} bg-gray-100 border-gray-300`
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4 bg-transparent">
          <Link href="/mind-games">
           <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gyan Quest
          </Link>
        </Button>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-red-600">Visual Memory</h1>
          <p className="text-gray-600 mb-4">Remember the sequence of highlighted squares</p>
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
                <div className="text-2xl font-bold text-purple-600">{level}</div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{lives}</div>
                <div className="text-sm text-gray-600">Lives</div>
              </div>
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {gameState === "ready" ? (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to test your visual memory?</h3>
              <p className="text-gray-600 mb-6">
                Watch the sequence of squares that light up, then click them in the same order. The sequence gets longer
                with each level!
              </p>
              <Button onClick={startLevel} size="lg">
                Start Game
              </Button>
            </div>
          ) : gameState === "gameOver" ? (
            <div className="text-center p-4">
              <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
              <h3 className="text-xl font-bold text-red-600 mb-2">Game Over!</h3>
              <div className="space-y-2 mb-4">
                <p className="text-gray-700">
                  Final Score: <span className="font-bold">{score}</span>
                </p>
                <p className="text-gray-700">
                  Levels Completed: <span className="font-bold">{level - 1}</span>
                </p>
              </div>
              <div className="mb-4">
                <div className="text-lg font-semibold">
                  {level >= 10
                    ? "Memory Master! 🧠"
                    : level >= 7
                      ? "Excellent Memory! 🎯"
                      : level >= 5
                        ? "Good Memory! 👍"
                        : level >= 3
                          ? "Keep Practicing! 📚"
                          : "Try Again! 💪"}
                </div>
              </div>
              <Button onClick={resetGame}>Play Again</Button>
            </div>
          ) : gameState === "result" ? (
            <div className="text-center">
              <div className="text-2xl font-bold mb-4">
                {lives > 0 ? (
                  <span className="text-green-600">Level {level - 1} Complete! 🎉</span>
                ) : (
                  <span className="text-red-600">Wrong sequence! 😞</span>
                )}
              </div>
              <p className="text-gray-600">{lives > 0 ? "Get ready for the next level..." : "Try again..."}</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">
                  {gameState === "showing"
                    ? "Watch the sequence..."
                    : gameState === "testing"
                      ? `Click square ${currentStep + 1} of ${sequence.length}`
                      : "Memorize the pattern"}
                </h3>
                <p className="text-sm text-gray-600">
                  Sequence length: {sequence.length} | Grid: {gridSize}×{gridSize}
                </p>
              </div>

              <div className="grid gap-2 max-w-sm mx-auto" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                {Array.from({ length: gridSize * gridSize }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className={getCellClass(index)}
                    disabled={gameState !== "testing"}
                  >
                    {gameState === "testing" && userSequence.includes(index) && userSequence.indexOf(index) + 1}
                  </button>
                ))}
              </div>

              {gameState === "testing" && (
                <div className="mt-4 text-sm text-gray-600">
                  Progress: {currentStep}/{sequence.length}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600">
        <p>
          {gameState === "showing"
            ? "Pay attention to the red squares!"
            : gameState === "testing"
              ? "Click the squares in the order they appeared."
              : "Focus and remember the pattern!"}
        </p>
      </div>
    </div>
  )
}
