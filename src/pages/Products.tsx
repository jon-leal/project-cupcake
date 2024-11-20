import { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Products() {
  const [category, setCategory] = useState<'todos' | 'cupcake' | 'cake'>('todos');

  const filteredProducts = category === 'todos'
    ? products
    : products.filter(product => product.category === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nossos Produtos</h1>
      
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setCategory('todos')}
          className={`px-4 py-2 rounded-md transition-colors ${
            category === 'todos'
              ? 'bg-primary-500 text-white'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setCategory('cupcake')}
          className={`px-4 py-2 rounded-md transition-colors ${
            category === 'cupcake'
              ? 'bg-primary-500 text-white'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          }`}
        >
          Cupcakes
        </button>
        <button
          onClick={() => setCategory('cake')}
          className={`px-4 py-2 rounded-md transition-colors ${
            category === 'cake'
              ? 'bg-primary-500 text-white'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          }`}
        >
          Bolos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}