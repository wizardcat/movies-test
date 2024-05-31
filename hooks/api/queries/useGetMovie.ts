import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';

interface MovieResponse {
  id: string;
  userId: string;
  title: string;
  publishingYear: number;
  poster: string;
}

const fetchMovieById = async (id: string | undefined): Promise<MovieResponse> => {
  const response = await axios.get(`/api/v1/movies/${id}`);
  return response.data;
};

export const useGetMovie = (id: string | undefined, options?: UseQueryOptions<MovieResponse, Error>) => {
  return useQuery({
    queryKey: ['movieById', id], 
    queryFn: async () => fetchMovieById(id),
    enabled: !!id,
    ...options
    });
};