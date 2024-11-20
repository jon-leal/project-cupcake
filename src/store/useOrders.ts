import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { CartItem } from '../types';
import toast from 'react-hot-toast';

interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  created_at: string;
}

interface OrdersStore {
  orders: Order[];
  loading: boolean;
  createOrder: (items: CartItem[], total: number) => Promise<boolean>;
  fetchOrders: () => Promise<void>;
  fetchUserOrders: (userId: string) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
}

export const useOrders = create<OrdersStore>((set, get) => ({
  orders: [],
  loading: false,

  createOrder: async (items: CartItem[], total: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Usuário não autenticado');

      const { error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            items,
            total,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      
      toast.success('Pedido realizado com sucesso!');
      return true;
    } catch (error) {
      toast.error('Erro ao criar pedido');
      return false;
    }
  },

  fetchOrders: async () => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ orders: data || [] });
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      set({ loading: false });
    }
  },

  fetchUserOrders: async (userId: string) => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      set({ orders: data || [] });
    } catch (error) {
      toast.error('Erro ao carregar pedidos');
    } finally {
      set({ loading: false });
    }
  },

  updateOrderStatus: async (orderId: string, status: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      const orders = get().orders.map(order => 
        order.id === orderId ? { ...order, status } : order
      );

      set({ orders });
      toast.success('Status do pedido atualizado');
    } catch (error) {
      toast.error('Erro ao atualizar status do pedido');
    }
  },
}));