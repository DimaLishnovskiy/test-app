import { ProductCardContainer } from "@components/Products/ProductsContainers";
import { getProducts } from "@services/getProducts";
import { Suspense, useEffect } from "react";
import { SearchBar } from "@components/SearcBar";
import { Pagination } from "@/components/uI/Pagination";
// import { useSearchParams } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search || "";
  const { products, total } = await getProducts({
    search: search,
    limit: 12,
    skip: 0,
    page: currentPage,
  });

  return (
    <div className="container mx-auto p-4 pb-15">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <SearchBar />
      <Suspense
        key={currentPage}
        fallback={<div style={{ color: "white" }}>loading</div>}
      >
        <ProductCardContainer products={products} />
      </Suspense>
      <div className={"flex w-full mt-6 justify-center gap-4"}>
        <Pagination
          isShown={products.length === 0}
          page={currentPage}
          totalPages={Math.ceil(total / 12)}
        />
      </div>
    </div>
  );
}
