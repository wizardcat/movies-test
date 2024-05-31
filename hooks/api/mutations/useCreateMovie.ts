import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

interface MovieData {
  title: string;
  publishingYear: number;
  poster: string;
}

interface MovieResponse {
  id: string;
  userId: string;
  title: string;
  publishingYear: number;
  poster: string;
}

const createMovie = async (movieData: MovieData & { userId: string }): Promise<MovieResponse> => {
  const response = await axios.post('/api/v1/movies', movieData);
  return response.data;
};

export const useCreateMovie = () => {
  const mutationOptions: UseMutationOptions<MovieResponse, Error, MovieData, unknown> = {
    mutationFn: async (movieData: MovieData) => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      return createMovie({ ...movieData, userId });
    },
  };

  return useMutation<MovieResponse, Error, MovieData>(mutationOptions);
};