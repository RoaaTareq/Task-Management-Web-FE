import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Define types for Category and TaskData
interface Category {
  id: number;
  name: string;
}

interface TaskData {
  title: string;
  category: string;
  content: string;
  priority: string;
  due_date: string;
  assigned_users: number[];
}

// Define the props for CreateTask component
interface CreateTaskProps {
  onAddTask: (task: TaskData) => void;
  onClose: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('low');
  const [categories, setCategories] = useState<number[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [availableUsers, setAvailableUsers] = useState<{ id: number, name: string }[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Track form submission

  // Fetch categories and users from the backend
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      alert('Unauthorized: Please log in.');
      return;
    }

    // Fetch categories with token included in headers
    axios.get('http://127.0.0.1:8000/api/categories', {
      headers: {
        'Authorization': `Bearer ${token}` // Include JWT token
      }
    })
    .then(response => setAvailableCategories(response.data))
    .catch(error => console.error('There was an error fetching the categories!', error));

    // Fetch users with token included in headers
    axios.get('http://127.0.0.1:8000/api/users', {
      headers: {
        'Authorization': `Bearer ${token}` // Include JWT token
      }
    })
    .then(response => setAvailableUsers(response.data))
    .catch(error => console.error('There was an error fetching the users!', error));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      // Prevent duplicate submissions
      return;
    }

    setIsSubmitting(true); // Set to true to prevent multiple submissions

    const taskData: TaskData = {
      title,
      category: categories.join(','), // Adjust if you need to handle multiple categories
      content: description,
      priority,
      due_date: dueDate,
      assigned_users: assignedUsers,
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: Please log in.');
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/tasks', taskData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // If task creation is successful, pass the task back to the parent component
      onAddTask(response.data);
      onClose();

    } catch (error) {
      console.error(error);
      alert("Error creating task");
    } finally {
      setIsSubmitting(false); // Reset submitting state after the request is complete
    }
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCategories(prevCategories =>
      prevCategories.includes(value)
        ? prevCategories.filter(category => category !== value)
        : [...prevCategories, value]
    );
  };

  const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setAssignedUsers(prevUsers =>
      prevUsers.includes(value)
        ? prevUsers.filter(user => user !== value)
        : [...prevUsers, value]
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div>
        <label>Priority:</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label>Categories:</label>
        {availableCategories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              value={category.id}
              checked={categories.includes(category.id)}
              onChange={handleCategoryChange}
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Assign Users:</label>
        {availableUsers.map((user) => (
          <div key={user.id}>
            <input
              type="checkbox"
              value={user.id}
              checked={assignedUsers.includes(user.id)}
              onChange={handleUserChange}
            />
            <label>{user.name}</label>
          </div>
        ))}
      </div>
      <button type="submit" disabled={isSubmitting}>Create Task</button>
    </form>
  );
};

export default CreateTask;
