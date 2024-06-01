import { Button } from "antd"
import styles from "./buttons.module.scss";

export const PrimaryButton = ({ loading = false, text = "", onClick = () => {} }) => {
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
  )
}