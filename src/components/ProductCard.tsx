import { Product } from '../types';
import { useCart } from '../store/useCart';
import { ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-primary-600 font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={16} />
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}