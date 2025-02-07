"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CanceledPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-red-500 to-pink-500 text-white py-8 px-6">
      {/* Canceled Message */}
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full text-center animate__animated animate__shakeX">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/error-icon.svg"
            alt="Payment Canceled"
            width={60}
            height={60}
          />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-red-600">Payment Canceled</h1>
        <p className="text-lg mb-6">Your payment was not completed. Please try again.</p>

        <div className="animate-pulse">
          <span className="text-xl font-medium">Redirecting you back to the checkout page...</span>
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.push("/checkout")}
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="ml-4 bg-gray-600 hover:bg-gray-700 text-white py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanceledPage;
