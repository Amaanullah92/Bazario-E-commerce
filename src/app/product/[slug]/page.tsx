"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source).url();
}

interface Product {
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  tags: string[];
  description: string;
  features: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
}

interface Params {
  slug: string;
}

interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function ProductPage({ params }: { params: Promise<Params> }) {
  const resolvedParams = use(params); // ✅ Unwrap `params` using `use()`
  const { slug } = resolvedParams;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const query = `*[_type == "product" && slug.current == $slug][0]{
        name,
        "imageUrl": image.asset->url,
        price,
        quantity,
        tags,
        description,
        features,
        dimensions
      }`;

      const result = await client.fetch(query, { slug });
      setProduct(result);
    };

    fetchProduct();
  }, [slug]);
  
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Function to add product to cart
  const addToCart = () => {
    if (!product) return;

    let cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    if (!Array.isArray(cart)) {
      cart = Object.values(cart);
    }

    const existingItem = cart.find((item: CartItem) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: product.name,
        image: product.imageUrl,
        price: product.price,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));

    toast.success(
      <div>
        Added to cart!
        <button
          onClick={() => router.push("/cart")}
          className="bg-[#2A254B] text-white px-3 py-1 rounded ml-7"
        >
          View Cart
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={urlFor(product.imageUrl)}
            alt={product.name}
            width={800}
            height={800}
            className="object-cover w-full h-full rounded-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-600 my-2">{product.description}</p>
          <p className="text-2xl font-semibold text-[#2A254B] my-4">${product.price}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 my-4">
            {product.tags.map((tag, index) => (
              <span key={index} className="bg-[#2A254B] text-[#d4ceff] text-sm px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Features */}
          <ul className="list-disc pl-5 my-4">
            {product.features.map((feature, index) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>

          {/* Dimensions */}
          {product.dimensions && (
            <div className="my-4">
              <h3 className="font-bold">Dimensions:</h3>
              <p className="text-gray-700">
                Height: {product.dimensions.height}, Width: {product.dimensions.width}, Depth: {product.dimensions.depth}
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 my-6">
            <button onClick={decreaseQuantity} className="bg-gray-200 px-4 py-2 rounded-md text-lg font-bold">
              -
            </button>
            <span className="text-lg font-semibold">{quantity}</span>
            <button onClick={increaseQuantity} className="bg-gray-200 px-4 py-2 rounded-md text-lg font-bold">
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="bg-[#2A254B] text-white px-6 py-3 rounded-md hover:bg-[#3a3364] transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
