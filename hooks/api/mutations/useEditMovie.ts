import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

interface MovieData {
  id: string;
  title?: string;
  publishingYear?: number;
  posterFile?: File | undefined;
}

interface MovieResponse {
  id: string;
  userId: string;
  title: string;
  publishingYear: number;
  poster: string;
}

const updateMovie = async (id: string, movieData: Omit<MovieData, 'posterFile'> & { poster: string }): Promise<MovieResponse> => {
  const response = await axios.patch(`/api/v1/movies/${id}`, movieData);
  return response.data;
};

export const useEditMovie = () => {
  const mutationOptions: UseMutationOptions<MovieResponse, Error, MovieData, unknown> = {
    mutationFn: async (movieData: MovieData) => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in local storage');
      }

      // Upload the poster image if exists
      let poster = '';
      if (movieData.posterFile) {
        poster = await uploadPoster(movieData.posterFile);
      }

      // Update the movie with the new data and poster URL if available
      return updateMovie(movieData.id, { ...movieData, poster });
    },
  };

  return useMutation<MovieResponse, Error, MovieData>(mutationOptions);
};

// Helper function to upload poster
const uploadPoster = async (file: File): Promise<string> => {
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
