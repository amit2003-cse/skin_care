export interface Product {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  category: "Barrier Repair" | "Oil-Free Gel" | "Glow & Brightening" | "Night & Anti-Aging" | "Combos";
  skinType: ("All" | "Dry" | "Oily" | "Combination" | "Sensitive")[];
  texture: "Lightweight Gel" | "Rich Barrier Cream" | "Velvet Night Soufflé" | "Dewy Day Fluid";
  usageTime: "AM" | "PM" | "AM & PM";
  price: number;
  compareAtPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  sizes: string[];
  description: string;
  keyIngredients: string[];
  clinicalResults: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
