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
CREATE INDEX IF NOT EXISTS idx_pdfs_title_search ON pdfs USING gin(to_tsvector('english', title));
CREATE INDEX IF NOT EXISTS idx_pdfs_description_search ON pdfs USING gin(to_tsvector('english', description));

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

-- Create policies for public access (adjust based on your authentication needs)
CREATE POLICY "PDFs are viewable by everyone" ON pdfs
    FOR SELECT USING (is_active = true);

CREATE POLICY "PDFs can be inserted by authenticated users" ON pdfs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "PDFs can be updated by authenticated users" ON pdfs
    FOR UPDATE USING (true);

CREATE POLICY "PDFs can be deleted by authenticated users" ON pdfs
    FOR DELETE USING (true);

-- Grant permissions
GRANT ALL ON pdfs TO authenticated;
GRANT SELECT ON pdfs TO anon;

-- Create Notes table
CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    class TEXT NOT NULL,
    tags TEXT[],
    images JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    favorite BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by TEXT,
    view_count INTEGER DEFAULT 0
);

-- Create indexes for notes table
CREATE INDEX IF NOT EXISTS idx_notes_subject ON notes(subject);
CREATE INDEX IF NOT EXISTS idx_notes_class ON notes(class);
CREATE INDEX IF NOT EXISTS idx_notes_favorite ON notes(favorite);
CREATE INDEX IF NOT EXISTS idx_notes_is_active ON notes(is_active);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_title_search ON notes USING gin(to_tsvector('english', title));

-- Enable RLS for notes
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Create policies for notes
CREATE POLICY "Notes are viewable by everyone" ON notes
    FOR SELECT USING (is_active = true);

CREATE POLICY "Notes can be inserted by authenticated users" ON notes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Notes can be updated by authenticated users" ON notes
    FOR UPDATE USING (true);

CREATE POLICY "Notes can be deleted by authenticated users" ON notes
    FOR DELETE USING (true);

-- Grant permissions for notes
GRANT ALL ON notes TO authenticated;
GRANT SELECT ON notes TO anon;

-- Function to increment view count for notes
CREATE OR REPLACE FUNCTION increment_note_view_count(note_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE notes 
    SET view_count = view_count + 1,
        updated_at = NOW()
    WHERE id = note_id;
END;
$$ LANGUAGE plpgsql;
