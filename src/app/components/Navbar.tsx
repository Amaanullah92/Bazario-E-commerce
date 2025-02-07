"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Custom Hook to handle cart count updates
const useCartCount = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      setTimeout(() => {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          try {
            const cart = JSON.parse(cartData);
            if (Array.isArray(cart)) {
              setCartCount(cart.length); 
            }
          } catch (error) {
            console.error("Error parsing cart data:", error);
          }
        }
      }, 0); // Executes after the current render cycle
    };
  
    updateCartCount(); // Run immediately when component mounts
  
    // Listen for changes in localStorage
    window.addEventListener("storage", updateCartCount);
  
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);
  

  return cartCount;
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = useCartCount(); // Use custom hook to track cart count

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/ProductList", label: "Products" },
  ];

  return (
    <nav className="bg-gray-50 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#37315a] hover:text-violet-600 transition-colors">
            BAZARIO
          </h1>
        </Link>

        {/* Main Navigation Links (Hidden on mobile) */}
        <ul className="hidden md:flex space-x-20">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-gray-800 hover:text-violet-600 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* 🛒 Cart Icon with Dynamic Badge */}
          <Link href="/cart" title="Cart" className="relative">
            <Image
              src="/images/logo/Shopping--cart.png"
              alt="Cart"
              width={24}
              height={24}
              className="hover:scale-110 transition-transform"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Clerk Authentication */}
          <SignedOut>
            <SignInButton>
              <Image
                src="/images/logo/User--avatar.png"
                alt="Sign in"
                width={24}
                height={24}
                className="hover:scale-110 transition-transform cursor-pointer"
              />
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {/* Hamburger Menu - Visible on smaller screens */}
          <button onClick={toggleMenu} className="md:hidden" title="Menu">
            <Image
              src="/images/logo/Menu.png"
              alt="Menu"
              width={24}
              height={24}
              className="hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* Dropdown Menu - Visible when the menu is open */}
      {isMenuOpen && (
        <div className="md:hidden absolute right-4 top-16 bg-gray-50 shadow-md w-48 p-4 rounded-lg transition-transform transform">
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-800 hover:text-violet-600 transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Show SearchBar inside dropdown on mobile */}
          <div className="mt-4">
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
}