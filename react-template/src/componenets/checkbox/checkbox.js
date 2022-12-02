import React from "react";
import styles from "../checkbox/checkbox.module.css";
const Checkbox = ({ label, ...otherProps }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.CheckboxStyle}>
        <input {...otherProps} />
      </div>{" "}
      {label}
    </div>
  );
};

export default Checkbox;

// <input type="checkbox" id="topping" name="topping" value="Paneer" />
