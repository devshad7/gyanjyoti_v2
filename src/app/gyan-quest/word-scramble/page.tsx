"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, RefreshCw, Trophy, HelpCircle, Check, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
// Word list for the game
const wordList = [
  {
    word: "EDUCATION",
    hint: "The process of receiving or giving systematic instruction",
  },
  {
    word: "KNOWLEDGE",
    hint: "Facts, information, and skills acquired through experience or education",
  },
  {
    word: "LEARNING",
    hint: "The acquisition of knowledge or skills through study, experience, or teaching",
  },
  {
    word: "SCIENCE",
    hint: "The intellectual and practical activity encompassing the systematic study of structure and behavior",
  },
  {
    word: "MATHEMATICS",
    hint: "The abstract science of number, quantity, and space",
  },
  { word: "HISTORY", hint: "The study of past events" },
  {
    word: "GEOGRAPHY",
    hint: "The study of physical features of the earth and its atmosphere",
  },
  {
    word: "LITERATURE",
    hint: "Written works, especially those considered of superior or lasting artistic merit",
  },
  {
    word: "COMPUTER",
    hint: "An electronic device for storing and processing data",
  },
  {
    word: "LANGUAGE",
    hint: "The method of human communication, either spoken or written",
  },
  {
    word: "PHYSICS",
    hint: "The science of matter, energy, and their interactions",
  },
  {
    word: "CHEMISTRY",
    hint: "The scientific study of the properties and behavior of matter",
  },
  { word: "BIOLOGY", hint: "The study of living organisms" },
  {
    word: "TECHNOLOGY",
    hint: "The application of scientific knowledge for practical purposes",
  },
  {
    word: "RESEARCH",
    hint: "The systematic investigation into and study of materials and sources",
  },
];

// Scramble a word
const scrambleWord = (word: string): string => {
  const characters = word.split("");
  for (let i = characters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [characters[i], characters[j]] = [characters[j], characters[i]];
  }

  // Make sure the scrambled word is different from the original
  const scrambled = characters.join("");
  return scrambled === word ? scrambleWord(word) : scrambled;
};

export default function WordScrambleGame() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);

  // Initialize the game
  useEffect(() => {
    // Load high score from localStorage
    const storedHighScore = localStorage.getItem("wordScrambleHighScore");
    if (storedHighScore) setHighScore(Number.parseInt(storedHighScore));

    // Set up the first word
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWordIndex(randomIndex);
    setScrambledWord(scrambleWord(wordList[randomIndex].word));
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameCompleted]);

  // Check if game is completed
  useEffect(() => {
    if (score >= 10) {
      setGameCompleted(true);

      // Update high score
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("wordScrambleHighScore", score.toString());
      }
    }
  }, [score, highScore]);

  // Handle user input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toUpperCase());

    // Start the game on first input
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  // Check the answer
  const checkAnswer = () => {
    const currentWord = wordList[currentWordIndex].word;
    const isAnswerCorrect = userInput.toUpperCase() === currentWord;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      // Increase score
      setScore((prevScore) => prevScore + 1);

      // Move to next word after a delay
      setTimeout(() => {
        // Get a new random word that's different from the current one
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * wordList.length);
        } while (newIndex === currentWordIndex);

        setCurrentWordIndex(newIndex);
        setScrambledWord(scrambleWord(wordList[newIndex].word));
        setUserInput("");
        setIsCorrect(null);
        setShowHint(false);
      }, 1500);
    }
  };

  // Reset the game
  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    setCurrentWordIndex(randomIndex);
    setScrambledWord(scrambleWord(wordList[randomIndex].word));
    setUserInput("");
    setIsCorrect(null);
    setShowHint(false);
    setTimer(0);
    setGameStarted(false);
    setScore(0);
    setGameCompleted(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-pink-600">
              Word Scramble
            </h1>
            <p className="text-gray-700 mb-6">
              Unscramble the letters to form a meaningful word. Try to solve as
              many as you can!
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-lg">
                <Timer className="h-5 w-5 text-pink-600" />
                <span className="font-medium">{formatTime(timer)}</span>
              </div>

              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
                <span className="font-medium">Score: {score}/10</span>
              </div>

              {highScore > 0 && (
                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                  <span className="font-medium">High Score: {highScore}</span>
                </div>
              )}
            </div>

            <Button onClick={resetGame} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset Game
            </Button>
          </div>

          {gameCompleted ? (
            <div className="mb-8 p-6 bg-green-50 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-2 text-green-600">
                Congratulations!
              </h2>
              <p className="text-lg mb-4">
                You completed the game with a score of {score} in{" "}
                {formatTime(timer)}!
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
          ) : (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Unscramble the Word
                </CardTitle>
                <CardDescription className="text-center">
                  Rearrange the letters to form a meaningful word
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <div className="text-3xl font-bold tracking-wider bg-pink-50 px-6 py-3 rounded-lg">
                    {scrambledWord}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Type your answer here"
                      value={userInput}
                      onChange={handleInputChange}
                      className="text-center text-lg"
                      maxLength={wordList[currentWordIndex].word.length}
                    />
                  </div>

                  {isCorrect !== null && (
                    <div
                      className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
                        isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <Check className="h-5 w-5" />
                          <span>Correct! Well done!</span>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5" />
                          <span>Try again!</span>
                        </>
                      )}
                    </div>
                  )}

                  {showHint && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-blue-700">
                        <span className="font-semibold">Hint:</span>{" "}
                        {wordList[currentWordIndex].hint}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowHint(true)}
                  disabled={showHint}
                  className="gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  Show Hint
                </Button>

                <Button
                  onClick={checkAnswer}
                  disabled={!userInput || isCorrect === true}
                >
                  Check Answer
                </Button>
              </CardFooter>
            </Card>
          )}

          <div className="bg-pink-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-pink-600">
              How to Play
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Look at the scrambled letters and try to form a meaningful word.
              </li>
              <li>Type your answer in the input field.</li>
              <li>Click &quot;Check Answer&quot; to see if you&apos;re correct.</li>
              <li>
                If you&apos;re stuck, you can use the &quot;Show Hint&quot; button for a clue.
              </li>
              <li>Try to solve 10 words to complete the game.</li>
              <li>Challenge yourself to beat your high score!</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
