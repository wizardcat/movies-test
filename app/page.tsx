'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const rememberUser = localStorage.getItem("rememberUser");
    if (userId && rememberUser) {
      router.push("/movies");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
};
