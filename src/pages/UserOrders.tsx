import { useEffect } from 'react';
import { useOrders } from '../store/useOrders';
import { useAuth } from '../store/useAuth';

export function UserOrders() {
  const { user } = useAuth();
  const { orders, fetchUserOrders, loading } = useOrders();

  useEffect(() => {
    if (user) {
      fetchUserOrders(user.id);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">Você ainda não tem pedidos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-600">Pedido #{order.id.slice(0, 8)}</p>
                <p className="text-sm text-gray-600">
                  {new Date(order.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
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
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-lg font-semibold mb-2">Itens do Pedido</h3>
              <div className="space-y-2">
                {(order.items as any[]).map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}