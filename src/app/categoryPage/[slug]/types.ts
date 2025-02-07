// src/app/categoryPage/[slug]/types.ts

// Define the Product type
export interface Product {
    _id: string;
    name: string;
    price: number;
    slug: { current: string };
    imageUrl: string;
  }
  
  // Define the Category type
  export interface Category {
    _id: string;
    name: string;
    products: Product[];
  }
  