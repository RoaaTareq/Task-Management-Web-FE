import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  content: string;
  category: string;
  priority: string;
  due_date: string;
  categories?: string[];
  users?: string[];
  priorityClass: string;
  onEdit: () => void;
  onDelete: () => void;
  children?: ReactNode; // Add children to the type definition
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
  onDelete,
  children, // Accept children as a prop
}) => {
  return (
    <div className={`card ${priorityClass}`}>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{category}</p>
      <p>{priority}</p>
      <p>{due_date}</p>
      <p>Categories: {categories?.join(', ') || 'None'}</p>
      <p>Assigned Users: {users?.join(', ') || 'None'}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
      {children} {/* Render children here */}
    </div>
  );
};

export default Card;
