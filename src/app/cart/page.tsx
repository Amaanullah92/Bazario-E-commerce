"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Import Next.js Image component

// Define CartItem type
interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Effect to calculate total when cartItems change
  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  // Function to calculate total amount
  const calculateTotal = (cart: CartItem[]) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error("Error parsing cart data from localStorage", error);
      }
    }
  }, []);

  const updateQuantity = (productName: string, increment: boolean) => {
    setCartItems((prevCartItems) => {
      const updatedCart = prevCartItems.map((item) => {
        if (item.name === productName) {
          const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQuantity <= 0 ? 0 : newQuantity }; // Prevent negative quantity
        }
        return item;
      });

      const filteredCart = updatedCart.filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(filteredCart));

      window.dispatchEvent(new Event("storage"));
      return filteredCart;
    });
  };

  const handleCheckout = async () => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cartItems }), // Send cart items to the backend
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe Checkout
      } else {
        console.error("Error: Stripe URL not returned");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueShopping = () => {
    router.push("/ProductList");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mt-6 px-4 md:px-8 lg:px-16">
        {cartItems.length === 0 ? (
          <div className="text-center p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty.</p>
            <p className="text-gray-600 mb-4">
              It looks like you haven&apos;t added anything to your cart yet.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleContinueShopping}
                className="bg-[#2A254B] text-white px-6 py-2 rounded-lg hover:bg-[#1d1b3a] transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={150} // Adjust image dimensions
                  height={150}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <h2 className="text-md font-semibold text-center">{item.name}</h2>
                <p className="text-gray-700 text-sm">Price: ${item.price}</p>
                <p className="text-gray-700 text-sm mb-4">
                  Total: ${item.price * item.quantity}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.name, false)}
                    className="bg-[#2A254B] text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, true)}
                    className="bg-[#2A254B] text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-6 px-4 md:px-8 lg:px-16 py-4 bg-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-0">Total Amount: ${totalAmount}</h2>
          <button
            onClick={handleCheckout}
            className="bg-[#2A254B] text-white px-6 py-2 rounded-md hover:bg-[#1d1b3a] transition"
            disabled={loading}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
