import useGetMovies from '@/hooks/api/queries/useGetMovies';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLogin } from '../Login/use-login.hook';

export const useMovies = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const { data, isPending } = useGetMovies(10, currentPage);
  const { logout } = useLogin();
  const movies = data?.movies;
  const setNextPage = () => setCurrentPage((p) => p + 1);
  const setPrevPage = () => setCurrentPage((p) => p - 1);

  const handleMovieClick = (id?: string) => {
    router.push(`/movie${id ? `/${id}` : ''}`);
  };

  return {
    data,
    movies,
    isPending,
    setNextPage,
    setPrevPage,
    logout,
    currentPage,
    setCurrentPage,
    handleMovieClick,
  };
};
