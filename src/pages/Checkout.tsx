import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { useOrders } from '../store/useOrders';
import toast from 'react-hot-toast';

export function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [loading, setLoading] = useState(false);
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Criar pedido no Supabase
      const success = await createOrder(items, total);
      
      if (success) {
        clearCart();
        navigate('/pedidos');
      } else {
        throw new Error('Erro ao criar pedido');
      }
    } catch (error) {
      toast.error('Erro ao finalizar pedido');
      console.error('Erro ao criar pedido:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resumo do pedido */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between py-2">
              <span>{item.product.name} x{item.quantity}</span>
              <span>R$ {(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Formulário de pagamento */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Pagamento</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Método de Pagamento
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Cartão de Crédito
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="debit"
                    checked={paymentMethod === 'debit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Cartão de Débito
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número do Cartão
              </label>
              <input
                type="text"
                maxLength={16}
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome no Cartão
              </label>
              <input
                type="text"
                value={formData.cardName}
                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  maxLength={5}
                  value={formData.expiry}
                  onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={formData.cvv}
                  onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Finalizar Compra'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}