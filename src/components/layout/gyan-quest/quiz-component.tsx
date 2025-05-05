"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample quiz data - replace with your actual data
const quizData = {
  mathematics: {
    title: "Mathematics Quiz",
    description: "Test your mathematical knowledge",
    questions: [
      {
        id: 1,
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "3.16", "3.12", "3.18"],
        correctAnswer: "3.14",
        explanation:
          "Pi (π) is approximately equal to 3.14159..., which rounds to 3.14 when expressed to two decimal places.",
      },
      {
        id: 2,
        question: "If x + y = 10 and x - y = 4, what is the value of x?",
        options: ["5", "6", "7", "8"],
        correctAnswer: "7",
        explanation: "From the equations, we can add them: 2x = 14, so x = 7.",
      },
      {
        id: 3,
        question: "What is the area of a circle with radius 5 units?",
        options: ["25π square units", "10π square units", "5π square units", "15π square units"],
        correctAnswer: "25π square units",
        explanation: "The area of a circle is πr², where r is the radius. So, area = π × 5² = 25π square units.",
      },
      {
        id: 4,
        question: "What is the square root of 144?",
        options: ["12", "14", "10", "16"],
        correctAnswer: "12",
        explanation: "The square root of 144 is 12 because 12 × 12 = 144.",
      },
      {
        id: 5,
        question: "If a triangle has angles measuring 30°, 60°, and 90°, what type of triangle is it?",
        options: ["Equilateral", "Isosceles", "Scalene", "Right-angled"],
        correctAnswer: "Right-angled",
        explanation:
          "A triangle with a 90° angle is a right-angled triangle. This particular triangle is also a special right triangle known as a 30-60-90 triangle.",
      },
    ],
  },
  science: {
    title: "Science Quiz",
    description: "Test your scientific knowledge",
    questions: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: "Au",
        explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'.",
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
        explanation:
          "Mars is known as the Red Planet due to its reddish appearance, which is caused by iron oxide (rust) on its surface.",
      },
      {
        id: 3,
        question: "What is the largest organ in the human body?",
        options: ["Heart", "Liver", "Skin", "Brain"],
        correctAnswer: "Skin",
        explanation:
          "The skin is the largest organ in the human body, covering an area of about 2 square meters in adults.",
      },
      {
        id: 4,
        question: "Which of these is NOT a state of matter?",
        options: ["Solid", "Liquid", "Gas", "Energy"],
        correctAnswer: "Energy",
        explanation:
          "The three common states of matter are solid, liquid, and gas. Plasma is often considered the fourth state. Energy is not a state of matter but a property that matter can possess.",
      },
      {
        id: 5,
        question: "What is the process by which plants make their own food using sunlight?",
        options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
        correctAnswer: "Photosynthesis",
        explanation:
          "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with carbon dioxide and water.",
      },
    ],
  },
  history: {
    title: "History Quiz",
    description: "Test your historical knowledge",
    questions: [
      {
        id: 1,
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: "George Washington",
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
      },
      {
        id: 2,
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
        explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September.",
      },
      {
        id: 3,
        question: "Which ancient civilization built the pyramids at Giza?",
        options: ["Mesopotamians", "Egyptians", "Greeks", "Romans"],
        correctAnswer: "Egyptians",
        explanation: "The pyramids at Giza were built by the ancient Egyptians as tombs for their pharaohs.",
      },
      {
        id: 4,
        question: "Who wrote the 'I Have a Dream' speech?",
        options: ["Malcolm X", "Martin Luther King Jr.", "Rosa Parks", "Barack Obama"],
        correctAnswer: "Martin Luther King Jr.",
        explanation:
          "Martin Luther King Jr. delivered his famous 'I Have a Dream' speech during the March on Washington for Jobs and Freedom on August 28, 1963.",
      },
      {
        id: 5,
        question: "Which empire was ruled by Genghis Khan?",
        options: ["Roman Empire", "Ottoman Empire", "Mongol Empire", "Byzantine Empire"],
        correctAnswer: "Mongol Empire",
        explanation:
          "Genghis Khan was the founder and first Great Khan of the Mongol Empire, which became the largest contiguous empire in history after his death.",
      },
    ],
  },
}

export default function QuizComponent() {
  const [activeSubject, setActiveSubject] = useState("mathematics")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [answers, setAnswers] = useState<string[]>([])

  // Reset quiz state when subject changes
  useEffect(() => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setIsAnswerSubmitted(false)
    setScore(0)
    setQuizCompleted(false)
    setAnswers([])
  }, [activeSubject])

  const quiz = quizData[activeSubject as keyof typeof quizData]
  const currentQuestion = quiz.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

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
    if (currentQuestionIndex < quiz.questions.length - 1) {
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
    <div className="w-full">
      <Tabs value={activeSubject} onValueChange={setActiveSubject} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {Object.keys(quizData).map((subject) => (
          <TabsContent key={subject} value={subject}>
            {!quizCompleted ? (
              <div>
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                      Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </span>
                    <span>
                      Score: {score}/{currentQuestionIndex}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedAnswer} className="space-y-3">
                      {currentQuestion.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer ${
                            isAnswerSubmitted
                              ? option === currentQuestion.correctAnswer
                                ? "bg-green-50 border-green-200"
                                : selectedAnswer === option
                                  ? "bg-red-50 border-red-200"
                                  : ""
                              : selectedAnswer === option
                                ? "bg-blue-50 border-blue-200"
                                : ""
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`option-${subject}-${index}`}
                            disabled={isAnswerSubmitted}
                            className="sr-only"
                          />
                          <Label htmlFor={`option-${subject}-${index}`} className="flex-1 cursor-pointer font-medium">
                            {option}
                          </Label>
                          {isAnswerSubmitted && option === currentQuestion.correctAnswer && (
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                          )}
                          {isAnswerSubmitted &&
                            selectedAnswer === option &&
                            option !== currentQuestion.correctAnswer && <XCircle className="h-5 w-5 text-red-500" />}
                        </div>
                      ))}
                    </RadioGroup>

                    {isAnswerSubmitted && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-blue-700 mb-2">Explanation:</p>
                        <p className="text-gray-700">{currentQuestion.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>

                    {!isAnswerSubmitted ? (
                      <Button
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion} className="bg-blue-600 hover:bg-blue-700">
                        {currentQuestionIndex < quiz.questions.length - 1 ? (
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
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-blue-600">Quiz Completed!</CardTitle>
                  <CardDescription>
                    You scored {score} out of {quiz.questions.length}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-4">Your Performance</h3>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Total Questions:</span>
                        <span>{quiz.questions.length}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Correct Answers:</span>
                        <span className="text-green-600">{score}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Incorrect Answers:</span>
                        <span className="text-red-600">{quiz.questions.length - score}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Accuracy:</span>
                        <span>{Math.round((score / quiz.questions.length) * 100)}%</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg mb-4">Question Summary</h3>
                    <div className="space-y-4">
                      {quiz.questions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <p className="font-medium mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="mr-2">Your answer:</span>
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
                <CardFooter className="flex justify-center">
                  <Button onClick={handleRestartQuiz} className="bg-blue-600 hover:bg-blue-700">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Restart Quiz
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
