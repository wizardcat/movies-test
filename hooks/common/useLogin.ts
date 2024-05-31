'use client'
import { message } from 'antd/lib';
import { Rule } from 'antd/lib/form';
import { useRouter } from 'next/navigation';
import { LoginCredentials } from '../../components/Login/login.type';
import { useAuth } from '../api/mutations/useAuth';

const emailRules: Rule[] = [
  { required: true, message: 'Please input your Email!' },
  { type: 'email', message: 'Please enter a valid email address' },
];

const validatePassword = (_: any, value: string) => {
  if (value?.length < 6) {
    return Promise.reject('Password must be at least 6 characters long');
  }
  return Promise.resolve();
};

const passwordRules: Rule[] = [
  { required: true, message: 'Please input your Password!' },
  { validator: validatePassword },
];

export const useLogin = () => {
  const router = useRouter();
  const mutation = useAuth();

  const logout = () => {
    const rememberUser = localStorage.getItem("rememberUser");
    if (!rememberUser) {
      localStorage.removeItem("userId");
    }
    router.push('/login');
  };

  const handleFinish = async (data: LoginCredentials) => {
    mutation.mutate(data, {
      onSuccess(data) {
        localStorage.setItem("userId", data.id);      
        router.push('/movies');
      },
      onError() {
        return message.error('Login failed. Please check your credentials.');
      }
    });
    
  };

  return {
    emailRules,
    passwordRules,
    handleFinish,
    logout,
    message,
    mutation,
  };
};