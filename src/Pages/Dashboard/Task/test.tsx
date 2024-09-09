import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

// Define types for Category and TaskData
interface Category {
  id: number;
  name: string;
}

interface TaskData {
  title: string;
  category: string; // Updated to category
  content: string;
  priority: string;
  startTime: string;
  endTime: string;
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

  // Fetch categories from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories') // Adjust the endpoint according to your backend setup
      .then(response => {
        setAvailableCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const taskData: TaskData = {
      title,
      category: categories.join(','), // Adjust if you need to handle multiple categories
      content: description,
      priority,
      startTime: dueDate,
      endTime: dueDate,
    };

    try {
      await axios.post('http://127.0.0.1:8000/api/tasks', taskData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token
        }
      });

      onAddTask(taskData); // Notify parent component
      onClose(); // Close the form
    } catch (error) {
      console.error(error);
      alert("Error creating task");
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
      <button type="submit">Create Task</button>
    </form>
  );
};

export default CreateTask;
