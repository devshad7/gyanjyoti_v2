# GyanJyoti PDF Management System

This is a [Next.js](https://nextjs.org) project with dynamic PDF management capabilities using Supabase and Cloudinary.

## Features

- ✅ Dynamic PDF upload and management
- ✅ Cloudinary integration for file storage
- ✅ Supabase database for metadata storage
- ✅ Search and filtering functionality
- ✅ Favorites system
- ✅ Download tracking
- ✅ Admin interface for PDF management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zhbtkvocutcxpufouvlj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoYnRrdm9jdXRjeHB1Zm91dmxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTU3NzUsImV4cCI6MjA2Nzk3MTc3NX0.HCdD7s2upOaeTF29hgIbIbBsSSv5Op-xk2he47jcMkk
```

### 3. Supabase Database Setup

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-schema.sql` to create the required tables and functions

### 4. Cloudinary Setup

1. Create a free Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret from the dashboard
3. Add them to your `.env.local` file

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## PDF Management

### Admin Interface

Visit `/admin/pdfs` to access the PDF management interface where you can:

- Upload new PDFs with metadata
- View all uploaded PDFs
- Search and filter PDFs
- Mark PDFs as favorites
- Delete PDFs
- Track download statistics

### API Endpoints

- `GET /api/pdfs` - List all PDFs with filtering and pagination
- `POST /api/pdfs` - Upload a new PDF
- `GET /api/pdfs/[id]` - Get a specific PDF
- `PUT /api/pdfs/[id]` - Update PDF metadata
- `DELETE /api/pdfs/[id]` - Delete a PDF
- `POST /api/pdfs/[id]/toggle-favorite` - Toggle favorite status
- `POST /api/pdfs/[id]/download` - Track download and get URL
- `GET /api/pdfs/metadata/classes` - Get available classes
- `GET /api/pdfs/metadata/subjects` - Get available subjects

## Project Structure

```
src/
├── app/
│   ├── admin/pdfs/          # Admin PDF management page
│   └── api/pdfs/            # PDF API endpoints
├── components/
│   ├── PDFUploadForm.tsx    # PDF upload component
│   └── PDFManager.tsx       # PDF management component
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   └── supabase-pdf-service.ts # PDF service with Supabase
└── types/
    └── pdf.ts               # TypeScript interfaces
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Supabase** - Database and backend services
- **Cloudinary** - File storage and CDN
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
