import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

interface AuthStore {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,

  checkSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: profile.name,
            role: profile.role
          }
        });
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          set({
            user: {
              id: data.user.id,
              email: data.user.email!,
              name: profile.name,
              role: profile.role
            }
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      toast.error('Erro ao fazer login');
      return false;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              role: 'customer'
            }
          ]);

        if (profileError) throw profileError;

        set({
          user: {
            id: data.user.id,
            email: data.user.email!,
            name,
            role: 'customer'
          }
        });
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Erro ao criar conta');
      return false;
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));