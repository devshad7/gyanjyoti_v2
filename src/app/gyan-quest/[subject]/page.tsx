"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, Home } from "lucide-react"
import { getQuizData, type QuizData } from "@/utils/quiz-loader"

export default function SubjectQuizPage() {
  const router = useRouter()
  const params = useParams()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])
  const [quizData, setQuizData] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)

  const subject = params.subject as string

  useEffect(() => {
    const data = getQuizData(subject)
    setQuizData(data)
    setLoading(false)
  }, [subject])

  // Handle invalid subject
  if (!loading && !quizData) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">Subject Not Found</h1>
        <p className="mb-8 text-gray-600">Sorry, we couldn&apos;t find the quiz you&apos;re looking for.</p>
        <Button asChild>
          <Link href="/quizzes">
            <Home className="mr-2 h-4 w-4" />
            Back to Quizzes
          </Link>
        </Button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading quiz...</div>
        </div>
      </div>
    )
  }

  const currentQuestion = quizData!.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizData!.questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(answer)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return

    setIsAnswerSubmitted(true)
    const newAnswers = [...answers]
    newAnswers[currentQuestionIndex] = selectedAnswer
    setAnswers(newAnswers)

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData!.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
      setIsAnswerSubmitted(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setSelectedAnswer(answers[currentQuestionIndex - 1] || "")
      setIsAnswerSubmitted(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
    setAnswers([])
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {!quizCompleted ? (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-blue-600">{quizData!.title}</h1>
            <p className="text-gray-700 text-sm md:text-base">{quizData!.description}</p>
          </div>

          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-600 mb-2 gap-2">
              <span>
                Question {currentQuestionIndex + 1} of {quizData!.questions.length}
              </span>
              <span>
                Score: {score}/{currentQuestionIndex}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswer} className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                      isAnswerSubmitted
                        ? option === currentQuestion.correctAnswer
                          ? "bg-green-50 border-green-200"
                          : selectedAnswer === option
                            ? "bg-red-50 border-red-200"
                            : ""
                        : selectedAnswer === option
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <RadioGroupItem
                      value={option}
                      id={`option-${index}`}
                      disabled={isAnswerSubmitted}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer font-medium text-sm md:text-base"
                    >
                      {option}
                    </Label>
                    {isAnswerSubmitted && option === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    {isAnswerSubmitted && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                ))}
              </RadioGroup>
              {isAnswerSubmitted && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-700 mb-2">Explanation:</p>
                  <p className="text-gray-700 text-sm md:text-base">{currentQuestion.explanation}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="w-full sm:w-auto bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {!isAnswerSubmitted ? (
                <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="w-full sm:w-auto">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
                  {currentQuestionIndex < quizData!.questions.length - 1 ? (
                    <>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Finish Quiz"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl text-blue-600">Quiz Completed!</CardTitle>
              <CardDescription className="text-base md:text-lg">
                You scored {score} out of {quizData!.questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-4">Your Performance</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-2 gap-4 text-sm md:text-base">
                    <div className="flex justify-between">
                      <span>Total Questions:</span>
                      <span className="font-semibold">{quizData!.questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct Answers:</span>
                      <span className="text-green-600 font-semibold">{score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incorrect Answers:</span>
                      <span className="text-red-600 font-semibold">{quizData!.questions.length - score}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span className="font-semibold">{Math.round((score / quizData!.questions.length) * 100)}%</span>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-4">Question Summary</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {quizData!.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <p className="font-medium mb-2 text-sm md:text-base">
                        {index + 1}. {question.question}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm gap-2">
                        <span>Your answer:</span>
                        <span
                          className={`font-medium ${
                            answers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {answers[index]}
                          {answers[index] === question.correctAnswer ? (
                            <CheckCircle2 className="inline ml-1 h-4 w-4" />
                          ) : (
                            <XCircle className="inline ml-1 h-4 w-4" />
                          )}
                        </span>
                      </div>
                      {answers[index] !== question.correctAnswer && (
                        <div className="text-sm mt-1">
                          <span className="mr-2">Correct answer:</span>
                          <span className="font-medium text-green-600">{question.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleRestartQuiz} variant="outline">
                Restart Quiz
              </Button>
              <Button asChild>
                <Link href="/quizzes">Try Another Quiz</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
