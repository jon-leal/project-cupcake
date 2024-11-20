import { useState, useEffect } from 'react';
import { Package, Users, DollarSign, ShoppingBag } from 'lucide-react';
import { useOrders } from '../store/useOrders';
import { useAuth } from '../store/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orders, fetchOrders, updateOrderStatus, loading } = useOrders();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalProducts: 48 // Fixed for now as products are hardcoded
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      toast.error('Acesso não autorizado');
      navigate('/');
      return;
    }

    const loadData = async () => {
      await fetchOrders();
      calculateStats();
    };

    loadData();
  }, [user, navigate]);

  const calculateStats = () => {
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map(order => order.user_id)).size;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    setStats({
      totalOrders,
      totalCustomers: uniqueCustomers,
      totalRevenue,
      totalProducts: 48
    });
  };

  const handleStatusUpdate = async (orderId: string, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    await updateOrderStatus(orderId, newStatus);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Painel Administrativo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Package className="text-primary-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Total de Pedidos</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <Users className="text-primary-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Clientes</p>
              <p className="text-2xl font-bold">{stats.totalCustomers}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <DollarSign className="text-primary-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Receita</p>
              <p className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-4">
            <ShoppingBag className="text-primary-500" size={24} />
            <div>
              <p className="text-sm text-gray-600">Produtos</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="pb-2">Pedido</th>
                <th className="pb-2">Cliente</th>
                <th className="pb-2">Data</th>
                <th className="pb-2">Total</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-4">{order.id.slice(0, 8)}</td>
                  <td className="py-4">{order.user_id.slice(0, 8)}</td>
                  <td className="py-4">
                    {new Date(order.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="py-4">R$ {order.total.toFixed(2)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {order.status === 'completed'
                        ? 'Concluído'
                        : order.status === 'processing'
                        ? 'Em Processamento'
                        : order.status === 'cancelled'
                        ? 'Cancelado'
                        : 'Pendente'}
                    </span>
                  </td>
                  <td className="py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value as any)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    >
                      <option value="pending">Pendente</option>
                      <option value="processing">Em Processamento</option>
                      <option value="completed">Concluído</option>
                      <option value="cancelled">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}