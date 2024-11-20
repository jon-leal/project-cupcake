import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre Nós</h3>
            <p className="text-gray-600 text-sm">
              A Casa do Cupcake é especializada em criar momentos doces e especiais desde 2024, 
              oferecendo produtos artesanais de alta qualidade.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">contato@casadocupcake.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">Rua das Flores, 123 - São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <Link to="/produtos" className="block text-gray-600 hover:text-primary-500 text-sm">
                Produtos
              </Link>
              <Link to="/sobre" className="block text-gray-600 hover:text-primary-500 text-sm">
                Sobre
              </Link>
              <Link to="/contato" className="block text-gray-600 hover:text-primary-500 text-sm">
                Contato
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-500"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-500"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2024 Casa do Cupcake. Todos os direitos reservados.</p>
            <p className="mt-1">
              Desenvolvido por{' '}
              <a
                href="https://github.com/jon-leal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600"
              >
                JLEAL
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}