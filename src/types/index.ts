export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'cupcake' | 'cake';
}

export interface CartItem {
  product: Product;
  quantity: number;
}