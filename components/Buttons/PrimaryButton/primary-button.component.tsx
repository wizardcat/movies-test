import { Button } from 'antd';
import styles from './primary-button.module.scss';
import { PrimaryButtonProps } from './primary-button.props';

export const PrimaryButton = ({
  loading = false,
  text = '',
  onClick = () => {},
}: PrimaryButtonProps) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={styles.primaryButton}
      onClick={onClick}
      loading={loading}
      block
    >
      {text}
    </Button>
  );
};
