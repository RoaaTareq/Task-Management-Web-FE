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
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default MobileNavBar;
