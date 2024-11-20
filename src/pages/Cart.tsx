import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';
import { LoginModal } from '../components/LoginModal';
import { useState } from 'react';

export function Cart() {
  const { items, removeItem, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      navigate('/checkout');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho</h1>
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrinho</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between py-4 border-b last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.product.name}
                </h3>
                <p className="text-gray-600">
                  R$ {item.product.price.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.product.id, parseInt(e.target.value))
                }
                className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Total: R$ {total.toFixed(2)}
            </p>
          </div>

          <button 
            onClick={handleCheckout}
            className="bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition-colors"
          >
            Finalizar Compra
          </button>
        </div>
      </div>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        onSuccess={() => navigate('/checkout')}
      />
    </div>
  );
}