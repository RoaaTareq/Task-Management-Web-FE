import React from 'react';
import styles from './Footer.module.css'; // Import CSS Module styles

// Define the props interface
interface FooterProps {
  text: string;
  links?: { href: string; text: string }[]; // Optional array of footer links
  style?: React.CSSProperties;
  className?: string; // Allow additional custom class names
}

// Footer component
const Footer: React.FC<FooterProps> = ({
  text,
  links = [],
  style = {},
  className = '',
}) => {
  return (
    <footer className={`${styles.footer} ${className}`} style={style}>
      <p className={styles.footerText}>{text}</p>
      {links.length > 0 && (
        <ul className={styles.footerLinks}>
          {links.map((link, index) => (
            <li key={index} className={styles.footerItem}>
              <a href={link.href} className={styles.footerLink}>
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </footer>
  );
};

export default Footer;
