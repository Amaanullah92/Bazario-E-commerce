"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Footer from "@/app/components/Footer";

// Interfaces for Product and Category
interface Product {
  _id: string;
  name: string;
  price: number;
  slug: { current: string };
  imageUrl: string;
}

interface Category {
  _id: string;
  name: string;
  products: Product[];
}

export default function CategoryPage() {
  const params = useParams(); // ✅ Get dynamic params
  const slug = params?.slug as string; // ✅ Ensure slug is a string
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      if (!slug) return; // ✅ Prevent fetch if slug is undefined

      try {
        const data = await client.fetch<Category>(
          `*[_type == "category" && slug.current == $slug][0] {
            _id,
            name,
            "products": *[_type == "product" && references(^._id)] {
              _id,
              name,
              price,
              slug,
              "imageUrl": image.asset->url
            }
          }`,
          { slug }
        );

        console.log("✅ Category Data:", data);
        setCategory(data);
      } catch (error) {
        console.error("❌ Error fetching category:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategory();
  }, [slug]); // ✅ Fetch category when `slug` changes

  if (loading) return <div className="container mx-auto py-8 text-center">Loading...</div>;
  if (!category) return <div className="container mx-auto py-8 text-center">Category not found!</div>;

  return (
    <div>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mt-8 mb-8">
          {category.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {category.products.map((product) => (
            <Link
              href={`/product/${product.slug.current}`}
              key={product._id}
              className="group shadow-lg rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <div className="aspect-square w-full relative overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-opacity group-hover:opacity-90"
                />
              </div>
              <div className="pt-4 text-center">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">${product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer /> {/* ✅ Footer included */}
    </div>
  );
}
