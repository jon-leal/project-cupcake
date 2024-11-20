import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-primary-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Contato</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Endereço</h3>
                  <p className="text-gray-600">Rua das Flores, 123</p>
                  <p className="text-gray-600">Centro - São Paulo, SP</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-primary-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Telefone</h3>
                  <p className="text-gray-600">(11) 99999-9999</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-primary-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">E-mail</h3>
                  <p className="text-gray-600">contato@casadocupcake.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-primary-500 w-6 h-6 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Horário de Funcionamento</h3>
                  <p className="text-gray-600">Segunda a Sábado: 9h às 19h</p>
                  <p className="text-gray-600">Domingo: 9h às 13h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}