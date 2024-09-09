import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Input from '../../../../Components/Inputs/Input'; // Import reusable input
import Button from '../../../../Components/Buttons/Button'; // Import reusable button
import SelectList from '../../../../Components/DropDownList/SelectList'; // Import reusable select list
import styles from '../CSS/Task.module.css';

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
  is_completed: boolean;
}

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
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // State for is_completed

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in.');
      alert('Unauthorized: Please log in.');
      return;
    }

    axios.get('http://127.0.0.1:8000/api/categories', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setAvailableCategories(response.data))
    .catch(error => console.error('Error fetching categories:', error));

    axios
    .get('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Include JWT token
      },
    })
    .then((response) => setAvailableUsers(response.data))
    .catch((error) => console.error('There was an error fetching the users!', error));
}, []);


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const uniqueCategories = Array.from(new Set(categories));
    const uniqueAssignedUsers = Array.from(new Set(assignedUsers));

    const taskData: TaskData = {
      title,
      category: uniqueCategories.join(','),
      content: description,
      priority,
      due_date: dueDate,
      assigned_users: uniqueAssignedUsers,
      is_completed: isCompleted, // Include is_completed in task data
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Unauthorized: Please log in.');
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post('http://127.0.0.1:8000/api/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      onAddTask(response.data);
      resetForm();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    } finally {
      setIsSubmitting(false);
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

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('low');
    setCategories([]);
    setAssignedUsers([]);
    setIsCompleted(false); // Reset is_completed
  };

  return (
    <form onSubmit={handleSubmit} className={styles['Create-form']}>
      {/* Title */}
      <Input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        placeholder="Write Task requirement"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Due Date */}
      <Input
        type="date"
        value={dueDate}
        placeholder="Due Date"
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Priority */}
      <SelectList
        label="Priority"
        value={priority}
        options={[
          { value: 'low', label: 'Low' },
          { value: 'medium', label: 'Medium' },
          { value: 'high', label: 'High' },
        ]}
        onChange={setPriority}
      />

      {/* Categories */}
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

      {/* Assign Users */}
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

      {/* Is Completed */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          Mark as Completed
        </label>
      </div>

      {/* Submit Button */}
      <Button
        label={isSubmitting ? 'Creating...' : 'Create Task'}
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  );
};

export default CreateTask;
