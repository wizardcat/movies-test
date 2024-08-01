import { ButtonProps as AntButtonProps } from 'antd/lib/button/button';

export interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  loading?: AntButtonProps['loading'];
}
