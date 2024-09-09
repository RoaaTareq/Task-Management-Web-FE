import React from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  styleType?: 'primary' | 'secondary'; // Additional prop for button style type
  className?: string; // Add this line to allow passing a className prop
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  styleType = 'primary',
  className, // Accept className as a prop
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
      className={`${buttonClass} ${className ? className : ''}`} // Merge internal styles with passed className
    >
      {label}
    </button>
  );
};

export default Button;
