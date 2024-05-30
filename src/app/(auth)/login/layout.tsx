"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [auth, setAuth] = useState(false);

  // const router = useRouter();

  // useEffect(() => {
  //   if (window !== undefined) {
  //     const token = localStorage.getItem("token");
  //     if (token !== null && token.length > 1) {
  //       setAuth(false);
  //     } else {
  //       setAuth(true);
  //     }
  //   }
  // }, []);
  // if (!auth) {
  //   router.push("/products");
  //   return null;
  // }

  const [auth, setAuth] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");
      if (token && token.length > 0) {
        router.push("/products");
      } else {
        setAuth(true);
      }
    }
  }, []);

  if (!auth) return null;

  return <section>{children}</section>;
}
