import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import axios from 'axios';

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  id: string;
  email: string;
}

const authenticateUser = async (credentials: AuthCredentials): Promise<AuthResponse> => {
  const response = await axios.post('/api/v1/auth/sign-in-or-up', credentials);
  return response.data;
};

export const useAuth = () => {
  const mutationOptions: UseMutationOptions<AuthResponse, Error, AuthCredentials, unknown> = {
    mutationFn: authenticateUser,
  };

  return useMutation<AuthResponse, Error, AuthCredentials>(mutationOptions);
};
