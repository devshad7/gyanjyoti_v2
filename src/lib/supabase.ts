import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Type for mock client during development
type MockSupabaseClient = Record<string, (...args: unknown[]) => never>

// Completely safe client creation that won't fail during build
function createSupabaseClient(): SupabaseClient | MockSupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time or when env vars are missing, return a mock client
  if (!supabaseUrl || !supabaseKey) {
    // Create a mock client that won't cause build errors
    return new Proxy({}, {
      get() {
        if (process.env.NODE_ENV === 'production') {
          throw new Error('Supabase configuration is missing')
        }
        // Return a function that throws an error when called
        return () => {
          throw new Error('Supabase not configured for development')
        }
      }
    }) as MockSupabaseClient
  }

  return createClient(supabaseUrl, supabaseKey)
}

export const supabase = createSupabaseClient()

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
