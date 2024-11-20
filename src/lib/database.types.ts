export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          role: 'admin' | 'customer'
          created_at: string
        }
        Insert: {
          id: string
          name: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: 'admin' | 'customer'
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: Json
          total: number
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          items: Json
          total: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          items?: Json
          total?: number
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          created_at?: string
        }
      }
    }
  }
}