import mathematicsData from "../data/mathematics.json"
import scienceData from "../data/science.json"
import computerScienceData from "../data/computer-science.json"
import historyData from "../data/history.json"
import geographyData from "../data/geography.json"
import literatureData from "../data/literature.json"
import generalKnowledgeData from "../data/general-knowledge.json"

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface QuizData {
  title: string
  description: string
  questions: Question[]
}

const quizData: Record<string, QuizData> = {
  mathematics: mathematicsData,
  science: scienceData,
  "computer-science": computerScienceData,
  history: historyData,
  geography: geographyData,
  literature: literatureData,
  "general-knowledge": generalKnowledgeData,
}

export function getQuizData(subject: string): QuizData | null {
  return quizData[subject] || null
}

export function getAllSubjects(): string[] {
  return Object.keys(quizData)
}
