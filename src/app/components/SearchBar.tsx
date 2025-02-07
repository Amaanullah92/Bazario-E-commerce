"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/Search?name=${name}`);
    }
  };

  return (
    <form
      className="flex items-center bg-gray-100 rounded-md w-full sm:w-64 md:w-80 px-2 sm:px-3 py-2"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="name"
        placeholder="Search"
        className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
      />
      <button type="submit" className="cursor-pointer">
        <Image
          src="/images/logo/Search.png"
          alt="Search"
          width={20}
          height={20}
          className="hover:scale-110 transition-transform"
        />
      </button>
    </form>
  );
};

export default SearchBar;
