'use client';
import { Checkbox, Form, Input } from 'antd/lib';
import { PrimaryButton } from '../Buttons/PrimaryButton/primary-button.component';
import styles from './login.module.scss';
import { useLogin } from './use-login.hook';

export const Login = () => {
  const {
    emailRules,
    passwordRules,
    handleFinish,
    mutation,
    rememberUser,
    handleRememberUserChange,
  } = useLogin();

  return (
    <main className={styles.loginWrapper}>
      <h1>Sign in</h1>
      <Form name="normal_login" initialValues={{ remember: true }} onFinish={handleFinish}>
        <Form.Item name="email" rules={emailRules}>
          <Input className="antd-input" placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={passwordRules}>
          <Input className="antd-input" type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item className={styles.checkbox}>
          <Checkbox checked={rememberUser} onChange={handleRememberUserChange}>
            Remember me
          </Checkbox>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <PrimaryButton text={'Log in'} loading={mutation.isPending} />
        </Form.Item>
      </Form>
    </main>
  );
};
