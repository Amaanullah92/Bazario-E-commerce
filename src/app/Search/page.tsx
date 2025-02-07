"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Footer from "../components/Footer";
import Link from "next/link";
import FooterSec from "../components/FooterSec";

type Product = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side

  useEffect(() => {
    setIsClient(true); // Ensure the component is rendered on the client
  }, []);

  useEffect(() => {
    if (isClient) {
      const name = searchParams.get("name");
      if (name) {
        const fetchResults = async () => {
          setLoading(true);
          try {
            const results = await searchProducts(name);
            setSearchResults(results);
          } catch (error) {
            console.error("Error fetching search results:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchResults();
      }
    }
  }, [searchParams, isClient]);

  const searchProducts = async (searchTerm: string): Promise<Product[]> => {
    const query = `*[_type == "product" && name match $searchTerm] {
      _id,
      name,
      price,
      "imageUrl": image.asset->url, 
      "slug": slug.current, 
    }`;

    const params = { searchTerm: `${searchTerm}*` };

    const results: Product[] = await client.fetch(query, params);
    return results;
  };

  // Return null while the component is not client-side
  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mt-12 mb-8">
          Search Results
        </h1>
        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-xl">Loading...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="flex flex-wrap justify-evenly mt-10 mb-12 gap-6">
            {searchResults.map((result) => (
              <Link
                key={result._id}
                href={`/product/${result.slug}`}
                className="shadow-lg rounded-lg p-4 hover:shadow-xl transition flex flex-col items-center w-64"
              >
                <div className="w-64 h-80 overflow-hidden rounded-md">
                  <Image
                    src={result.imageUrl}
                    alt={result.name}
                    width={256}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-xl font-semibold">{result.name}</h2>
                  <p className="text-gray-700">Price: ${result.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center my-12">
            <p className="text-xl text-gray-600">No results found.</p>
          </div>
        )}
      </main>
      <FooterSec />
      <Footer />
    </div>
  );
};

// Wrap your component in Suspense
export default function SuspendedSearchPage() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchPage />
    </Suspense>
  );
}
