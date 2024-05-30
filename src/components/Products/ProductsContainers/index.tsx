import { FC } from "react";
import { ProductType } from "@/types/products";
import { ProductCard } from "../ProductCard";

interface IProductCardContainer {
  products: ProductType[];
}

export const ProductCardContainer: FC<IProductCardContainer> = ({
  products,
}) => {
  return (
    <>
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-96">
          <h2 className="text-2xl font-bold text-gray-600">
            No products found
          </h2>
        </div>
      )}
    </>
  );
};
