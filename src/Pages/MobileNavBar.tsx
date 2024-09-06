import React, { useState } from 'react';
import BurgerMenu from '../Components/Layout/BurgerMenu';
import styles from './MobileNavBar.module.scss';

const MobileNavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
  };

  return (
    <nav className={styles.mobileNavBar}>
      <BurgerMenu onMenuToggle={handleMenuToggle} />
      {isMenuOpen && (
        <div className={styles.navLinks}>
          <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;
