import React from "react";
import styles from "../form-input/FormInput.module.css";
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className={styles.group}>
      <label className={styles.labelContainer}>{label}</label>
      <input className={styles.formInput} {...otherProps} />
    </div>
  );
};

export default FormInput;
