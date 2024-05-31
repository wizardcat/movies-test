import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

interface MovieData {
  title: string;
  publishingYear: number;
  posterFile: File | undefined;
}

interface MovieResponse {
  id: string;
  userId: string;
  title: string;
  publishingYear: number;
  poster: string;
}

const createMovie = async (movieData: Omit<MovieData, 'posterFile'> & { poster: string; userId: string }): Promise<MovieResponse> => {
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

      // Upload the poster image
      const poster = await uploadPoster(movieData.posterFile);

      // Create the movie with the uploaded poster URL
      return createMovie({ ...movieData, poster, userId });
    },
  };

  return useMutation<MovieResponse, Error, MovieData>(mutationOptions);
};

// Helper function to upload poster
const uploadPoster = async (file: File | undefined): Promise<string> => {
	if (!file) return '';
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/v1/images', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data.success) {
    throw new Error('Failed to upload poster');
  }

  return response.data.fileName;
};