"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// SuccessPage component
const SuccessPage = () => {
  const router = useRouter();

  // Clear the cart when the user lands on the Success Page
  useEffect(() => {
    localStorage.removeItem("cart"); // Clear the cart from localStorage
    window.dispatchEvent(new Event("storage")); // Notify Navbar to update cart count

    // Redirect to home page after a short delay (for better UX)
    const timer = setTimeout(() => {
      router.push("/"); // Navigate back to home after success
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]); // ✅ Added 'router' to the dependency array

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500 text-white py-8 px-6">
      {/* Success Message */}
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full text-center">
        <div className="flex justify-center mb-6 animate__animated animate__fadeIn">
          <Image
            src="/images/success-icon.svg" // Replace with a success icon/image
            alt="Success"
            width={60}
            height={60}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-violet-600">Thank you for your purchase!</h1>
        <p className="text-lg mb-6">Your payment was successful. We are processing your order.</p>

        {/* Success animation */}
        <div className="animate-pulse">
          <span className="text-xl font-medium">Redirecting you back to the homepage...</span>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/")} // Allow user to manually navigate back if needed
            className="bg-violet-600 hover:bg-violet-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
