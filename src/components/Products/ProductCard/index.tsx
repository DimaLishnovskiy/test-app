import React, { FC } from "react";
import { ProductType } from "@/types/products";
import Image from "next/image";
import Link from "next/link";

interface IProductCard {
  product: ProductType;
}

export const ProductCard: FC<IProductCard> = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
      <Link href={`/products/${product.id}`}>
        <Image
          className="w-32 mx-auto h-32 mb-4 object-contain rounded-lg"
          width={167}
          height={167}
          src={product.images[0]}
          alt={product.title}
        />
        <h2 className="mb-2 text-lg md:text-md text-center font-bold text-gray-900">
          {product.title}
        </h2>
        <p className="text-gray-700 overflow-hidden text-center text-ellipsis">
          {product.description}
        </p>
        <span className="mt-2 text-lg font-bold text-gray-900">
          ${product.price}
        </span>
      </Link>
    </div>
  );
};
