import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1920&q=80',
    title: 'Cupcakes Artesanais',
    description: 'Sabores únicos feitos com amor'
  },
  {
    url: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=1920&q=80',
    title: 'Bolos Especiais',
    description: 'Para momentos inesquecíveis'
  },
  {
    url: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&w=1920&q=80',
    title: 'Doces Exclusivos',
    description: 'Receitas tradicionais com toque especial'
  },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[500px] w-full group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full bg-center bg-cover duration-500 relative"
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
          <h2 className="text-4xl font-bold mb-2">{slides[currentIndex].title}</h2>
          <p className="text-xl">{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}