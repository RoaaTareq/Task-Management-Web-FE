import React, { useState } from 'react';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList'; // Import SelectList for priority
import Button from '../../../../Components/Buttons/Button';
import styles from '../CSS/Task.module.css';

// Task interface with consistent property names
interface Task {
  id: number;
  title: string;
  category: string; // Updated to category
  content: string;
  priority: string;
  due_date: string; // Ensure this matches the interface
}

interface EditTaskProps {
  task: Task;
  onEditTask: (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category); // Changed from projectName to category
  const [description, setDescription] = useState(task.content);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.due_date); // Use initial value from task.due_date

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTask: Task = {
      id: task.id,
      title: taskTitle,
      category, // Updated to category
      content: description,
      priority,
      due_date: dueDate, // Ensure this is the correct property name
    };
    onEditTask(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['Create-form']}>
      <Input
        value={taskTitle}
        placeholder="Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      <Input
        value={category} // Updated to category
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />

      <Input
        type="textarea"
        value={description}
        placeholder="Task Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <SelectList
        options={priorityOptions}
        value={priority}
        onChange={setPriority}
        placeholder="Select Priority"
      />

      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Button label="Save Changes" type="submit" styleType="primary" />
    </form>
  );
};

export default EditTask;
