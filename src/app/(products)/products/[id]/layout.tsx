"use client";
import { permanentRedirect, redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [auth, setAuth] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (window !== undefined) {
      const token = localStorage.getItem("token");
      if (!token || token.length < 1) {
        router.push("/login");
      } else {
        setAuth(true);
      }
    }
  }, []);

  if (!auth) return null;

  return <section>{children}</section>;
}
