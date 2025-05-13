"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
      // Aquí puedes usar loginUrl para hacer la petición al backend
      router.push("/ayudaMobile");

    }
  }, [router]);

  return <div>
    Redirecting...
  </div>;
}