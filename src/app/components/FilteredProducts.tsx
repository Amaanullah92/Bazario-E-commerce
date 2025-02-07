"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Function to convert string to title case
function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\b(\w)/g, (char) => char.toUpperCase());
}

// Define the Product interface
interface Product {
  name: string;
  slug: string;
  imageUrl: string;
  price: number;
  quantity: number;
  tags: string[];
}

interface FilteredProductsProps {
  tag: string;
}

// Instead of defining a strict QueryParams interface, use Record<string, unknown>
export default function FilteredProducts({ tag }: FilteredProductsProps) {
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);

  // Fetch the products once the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // We are passing { tag } as a dynamic parameter to the query
        const result: Product[] = await client.fetch(
          `*[_type == "product" && $tag in tags]{ 
            name, 
            "slug": slug.current, 
            "imageUrl": image.asset->url, 
            price, 
            quantity, 
            tags 
          }`,
          { tag } as Record<string, unknown> // Use Record<string, unknown> to allow flexible params
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData(); // Call the fetch function on mount
  }, [tag]);

  const navigateToProducts = () => {
    router.push("/ProductList"); // Navigate to ProductList page
  };

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mt-12 mb-8">
        {toTitleCase(tag)} {/* Displaying the tag in title case */}
      </h1>
      <div className="flex flex-wrap justify-evenly mt-10 gap-6">
        {data.map((item) => (
          <Link
            href={`product/${item.slug}`}
            key={item.slug}
            className="shadow-lg rounded-lg p-4 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center w-64"
          >
            {/* Product Image */}
            <div className="w-full h-64 overflow-hidden rounded-md">
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
              {/* Product Name */}
              <h1 className="text-lg font-semibold text-gray-900 hover:text-violet-600 transition">
                {item.name}
              </h1>
              {/* Product Price */}
              <p className="text-gray-600 mt-2">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* View Collection Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={navigateToProducts}
          className="px-8 py-3 bg-[#2A254B] text-white rounded-md hover:bg-[#2A254B] transition-all duration-300 ease-in-out"
        >
          View Collection
        </button>
      </div>
    </div>
  );
}
