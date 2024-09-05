import React from 'react';
import styles from './Card.module.scss'; // Import CSS Module styles

// Define the props interface
interface CardProps {
  title: string;
  content: string;
  imageUrl?: string; // Optional image URL
  footer?: React.ReactNode; // Optional footer content
  style?: React.CSSProperties;
  className?: string; // Allow additional custom class names
}

// Card component
const Card: React.FC<CardProps> = ({
  title,
  content,
  imageUrl,
  footer,
  style = {},
  className = '',
}) => {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.cardImage} />}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardContent}>{content}</p>
      </div>
      {footer && <div className={styles.cardFooter}>{footer}</div>}
    </div>
  );
};

export default Card;
