"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSec = () => {
  const router = useRouter();

  const navigateToProducts = () => {
    router.push("/ProductList"); 
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#2A254B] rounded-lg">
      <div className="text-white max-w-lg px-10 py-10 sm:self-center ">
        <h1 className="text-3xl font-bold mb-4">
          The furniture brand for the future, with timeless designs
        </h1>
        <p className="text-base mb-6">
          A new era in eco-friendly furniture with Bazario, the French luxury retail brand with nice fonts, restful colors, and a beautiful way to display things digitally using modern web technologies.
        </p>
        <button
          onClick={navigateToProducts}
          className="px-6 py-2 bg-white text-[#2A254B] rounded-md hover:bg-gray-200 transition"
        >
          View collection
        </button>
      </div>

      <div className="hidden lg:flex w-1/3 ">
        <Image
          src="/images/chair.png"
          alt="Chair"
          width={400}
          height={350}
          className="object-fit rounded"
        />
      </div>
    </section>
  );
};

export default HeroSec;
