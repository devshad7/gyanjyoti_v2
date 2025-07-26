import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { subject: string } }
) {
  try {
    const { subject } = params
    
    // Define valid subjects
    const validSubjects = ['mathematics', 'science', 'history', 'computer-science']
    
    if (!validSubjects.includes(subject)) {
      return NextResponse.json(
        { error: 'Invalid subject' },
        { status: 400 }
      )
    }
    
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'src', 'data', 'quizzes', `${subject}.json`)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Quiz data not found' },
        { status: 404 }
      )
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const quizData = JSON.parse(fileContent)
    
    return NextResponse.json(quizData, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('Error loading quiz data:', error)
    return NextResponse.json(
      { error: 'Failed to load quiz data' },
      { status: 500 }
    )
  }
}
