'use client';
import { Checkbox, Form, Input } from 'antd/lib';
import { useEffect, useState } from 'react';
import { useLogin } from '../../hooks/common/useLogin';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import styles from './login.module.scss';


export default function Login() {
  const { emailRules, passwordRules, handleFinish, mutation } = useLogin();
  const rememberUserFromLS = typeof window !== 'undefined' ? localStorage.getItem("rememberUser") === "true" : false;
  const [rememberUser, setRememberUser] = useState<boolean>(rememberUserFromLS || false);
  useEffect(() => {
    localStorage.setItem("rememberUser", String(rememberUser))
  }, [rememberUser])
  return (
    <main className={styles.loginWrapper}>
      <h1>Sign in</h1>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={handleFinish}
      >
        <Form.Item name="email" rules={emailRules}>
          <Input
            className="antd-input"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <Input
            className="antd-input"
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item className={styles.checkbox}>
          <Checkbox 
            checked={rememberUser}
            onChange={() => setRememberUser(v => !v)}
          >
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <PrimaryButton text={"Log in"} loading={mutation.isPending} />
        </Form.Item>
      </Form>
    </main>
  );
}