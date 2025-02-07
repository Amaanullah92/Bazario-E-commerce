// components/FooterSec.tsx
import Image from "next/image";

export default function FooterSec() {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 px-4">
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-gray-800">
            From a studio to a global brand with over 400 outlets
          </h2>
          <p className="mt-4 text-gray-600">
            When we started Bazario, the idea was simple. Make high-quality
            furniture affordable and available for the mass market.
          </p>
          <p className="mt-2 text-gray-600">
            Handcrafted, and lovingly crafted furniture and homeware are what
            we live, breathe and design. So our Chelsea boutique became the
            hotspot for the interior design community.
          </p>
          <button className="mt-6 bg-[#2A254B] text-white px-6 py-3 rounded-lg hover:bg-[#342f53] transition">
            Get in touch
          </button>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2">
  <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-md overflow-hidden shadow-lg">
  <Image
  src="/images/footer-img.png"
  alt="Footer Image"
  width={600}
  height={400} 
  className="w-full h-auto object-cover rounded-md"
/>

  </div>
</div>
      </div>
    </section>
  );
}
