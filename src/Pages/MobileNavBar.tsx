import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
        
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;
