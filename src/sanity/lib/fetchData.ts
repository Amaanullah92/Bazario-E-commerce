import { client } from "@/sanity/lib/client";

export async function getProducts() {
  return await client.fetch(`*[_type == "product"]{
    name,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    price,
    quantity,
    tags,
    category->title
  }`);
}

export async function getCategories() {
  return await client.fetch(`*[_type == "category"]{_id, title}`);
}
