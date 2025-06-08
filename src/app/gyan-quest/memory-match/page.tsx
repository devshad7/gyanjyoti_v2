"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Timer, RefreshCw, Trophy } from "lucide-react"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// Card emojis for the memory game
const emojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮"]

// Create a shuffled deck of cards with pairs
const createDeck = () => {
  const deck = [...emojis, ...emojis]
    .sort(() => Math.random() - 0.5)
    .map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }))
  return deck
}

export default function MemoryMatchGame() {
  const [cards, setCards] = useState(createDeck())
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [bestTime, setBestTime] = useState<number | null>(null)
  const [bestMoves, setBestMoves] = useState<number | null>(null)

  // Load best scores from localStorage
  useEffect(() => {
    const storedBestTime = localStorage.getItem("memoryMatchBestTime")
    const storedBestMoves = localStorage.getItem("memoryMatchBestMoves")

    if (storedBestTime) setBestTime(Number.parseInt(storedBestTime))
    if (storedBestMoves) setBestMoves(Number.parseInt(storedBestMoves))
  }, [])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])

  // Check for game completion
  useEffect(() => {
    if (matchedPairs === emojis.length && gameStarted) {
      setGameCompleted(true)

      // Update best scores
      if (bestTime === null || timer < bestTime) {
        setBestTime(timer)
        localStorage.setItem("memoryMatchBestTime", timer.toString())
      }

      if (bestMoves === null || moves < bestMoves) {
        setBestMoves(moves)
        localStorage.setItem("memoryMatchBestMoves", moves.toString())
      }
    }
  }, [matchedPairs, gameStarted, timer, moves, bestTime, bestMoves])

  // Handle card click
  const handleCardClick = (id: number) => {
    // Start the game on first card click
    if (!gameStarted) {
      setGameStarted(true)
    }

    // Ignore click if game is completed or card is already flipped/matched
    if (gameCompleted || flippedCards.length >= 2) return

    const clickedCard = cards.find((card) => card.id === id)
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return

    // Flip the card
    const updatedCards = cards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
    setCards(updatedCards)

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id]
    setFlippedCards(newFlippedCards)

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1)

      const [firstId, secondId] = newFlippedCards
      const firstCard = updatedCards.find((card) => card.id === firstId)
      const secondCard = updatedCards.find((card) => card.id === secondId)

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isMatched: true } : card,
            ),
          )
          setMatchedPairs((prevMatched) => prevMatched + 1)
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card,
            ),
          )
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  // Reset the game
  const resetGame = () => {
    setCards(createDeck())
    setFlippedCards([])
    setMatchedPairs(0)
    setMoves(0)
    setTimer(0)
    setGameStarted(false)
    setGameCompleted(false)
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">Memory Match</h1>
          <p className="text-gray-700 mb-6">
            Flip cards to find matching pairs. Try to complete the game in as few moves as possible!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Timer className="h-5 w-5 text-blue-600" />
              <span className="font-medium">{formatTime(timer)}</span>
            </div>

            <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-lg">
              <span className="font-medium">Moves: {moves}</span>
            </div>

            <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
              <span className="font-medium">
                Pairs: {matchedPairs}/{emojis.length}
              </span>
            </div>
          </div>

          {(bestTime !== null || bestMoves !== null) && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {bestTime !== null && (
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Best Time: {formatTime(bestTime)}</span>
                </div>
              )}

              {bestMoves !== null && (
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Best Moves: {bestMoves}</span>
                </div>
              )}
            </div>
          )}

          <Button onClick={resetGame} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset Game
          </Button>
        </div>

        {gameCompleted && (
          <div className="mb-8 p-6 bg-green-50 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-2 text-green-600">Congratulations!</h2>
            <p className="text-lg mb-4">
              You completed the game in {formatTime(timer)} with {moves} moves.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={resetGame} variant="outline">
                Play Again
              </Button>
              <Button asChild>
                <Link href="/mind-games">Try Another Game</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`aspect-square cursor-pointer transition-all duration-300 transform ${
                card.isFlipped || card.isMatched ? "rotate-y-180" : ""
              }`}
              onClick={() => handleCardClick(card.id)}
            >
              <Card
                className={`w-full h-full flex items-center justify-center text-4xl p-2 ${
                  card.isMatched
                    ? "bg-green-100 border-green-300"
                    : card.isFlipped
                      ? "bg-blue-100 border-blue-300"
                      : "bg-white hover:bg-gray-50"
                }`}
              >
                {card.isFlipped || card.isMatched ? card.emoji : "❓"}
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">How to Play</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Click on any card to flip it and reveal the emoji.</li>
            <li>Try to find the matching pair by flipping another card.</li>
            <li>If the two cards match, they will remain face up.</li>
            <li>If they don&apos;t match, they will flip back face down.</li>
            <li>The game is complete when all pairs are matched.</li>
            <li>Try to complete the game in as few moves and as quickly as possible!</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}
