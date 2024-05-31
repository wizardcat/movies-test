'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();
  const userId = localStorage.getItem('userId');
  const rememberUser = localStorage.getItem('rememberUser');
  useEffect(() => {
    if (userId && rememberUser) {
      router.push('/movies');
    } else {
      router.push('/login');
    }
  }, [userId, router]);

  return null;
};
