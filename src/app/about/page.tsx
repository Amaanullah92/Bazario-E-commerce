import Image from "next/image";
import Footer from "../components/Footer";
import FooterSec from "../components/FooterSec";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
        
      {/* Hero Section */}
      <section className="bg-[#2A254B] text-white py-16">
        <div className="container mx-auto px-4 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg leading-relaxed">
            Welcome to Bazario, your go-to destination for premium furniture and homeware. From humble beginnings to a global presence, our journey has been fueled by passion, craftsmanship, and the drive to make high-quality design accessible to all.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              At Bazario, our mission is simple: to craft furniture and homeware that are not only aesthetically pleasing but also built to last. We believe that every home deserves a touch of elegance, and we are committed to bringing that dream to life for our customers.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/images/mission.webp"
              alt="Our Mission"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Craftsmanship</h3>
              <p className="text-gray-600">
                Each piece we design is handcrafted with precision and care, ensuring exceptional quality and detail.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We prioritize eco-friendly practices and use sustainable materials to protect our planet.
              </p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Customer-Centric</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do, and we strive to exceed their expectations every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <Image
              src="/images/history.jpg"
              alt="Our History"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="mt-4 text-gray-600">
  What began as a small boutique in Chelsea has grown into a global brand with over 400 outlets. Our journey is a testament to the hard work, dedication, and love of design that drives our team every day.
</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#2A254B] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Join Our Journey</h2>
          <p className="mt-4 text-lg leading-relaxed">
  Whether you&apos;re a long-time customer or discovering Bazario for the first time, we&apos;re thrilled to have you with us.
</p>
          <button className="mt-6 bg-white text-[#2A254B] px-6 py-3 rounded-lg hover:bg-[#b7b2d8] transition">
            <Link href="/ProductList">Explore Now</Link>
          </button>
        </div>
      </section>
      <FooterSec />
      <Footer/>
    </div>
  );
}
