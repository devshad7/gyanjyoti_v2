# Dynamic PDF System Setup Guide

This guide will help you set up the dynamic PDF system that fetches PDF data from Firebase Firestore and stores files in Firebase Storage.

## 🎯 What We've Built

A complete dynamic PDF management system with:

### ✅ Backend Components

- **Firebase Configuration** (`src/lib/firebase-config.ts`)
- **PDF Service** (`src/lib/pdf-service.ts`) - Complete CRUD operations
- **API Routes** (`src/app/api/pdfs/...`) - REST endpoints for PDF management
- **Type Definitions** (`src/types/pdf.ts`) - TypeScript interfaces

### ✅ Frontend Components

- **PDF Cards Component** (`src/components/layout/pdf-cards-component.tsx`) - Dynamic PDF listing with filters
- **PDF Upload Component** (`src/components/layout/pdf-upload.tsx`) - Admin upload interface
- **PDF Viewer Component** (`src/components/layout/pdf-viewer.tsx`) - PDF viewing interface
- **Admin Page** (`src/app/admin/pdfs/page.tsx`) - PDF management dashboard

### ✅ Hooks & Utils

- **usePDFs Hook** (`src/hooks/use-pdfs.ts`) - PDF data management
- **useMetadata Hook** (`src/hooks/use-metadata.ts`) - Subject/class management
- **useToast Hook** (`src/hooks/use-toast.ts`) - Notification system

## 🚀 Setup Instructions

### 1. Install Dependencies

All required dependencies are already in your `package.json`:

- `firebase` - Firebase SDK
- `@radix-ui/*` - UI components
- `lucide-react` - Icons

### 2. Firebase Setup

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable **Firestore Database**
4. Enable **Storage**
5. Set up authentication rules

#### Configure Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // PDFs collection
    match /pdfs/{document} {
      allow read: if true; // Public read access for students
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

#### Configure Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // PDF files
    match /pdfs/{allPaths=**} {
      allow read: if true; // Public read access
      allow write: if request.auth != null; // Only authenticated users can upload
    }

    // Thumbnail images
    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 3. Environment Variables

#### Copy and Configure

```bash
cp .env.example .env.local
```

#### Fill in Firebase Config

Get these values from Firebase Console > Project Settings > General:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Database Structure

The system will automatically create this Firestore structure:

```
/pdfs/{pdfId}
  - title: string
  - subject: string
  - class: string
  - description: string
  - tags: string[]
  - url: string (Firebase Storage URL)
  - thumbnail: string (Firebase Storage URL)
  - uploadDate: timestamp
  - updatedAt: timestamp
  - favorite: boolean
  - pages: number
  - fileSize: string
  - downloadCount: number
  - isActive: boolean
  - createdBy: string
```

## 🎮 Usage

### For Students (Frontend)

```tsx
import PDFCardsComponent from "@/components/layout/pdf-cards-component";

export default function MaterialsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Study Materials</h1>
      <PDFCardsComponent />
    </div>
  );
}
```

### For Admins

Navigate to `/admin/pdfs` to:

- Upload new PDFs
- Manage existing PDFs
- View analytics
- Toggle active/inactive status

### API Endpoints

#### GET `/api/pdfs`

Fetch PDFs with filters:

```javascript
// Get all active PDFs
fetch("/api/pdfs");

// Get PDFs by subject
fetch("/api/pdfs?subject=Mathematics");

// Get PDFs by class
fetch("/api/pdfs?class=Class 10");

// Search PDFs
fetch("/api/pdfs?search=algebra");

// Pagination
fetch("/api/pdfs?page=2&limit=10");
```

#### POST `/api/pdfs`

Upload new PDF:

```javascript
const formData = new FormData();
formData.append("title", "Mathematics Chapter 1");
formData.append("subject", "Mathematics");
formData.append("class", "Class 10");
formData.append("file", pdfFile);
formData.append("thumbnail", thumbnailFile); // optional

fetch("/api/pdfs", {
  method: "POST",
  body: formData,
});
```

#### PUT `/api/pdfs/[id]`

Update PDF metadata:

```javascript
fetch("/api/pdfs/pdf-id", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Title",
    favorite: true,
    isActive: false,
  }),
});
```

#### DELETE `/api/pdfs/[id]`

Delete PDF and files:

```javascript
fetch("/api/pdfs/pdf-id", { method: "DELETE" });
```

## 🔧 Customization

### Adding New Subjects/Classes

The system automatically detects unique subjects and classes from uploaded PDFs. You can also modify the defaults in `pdf-upload.tsx`:

```tsx
const defaultSubjects = ["Mathematics", "Physics", "Chemistry", "Biology"];
const defaultClasses = ["Class 9", "Class 10", "Class 11", "Class 12"];
```

### Styling

All components use Tailwind CSS and follow your existing design system with colors:

- Primary Blue: `#1e40af`
- Secondary Pink: `#e91e63`
- Accent Yellow: `#f0b429`

### File Size Limits

Current limits are handled by Firebase Storage. You can add client-side validation in the upload component:

```tsx
// In pdf-upload.tsx
if (file.size > 50 * 1024 * 1024) {
  // 50MB limit
  toast({
    title: "File too large",
    description: "Please select a file smaller than 50MB",
    variant: "destructive",
  });
  return;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy

### Other Platforms

Make sure to set all environment variables in your deployment platform.

## 🔒 Security Considerations

1. **Firebase Rules**: Set up proper Firestore and Storage rules
2. **Authentication**: Consider adding authentication for upload/admin features
3. **File Validation**: Server-side file type validation is implemented
4. **Rate Limiting**: Consider adding rate limiting for API endpoints

## 🎯 Next Steps

### Enhanced Features You Can Add:

1. **PDF Text Search**: Extract text from PDFs for better search
2. **Analytics Dashboard**: Track downloads, popular PDFs
3. **User Favorites**: Let users save favorites (requires auth)
4. **Comments/Reviews**: Let users rate and review PDFs
5. **Categories/Tags**: More granular organization
6. **Bulk Operations**: Upload multiple files at once
7. **PDF Preview**: Generate preview images automatically

### Performance Optimizations:

1. **Caching**: Add Redis for API caching
2. **CDN**: Use Firebase CDN or Cloudflare
3. **Lazy Loading**: Implement infinite scroll
4. **Image Optimization**: Compress thumbnails

## 🐛 Troubleshooting

### Common Issues:

1. **Firebase Not Connecting**:

   - Check environment variables
   - Verify Firebase project settings
   - Check console for errors

2. **File Upload Fails**:

   - Check Firebase Storage rules
   - Verify file size limits
   - Check network connectivity

3. **PDFs Not Loading**:
   - Check Firestore rules
   - Verify collection name ('pdfs')
   - Check API endpoints

### Debug Mode:

Add this to your environment to see detailed logs:

```env
NEXT_PUBLIC_DEBUG=true
```

## ✅ Testing

Test the complete flow:

1. Upload a PDF via admin panel
2. View it in the student interface
3. Test filters and search
4. Test download functionality
5. Test favorites toggle

## 🎉 You're All Set!

Your dynamic PDF system is now ready to use! Students can browse and download PDFs, while admins can manage the entire collection through a beautiful interface.
