import { useQuery } from '@tanstack/react-query';

const useGetMovies = (limit = 10, page = 1) => {
  const userId = typeof window !== 'undefined' ? localStorage.getItem("userId"): null;
  const queryKey = ['movies', userId, limit, page] as const;
  return useQuery({queryKey: queryKey, queryFn: async () => {
    const response = await fetch(`/api/v1/movies?userId=${userId}&limit=${limit}&page=${page}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    return response.json();
  }});
};

export default useGetMovies;