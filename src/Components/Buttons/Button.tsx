import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleType?: 'primary' | 'secondary'; // Additional prop for button style type
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  styleType = 'primary',
}) => {
  const buttonClass = disabled
    ? styles.disabled
    : styleType === 'secondary'
    ? styles.secondary
    : styles.button;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {label}
    </button>
  );
};

export default Button;
