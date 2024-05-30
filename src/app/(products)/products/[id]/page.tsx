import React, { Suspense } from "react";
import Image from "next/image";
import { getOneProduct } from "@/services/getOneProduct";
import Link from "next/link";

export default async function Product({
  params: { id },
}: {
  params: { id: number };
}) {
  const product = await getOneProduct(id);

  return (
    <Suspense
      fallback={
        <div
          style={{
            color: "white",
          }}
        >
          loading
        </div>
      }
    >
      <div className="container mx-auto p-4">
        <Link
          className="bg-gray-400 inline-block text-white px-4 rounded-sm py-2 mb-8 hover:bg-gray-500"
          href="/"
        >
          Products List page
        </Link>
        <h1 className="text-3xl lg:text-2xl xss:text-md xss:truncate xss:overflow-hidden md:text-xl font-bold mb-4">
          {product.title}
        </h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={product.images[0]}
              alt={product.title}
              width={350}
              height={350}
              className="object-cover overflow-hidden rounded"
            />
          </div>
          <div className="md:w-1/2 md:pl-4">
            <p className="text-xl text-gray-700 mb-2">${product.price}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-4">Rating: {product.rating}</p>
            <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
