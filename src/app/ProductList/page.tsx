"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import FooterSec from "../components/FooterSec";
import Filters from "../components/Filters";

// Define Types
interface Product {
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity: number;
  tags?: string[];
  category?: { name: string };
}

interface Category {
  name: string;
  slug: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const data: Product[] = await client.fetch(`*[_type == "product"]{
        name,
        "slug": slug.current,
        "imageUrl": image.asset->url,
        price,
        quantity,
        tags,
        category-> { name }
      }`);
      setProducts(data);
      setFilteredProducts(data);
    }

    async function fetchCategories() {
      const categoriesData: Category[] = await client.fetch(`*[_type == "category"]{
        name,
        "slug": slug.current
      }`);
      setCategories(categoriesData);
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const handleFilter = ({ category, minPrice, maxPrice }: { category?: string; minPrice?: string; maxPrice?: string }) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter((product) => product.category?.name === category);
    }

    if (minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(maxPrice));
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mt-12 mb-8">
        Our Products
      </h1>

      {/* Filters Section */}
      <div className="container mx-auto px-4">
        <Filters categories={categories} onFilter={handleFilter} />
      </div>

      {/* Products Grid */}
      <div className="flex flex-wrap justify-evenly mt-10 mb-12 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <Link
              href={`product/${item.slug}`}
              key={item.slug}
              className="shadow-lg rounded-lg p-4 hover:shadow-xl transition flex flex-col items-center w-64"
            >
              {/* Product Image */}
              <div className="w-64 h-80 overflow-hidden rounded-md">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={256}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="text-center mt-4">
                <h1 className="text-lg font-semibold text-gray-900 hover:text-violet-600 transition">
                  {item.name}
                </h1>
                <p className="text-gray-600 mt-2">${item.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No products found.</p>
        )}
      </div>

      <FooterSec />
      <Footer />
    </div>
  );
}
