"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react"

type Tile = number | null

export default function NumberPuzzlePage() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [moves, setMoves] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Initialize puzzle
  useEffect(() => {
    resetPuzzle()
  }, [])

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (startTime && !isComplete) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [startTime, isComplete])

  const resetPuzzle = () => {
    const initialTiles: Tile[] = [1, 2, 3, 4, 5, 6, 7, 8, null]

    // Shuffle the tiles
    const shuffled = [...initialTiles]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setTiles(shuffled)
    setMoves(0)
    setIsComplete(false)
    setStartTime(Date.now())
    setElapsedTime(0)
  }

  const canMove = (index: number): boolean => {
    const emptyIndex = tiles.indexOf(null)
    const row = Math.floor(index / 3)
    const col = index % 3
    const emptyRow = Math.floor(emptyIndex / 3)
    const emptyCol = emptyIndex % 3

    return (Math.abs(row - emptyRow) === 1 && col === emptyCol) || (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  }

  const moveTile = (index: number) => {
    if (!canMove(index) || isComplete) return

    const newTiles = [...tiles]
    const emptyIndex = tiles.indexOf(null)

    newTiles[emptyIndex] = newTiles[index]
    newTiles[index] = null

    setTiles(newTiles)
    setMoves(moves + 1)

    // Check if puzzle is complete
    const isWin = newTiles.slice(0, 8).every((tile, i) => tile === i + 1) && newTiles[8] === null
    if (isWin) {
      setIsComplete(true)
    }
  }

  const formatTime = (ms: number): string => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

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
          <h1 className="text-3xl font-bold mb-2 text-yellow-600">Number Puzzle</h1>
          <p className="text-gray-600 mb-4">Arrange the numbers 1-8 in order by sliding tiles</p>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{moves}</div>
                <div className="text-sm text-gray-600">Moves</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatTime(elapsedTime)}</div>
                <div className="text-sm text-gray-600">Time</div>
              </div>
            </div>
            <Button onClick={resetPuzzle} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
            {tiles.map((tile, index) => (
              <button
                key={index}
                onClick={() => moveTile(index)}
                className={`
                  aspect-square flex items-center justify-center text-2xl font-bold rounded-lg border-2 transition-all
                  ${
                    tile === null
                      ? "bg-gray-100 border-gray-200"
                      : canMove(index) && !isComplete
                        ? "bg-yellow-100 border-yellow-300 hover:bg-yellow-200 cursor-pointer"
                        : "bg-white border-gray-300 cursor-default"
                  }
                  ${isComplete ? "bg-green-100 border-green-300" : ""}
                `}
                disabled={!canMove(index) || isComplete}
              >
                {tile}
              </button>
            ))}
          </div>

          {isComplete && (
            <div className="text-center mt-6 p-4 bg-green-50 rounded-lg">
              <Trophy className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
              <h3 className="text-xl font-bold text-green-600 mb-2">Congratulations!</h3>
              <p className="text-gray-700">
                You completed the puzzle in {moves} moves and {formatTime(elapsedTime)}!
              </p>
              <Button onClick={resetPuzzle} className="mt-4">
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600">
        <p>Click on tiles adjacent to the empty space to move them.</p>
      </div>
    </div>
  )
}
