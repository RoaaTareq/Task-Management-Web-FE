import React from 'react';
import styles from './Navbar.module.css'; // Import CSS Module styles

// Define the props interface
interface NavbarProps {
  brandName: string;
  links: { href: string; text: string }[]; // Array of links
  logoUrl?: string; // Optional logo URL
  style?: React.CSSProperties;
  className?: string; // Allow additional custom class names
}

// Navbar component
const Navbar: React.FC<NavbarProps> = ({
  brandName,
  links,
  logoUrl,
  style = {},
  className = '',
}) => {
  return (
    <nav className={`${styles.navbar} ${className}`} style={style}>
      {logoUrl && <img src={logoUrl} alt="Logo" className={styles.logo} />}
      <div className={styles.brandName}>{brandName}</div>
      <ul className={styles.navLinks}>
        {links.map((link, index) => (
          <li key={index} className={styles.navItem}>
            <a href={link.href} className={styles.navLink}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
