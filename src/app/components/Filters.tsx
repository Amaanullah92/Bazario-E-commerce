"use client";

import { useState } from "react";

// Define types
interface Category {
  name: string;
  slug: string;
}

interface FilterOptions {
  category: string;
  minPrice: string;
  maxPrice: string;
}

interface FiltersProps {
  categories: Category[];
  onFilter: (filters: FilterOptions) => void;
}

export default function Filters({ categories, onFilter }: FiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Handle filter changes
  const applyFilters = () => {
    onFilter({ category: selectedCategory, minPrice, maxPrice });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-center gap-4">
      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border rounded-md flex-1"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Price Range Inputs */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded-md flex-1"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded-md flex-1"
      />

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="bg-[#2A254B] text-white px-4 py-2 rounded-md hover:bg-[#2b2070] transition"
      >
        Apply Filters
      </button>
    </div>
  );
}
