import React from 'react';
import styles from './Input.module.scss'; // Import CSS Module styles

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number' | 'textarea' | 'date'; // Added 'date'
  value: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string; // Allow additional custom class names
}


const Input: React.FC<InputProps> = ({
  type = 'text',
  value,
  placeholder,
  onChange,
  disabled = false,
  style = {},
  className = '',
}) => {
  const inputClass = `${styles.input} ${type === 'textarea' ? styles['input--textarea'] : ''} ${disabled ? styles['input--disabled'] : ''} ${className}`;

  return type === 'textarea' ? (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      style={style}
      className={inputClass}
    />
  ) : (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      style={style}
      className={inputClass}
    />
  );
};

export default Input;
