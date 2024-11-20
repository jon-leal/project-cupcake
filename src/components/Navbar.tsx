import { ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { useAuth } from '../store/useAuth';
import { useState } from 'react';

export function Navbar() {
  const items = useCart((state) => state.items);
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar with Cart and Login */}
        <div className="flex justify-end items-center h-12 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <Link to="/carrinho" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-primary-500" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative">
                <button 
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-500"
                  onClick={() => setShowDropdown(!showDropdown)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                >
                  <User className="h-6 w-6" />
                  <span>{user.name}</span>
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/pedidos"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Meus Pedidos
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                        onClick={() => setShowDropdown(false)}
                      >
                        Painel Admin
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary-500"
                >
                  <User className="h-6 w-6" />
                  <span>Entrar</span>
                </Link>
                <Link
                  to="/cadastro"
                  className="bg-primary-500 text-white px-4 py-1 rounded-md hover:bg-primary-600 transition-colors"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Logo Section */}
        <div className="flex flex-col items-center py-6">
          <img src="/logo.svg" alt="Logo" className="h-16 mb-2" />
          <span className="text-3xl font-bold text-primary-500">Casa do Cupcake</span>
        </div>
        
        {/* Navigation Links - Centered */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center items-center h-16 space-x-12">
            <Link to="/" className="text-gray-700 hover:text-primary-500">
              Início
            </Link>
            <Link to="/produtos" className="text-gray-700 hover:text-primary-500">
              Produtos
            </Link>
            <Link to="/sobre" className="text-gray-700 hover:text-primary-500">
              Sobre
            </Link>
            <Link to="/contato" className="text-gray-700 hover:text-primary-500">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}