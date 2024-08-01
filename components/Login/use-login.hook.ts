import { useAuth } from '@/hooks/api/mutations/useAuth';
import { message } from 'antd';
import { Rule } from 'antd/lib/form';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LoginCredentials } from './login.type';

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

  const rememberUserFromLS =
    typeof window !== 'undefined' ? localStorage.getItem('rememberUser') === 'true' : false;
  const [rememberUser, setRememberUser] = useState<boolean>(rememberUserFromLS || false);

  useEffect(() => {
    localStorage.setItem('rememberUser', String(rememberUser));
  }, [rememberUser]);

  const handleRememberUserChange = () => {
    setRememberUser((v) => !v);
  };

  const logout = () => {
    const rememberUser = localStorage.getItem('rememberUser');
    if (!rememberUser) {
      localStorage.removeItem('userId');
    }
    router.push('/login');
  };

  const handleFinish = async (data: LoginCredentials) => {
    mutation.mutate(data, {
      onSuccess(data) {
        localStorage.setItem('userId', data.id);
        router.push('/movies');
      },
      onError() {
        return message.error('Login failed. Please check your credentials.');
      },
    });
  };

  return {
    emailRules,
    passwordRules,
    handleFinish,
    mutation,
    rememberUser,
    handleRememberUserChange,
    logout,
  };
};
