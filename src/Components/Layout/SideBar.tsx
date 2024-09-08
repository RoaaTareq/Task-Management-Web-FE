import React from 'react';
import styles from './Sidebar.module.css'; // Import CSS Module styles

// Define the props interface
interface SidebarProps {
  items: { href: string; text: string }[]; // Array of sidebar items
  title?: string; // Optional title for the sidebar
  style?: React.CSSProperties;
  className?: string; // Allow additional custom class names
}

// Sidebar component
const Sidebar: React.FC<SidebarProps> = ({
  items,
  title,
  style = {},
  className = '',
}) => {
  return (
    <aside className={`${styles.sidebar} ${className}`} style={style}>
      {title && <h2 className={styles.sidebarTitle}>{title}</h2>}
      <ul className={styles.sidebarItems}>
        {items.map((item, index) => (
          <li key={index} className={styles.sidebarItem}>
            <a href={item.href} className={styles.sidebarLink}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
