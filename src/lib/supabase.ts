import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database schema types
export interface Database {
  public: {
    Tables: {
      pdfs: {
        Row: {
          id: string
          title: string
          description: string | null
          subject: string
          class: string
          tags: string[] | null
          upload_date: string
          thumbnail: string | null
          url: string
          favorite: boolean
          pages: number
          file_size: string
          download_count: number
          created_by: string | null
          updated_at: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          subject: string
          class: string
          tags?: string[] | null
          upload_date?: string
          thumbnail?: string | null
          url: string
          favorite?: boolean
          pages?: number
          file_size: string
          download_count?: number
          created_by?: string | null
          updated_at?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          subject?: string
          class?: string
          tags?: string[] | null
          upload_date?: string
          thumbnail?: string | null
          url?: string
          favorite?: boolean
          pages?: number
          file_size?: string
          download_count?: number
          created_by?: string | null
          updated_at?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
    }
  }
}
