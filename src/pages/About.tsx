import { Heart, Clock, Award, Users } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-primary-500">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">Nossa História</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg mx-auto">
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            Desde 2024, a Casa do Cupcake tem se dedicado a criar momentos doces e especiais 
            para nossos clientes. Nossa paixão por confeitaria artesanal nos motiva a 
            buscar sempre a excelência em cada produto que fazemos.
          </p>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-12">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Feito com Amor</h3>
              <p className="text-gray-600">Cada produto é preparado com dedicação e carinho</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Sempre Frescos</h3>
              <p className="text-gray-600">Produtos preparados diariamente</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-gray-600">Ingredientes selecionados de alta qualidade</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-500 w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Clientes Felizes</h3>
              <p className="text-gray-600">Satisfação garantida em cada entrega</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 my-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
            <p className="text-gray-600">
              Proporcionar experiências únicas através de nossos produtos artesanais, 
              levando sabor e alegria para momentos especiais de nossos clientes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}