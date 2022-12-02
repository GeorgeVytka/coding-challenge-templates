import styles from "../button/Button.module.css";

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={styles.container} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
