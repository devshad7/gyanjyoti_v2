# Supabase PDF Storage Setup

## Database Setup - URGENT FIX NEEDED!

### Step 1: Create the PDFs Table in Supabase

**The error "relation public.pdfs does not exist" means you need to create the database table first.**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project (zhbtkvocutcxpufouvlj)
3. Go to "SQL Editor" in the sidebar
4. Click "New Query"
5. Copy and paste the following SQL code:

```sql
-- Create PDFs table
CREATE TABLE IF NOT EXISTS pdfs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    class TEXT NOT NULL,
    tags TEXT[],
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    thumbnail TEXT,
    url TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    pages INTEGER DEFAULT 0,
    file_size TEXT NOT NULL,
    download_count INTEGER DEFAULT 0,
    created_by TEXT,
    updated_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pdfs_subject ON pdfs(subject);
CREATE INDEX IF NOT EXISTS idx_pdfs_class ON pdfs(class);
CREATE INDEX IF NOT EXISTS idx_pdfs_favorite ON pdfs(favorite);
CREATE INDEX IF NOT EXISTS idx_pdfs_is_active ON pdfs(is_active);
CREATE INDEX IF NOT EXISTS idx_pdfs_upload_date ON pdfs(upload_date DESC);

-- Create RPC function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(pdf_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE pdfs
    SET download_count = download_count + 1,
        updated_at = NOW()
    WHERE id = pdf_id;
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;

-- Create policies for access (allowing all operations for now)
CREATE POLICY "PDFs are viewable by everyone" ON pdfs
    FOR SELECT USING (true);

CREATE POLICY "PDFs can be inserted by everyone" ON pdfs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "PDFs can be updated by everyone" ON pdfs
    FOR UPDATE USING (true);

CREATE POLICY "PDFs can be deleted by everyone" ON pdfs
    FOR DELETE USING (true);
```

6. Click "Run" to execute the query
7. You should see "Success. No rows returned" message

### Step 2: Verify Table Creation

1. Go to "Table Editor" in the sidebar
2. You should see the "pdfs" table listed
3. Click on it to see the table structure

---

## Why Supabase?

- ✅ **1GB Free Storage** (vs Firebase's 5GB but with better free tier limits)
- ✅ **Easy to set up** (similar to Firebase)
- ✅ **PostgreSQL database** (more powerful than Firestore)
- ✅ **Real-time subscriptions**
- ✅ **Built-in authentication**

## Quick Setup (5 minutes)

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create new project
4. Choose free tier

### 2. Get API Keys

From your Supabase dashboard:

- Project URL: `https://your-project.supabase.co`
- Anon Key: `eyJ...` (starts with eyJ)

### 3. Install Supabase

```bash
npm install @supabase/supabase-js
```

### 4. Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Storage Bucket Setup

In Supabase dashboard:

1. Go to Storage
2. Create bucket named "pdfs"
3. Make it public
4. Set policies to allow uploads

## Migration Benefits

- **Free**: 1GB storage + 2GB bandwidth/month
- **Fast**: Built on PostgreSQL
- **Scalable**: Easy to upgrade later
- **Better**: More features than Firebase free tier

## TROUBLESHOOTING: Column "subject" does not exist

If you get the error `column "subject" does not exist`, it means either:

1. **The table already exists** with different column names, OR
2. **The table creation failed** partially

### Fix Option 1: Check Existing Table Structure

First, let's see what columns your table actually has:

```sql
-- Check what columns exist in your pdfs table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'pdfs' AND table_schema = 'public';
```

### Fix Option 2: Drop and Recreate Table (RECOMMENDED)

If you have an existing table with wrong structure, drop it and recreate:

```sql
-- Drop existing table if it has wrong structure
DROP TABLE IF EXISTS pdfs CASCADE;

-- Now run the original CREATE TABLE command from above
CREATE TABLE pdfs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    class TEXT NOT NULL,
    tags TEXT[],
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    thumbnail TEXT,
    url TEXT NOT NULL,
    favorite BOOLEAN DEFAULT FALSE,
    pages INTEGER DEFAULT 0,
    file_size TEXT NOT NULL,
    download_count INTEGER DEFAULT 0,
    created_by TEXT,
    updated_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_pdfs_subject ON pdfs(subject);
CREATE INDEX idx_pdfs_class ON pdfs(class);
CREATE INDEX idx_pdfs_favorite ON pdfs(favorite);
CREATE INDEX idx_pdfs_is_active ON pdfs(is_active);
CREATE INDEX idx_pdfs_upload_date ON pdfs(upload_date DESC);

-- Create function
CREATE OR REPLACE FUNCTION increment_download_count(pdf_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE pdfs
    SET download_count = download_count + 1,
        updated_at = NOW()
    WHERE id = pdf_id;
END;
$$ LANGUAGE plpgsql;

-- Set up RLS policies
ALTER TABLE pdfs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "PDFs are viewable by everyone" ON pdfs FOR SELECT USING (true);
CREATE POLICY "PDFs can be inserted by everyone" ON pdfs FOR INSERT WITH CHECK (true);
CREATE POLICY "PDFs can be updated by everyone" ON pdfs FOR UPDATE USING (true);
CREATE POLICY "PDFs can be deleted by everyone" ON pdfs FOR DELETE USING (true);
```

### Fix Option 3: Manual Column Addition (if table exists but missing columns)

If you want to keep existing data and just add missing columns:

```sql
-- Add missing columns one by one
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS class TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS upload_date TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS thumbnail TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS favorite BOOLEAN DEFAULT FALSE;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS pages INTEGER DEFAULT 0;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS file_size TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE pdfs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
```

---
