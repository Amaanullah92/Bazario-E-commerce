"use client";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await client.fetch(
          `*[_type == "category"]{
            name,
            "slug": slug.current,
          }`
        );
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to fetch categories.");
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <section className="py-12 bg-[#2A254B]">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center xl:flex xl:items-center xl:justify-between xl:text-left">
            <div className="xl:flex xl:items-center xl:justify-start">
              <h1 className="text-2xl font-bold text-white">BAZARIO</h1>
              <p className="mt-5 text-sm text-white xl:ml-6 xl:mt-0">
                © Copyright 2025 Bazario
              </p>
            </div>

            <div className="items-center mt-8 xl:mt-0 xl:flex xl:justify-end xl:space-x-8">
              {/* Categories Section */}
              {error ? (
                <p className="text-white">{error}</p>
              ) : (
                <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 xl:justify-end">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/categoryPage/${category.slug}`}
                        className="text-sm text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <div className="w-full h-px mt-8 mb-5 xl:w-px xl:m-0 xl:h-6 bg-gray-50/20"></div>

              <ul className="flex items-center justify-center space-x-8 xl:justify-end">
                <li>
                  <Link
                    href="https://www.linkedin.com/in/muhammad-amaanullah-4908682b8/"
                    title="LinkedIn"
                    className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452H16.74V14.82c0-1.344-.024-3.072-1.872-3.072-1.872 0-2.158 1.462-2.158 2.974v5.73h-3.704V9.726h3.556v1.471h.051c.497-.94 1.709-1.93 3.522-1.93 3.768 0 4.463 2.481 4.463 5.706v5.478zM7.337 8.254c-1.194 0-2.164-.971-2.164-2.164 0-1.193.97-2.164 2.164-2.164 1.193 0 2.164.971 2.164 2.164 0 1.193-.971 2.164-2.164 2.164zM9.063 20.452H5.611V9.726h3.452v10.726zM22.225 0H1.771C.792 0 0 .775 0 1.729v20.543C0 23.225.792 24 1.771 24h20.451C23.204 24 24 23.225 24 22.272V1.729C24 .775 23.204 0 22.225 0z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/Amaanullah92"
                    title="GitHub"
                    className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 .297C5.374.297 0 5.67 0 12.297c0 5.287 3.438 9.757 8.207 11.349.599.113.793-.26.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.613-4.042-1.613-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.73.083-.73 1.205.084 1.839 1.236 1.839 1.236 1.07 1.835 2.809 1.305 3.495.997.107-.776.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.93 0-1.31.469-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.486 11.486 0 0 1 3.003-.404c1.018.005 2.042.137 3.003.404 2.291-1.554 3.297-1.23 3.297-1.23.655 1.653.243 2.874.119 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.624-5.479 5.921.43.369.824 1.096.824 2.21 0 1.597-.014 2.884-.014 3.276 0 .32.192.694.8.577C20.565 22.052 24 17.584 24 12.297 24 5.67 18.627.297 12 .297z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.facebook.com/M.Aman.Ullah.945"
                    title="Facebook"
                    className="block text-white transition-all duration-200 hover:text-opacity-80 focus:text-opacity-80"
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.689v-3.622h3.131V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.243h-1.917c-1.505 0-1.796.715-1.796 1.763v2.311h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.322-.593 1.322-1.325V1.325C24 .593 23.407 0 22.675 0z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
