import React from 'react';

interface CardProps {
  title: string;
  content: string;
  category: string;
  priority: string;
  due_date: string;
  categories?: string[];
  users?: string[];
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
  onEdit,
  onDelete
}) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Category: {category}</p>
      <p>Priority: {priority}</p>
      <p>Due Date: {due_date}</p>
      {categories && (
        <div>
          <h4>Categories:</h4>
          <ul>
            {categories.map((cat, index) => (
              <li key={index}>{cat}</li>
            ))}
          </ul>
        </div>
      )}
      {users && (
        <div>
          <h4>Assigned Users:</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Card;
