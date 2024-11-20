import { Cake } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="p-2 bg-purple-600 rounded-lg">
        <Cake className="h-8 w-8 text-white" />
      </div>
      <span className="text-2xl font-bold text-purple-600">Bolos e Cakes</span>
    </Link>
  );
}