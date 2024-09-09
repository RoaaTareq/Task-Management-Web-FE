import React from 'react';
import styles from './Card.module.css'; // Adjust the path as needed

interface CardProps {
  title: string;
  content: string;
  category: string;
  priority: string;
  due_date: string;
  categories?: string[];
  users?: string[];
  priorityClass: string; // New prop to handle the priority color
  onEdit: () => void;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  category,
  priority,
  due_date,
  categories,
  users,
  priorityClass,
  onEdit,
  onDelete
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <p className={styles.cardContent}>{content}</p>
        <p className={styles.cardCategory}>{category}</p>
        <p className={styles.cardDueDate}>Due: {due_date}</p>
        {/* Apply the dynamic priority class */}
        <p className={`${styles.cardPriority} ${priorityClass}`}>{priority}</p>
        <div className={styles.cardActions}>
          <button onClick={onEdit} className={styles.editButton}>Edit</button>
          <button onClick={onDelete} className={styles.deleteButton}>Delete</button>
        </div>
      </div>
    </div>
  );
};


export default Card;
