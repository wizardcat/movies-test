import { Button } from "antd"
import styles from "./buttons.module.scss";

export const PrimaryButton = ({ text = "", onClick = () => {} }) => {
  return (
    <Button
      type="primary"
      htmlType="submit"
      className={styles.primaryButton}
      onClick={onClick}
      block
    >
      {text}
    </Button>
  )
}