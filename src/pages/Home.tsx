import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';

export function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      <Carousel />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sabores Exclusivos
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Experimente nossos deliciosos cupcakes artesanais
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-600 transition-colors"
          >
            Ver Produtos
            <ArrowRight size={20} />
          </Link>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}