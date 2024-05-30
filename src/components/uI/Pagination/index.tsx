"use client";
import { FC, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface IPagination {
  page: number;
  totalPages: number;
  isShown: boolean;
}

// export const Pagination: FC<IPagination> = ({ totalPages, isShown, page }) => {

//   if (search?.length < 1 || !search) {
//     replace(`${pathname}?page=${currentPage}`);
//   }
//   console.log(search, currentPage);

//   function jump(page: string) {
//     if (page) {
//       params.delete("search");
//       params.set("page", page);
//     } else {
//       params.delete("search");
//       params.set("page", "1");
//     }
//     replace(`${pathname}?${params.toString()}`);
//   }

//   let sliceCount = 0;

//   if (true) {
//     sliceCount = 4;
//   }

//   return (
//     <div className="flex sm:gap-4 items-center justify-center space-x-4">
//       {Array.from({ length: totalPages }, (_, i) => i + 1)
//         .slice(currentPage, currentPage + sliceCount)
//         .map((item) => (
//           <button
//             key={item}
//             onClick={() => jump(item.toString())}
//             className={`w-full xs:block xs:m-0 xs:p-1 px-2 py-1 text-sm rounded ${item + 1 === currentPage ? "text-white border-2 border-solid border-transparent bg-blue-500" : "text-blue-500 border-2 border-solid border-blue-400 bg-white"}`}
//           >
//             {item}
//           </button>
//         ))}
//       <button>...</button>
//       <button
//         onClick={() => jump(totalPages.toString())}
//         className={`w-full xs:block xs:m-0 px-2 py-1 text-sm rounded ${totalPages === currentPage ? "text-white border-2 border-solid border-transparent bg-blue-500" : "text-blue-500 border-2 border-solid border-blue-400 bg-white"}`}
//       >
//         {totalPages}
//       </button>
//     </div>
//   );
// };

//import React, { useState, useEffect, useRef } from 'react';

export const Pagination: FC<IPagination> = ({ totalPages, page, isShown }) => {
  const [visibleButtons, setVisibleButtons] = useState(5);
  const paginationRef = useRef(null);

  const [start, setStart] = useState(
    Math.max(page - Math.floor(visibleButtons / 2), 0)
  );
  const [end, setEnd] = useState(Math.min(start + visibleButtons, totalPages));

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const search = params.get("search") || "";
  const currentPage = Number(params.get("page")) || 1;

  function jump(page: string) {
    if (page) {
      params.delete("search");
      params.set("page", page);
    } else {
      params.delete("search");
      params.set("page", "1");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const renderButtons = () => {
    let buttons = [];
    const startN =
      currentPage - Math.floor(visibleButtons / 2) < 1
        ? 1
        : currentPage - Math.floor(visibleButtons / 2);
    let start = Math.max(startN, 0);
    let end = Math.min(start + visibleButtons, totalPages);

    if (start >= totalPages - 5) {
      start = totalPages - 6;
      end = totalPages;
    }

    if (totalPages < 6) {
      start = 0;
      end = totalPages + 6;
    }

    if (isShown) return null;

    if (start > 0) {
      buttons.push(
        <button
          className={`w-full px-2 py-1 text-sm rounded ${1 === currentPage ? "text-white border-2 border-solid border-transparent bg-blue-500" : "text-blue-500 border-2 border-solid border-blue-400 bg-white"}`}
          key="start"
          onClick={() => jump("1")}
        >
          1
        </button>
      );
    }

    for (let i = start; i < end; i++) {
      buttons.push(
        <button
          className={`w-full px-2 py-1 text-sm rounded ${i + 1 === currentPage ? "text-white border-2 border-solid border-transparent bg-blue-500" : "text-blue-500 border-2 border-solid border-blue-400 bg-white"}`}
          key={i}
          style={{ fontWeight: currentPage === i ? "bold" : "normal" }}
          onClick={() => jump((i + 1).toString())}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages) {
      buttons.push(
        <button
          className={`w-full xs:block xs:m-0 xs:p-1 px-2 py-1 text-sm rounded ${totalPages === currentPage + 1 ? "text-white border-2 border-solid border-transparent bg-blue-500" : "text-blue-500 border-2 border-solid border-blue-400 bg-white"}`}
          key="end"
          onClick={() => jump(totalPages.toString())}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div
      className="flex sm:gap-4 items-center justify-center space-x-4"
      ref={paginationRef}
    >
      {renderButtons()}
    </div>
  );
};
