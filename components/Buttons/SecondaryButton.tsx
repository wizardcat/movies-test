import { Button } from "antd"
import styles from "./buttons.module.scss";

export const SecondaryButton = ({ text = "", onClick = () => {} }) => {
  return (
    <Button
      type="default"
      onClick={onClick}
      className={styles.secondaryButton}
      block
    >
      {text}
    </Button>
  )
}