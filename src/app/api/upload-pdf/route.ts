import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const file = formData.get('pdf') as File;
    const title = formData.get('title') as string;
    const subject = formData.get('subject') as string;
    const className = formData.get('class') as string;
    const description = formData.get('description') as string;
    const tags = formData.get('tags') as string;

    // Validate required fields
    if (!file || !title || !subject || !className) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 422 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 422 }
      );
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 413 }
      );
    }

    // For now, simulate successful upload
    // You can add actual file storage logic here later
    const pdfData = {
      id: `pdf-${Date.now()}`,
      title,
      subject,
      class: className,
      description,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      size: file.size,
      uploadedAt: new Date().toISOString(),
      fileName: file.name,
    };

    console.log('PDF upload successful:', pdfData);

    return NextResponse.json({
      success: true,
      message: 'PDF uploaded successfully',
      data: pdfData,
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Configure route options
export const runtime = 'nodejs';
export const maxDuration = 60;