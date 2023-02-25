import React from "react";
import { InputWithLabelProps } from "./App";
import styles from './App.module.css';

const InputWithLabel = ({
  id,
  value,
  type = 'text',
  onInputChange,
  isFocused,
  children
}: InputWithLabelProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id} className={styles.label}>{children}</label>
      <input className={styles.input} ref={inputRef} id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
};

export default InputWithLabel;