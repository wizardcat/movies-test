import { Button } from 'antd';
import styles from './secondary-button.module.scss';
import { SecondaryButtonProps } from './secondary-button.props';

export const SecondaryButton = ({ text = '', onClick = () => {} }: SecondaryButtonProps) => {
  return (
    <Button type="default" onClick={onClick} className={styles.secondaryButton} block>
      {text}
    </Button>
  );
};
