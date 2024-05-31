'use client';
import { Checkbox, Form, Input as AntdInput } from 'antd/lib';
import { useLogin } from '../../hooks/common/useLogin';
import styles from './login.module.scss';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton';


export default function Login() {
  const { emailRules, passwordRules, handleFinish } = useLogin();
  const rememberUserFromLS = localStorage.getItem("rememberUser") === "true";
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
          <AntdInput
            className="input"
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <AntdInput
            className="input"
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
          <PrimaryButton text={"Log in"} />
        </Form.Item>
      </Form>
    </main>
  );
}