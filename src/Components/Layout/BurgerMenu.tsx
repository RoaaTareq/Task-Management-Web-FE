import React, { useState } from 'react';
import styles from './BurgerMenu.module.scss';

interface BurgerMenuProps {
  onMenuToggle?: (open: boolean) => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    if (onMenuToggle) onMenuToggle(newOpenState);
  };

  return (
    <div className={styles.burgerMenu} onClick={handleClick}>
      <div className={`${styles.burgerBar} ${isOpen ? styles.open : ''}`}></div>
      <div className={`${styles.burgerBar} ${isOpen ? styles.open : ''}`}></div>
      <div className={`${styles.burgerBar} ${isOpen ? styles.open : ''}`}></div>
    </div>
  );
};

export default BurgerMenu;
