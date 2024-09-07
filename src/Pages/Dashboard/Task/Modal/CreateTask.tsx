import React, { useState, useRef, useEffect } from 'react';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';
import Button from '../../../../Components/Buttons/Button';
import styles from '../CSS/Task.module.scss'; // Import CSS Module styles

interface CreateTaskProps {
  onAddTask: (task: {
    title: string;
    projectName: string;
    content: string;
    priority: string;
    startTime: string;
    endTime: string;
  }) => void;
  onClose: () => void; // Ensure onClose is required
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask, onClose }) => {
  // State management for form fields and visibility
  const [taskTitle, setTaskTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  // Example options for dropdown lists
  const projectOptions = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form fields
    if (!taskTitle || !projectName || !description || !priority || !startTime || !endTime) {
      setError('All fields are required.');
      return;
    }

    setError('');
    const formData = {
      title: taskTitle,
      projectName,
      content: description,
      priority,
      startTime,
      endTime,
    };
    onAddTask(formData);
    onClose(); // Close form after adding task
  };

  // Handle clicks outside the form
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className={styles['Create-task-container']}>
      <form onSubmit={handleSubmit} className={styles['Create-form']} ref={formRef}>
        {error && <p className={styles['error-message']}>{error}</p>}

        <Input
          value={taskTitle}
          placeholder="Task Title"
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <SelectList
          options={projectOptions}
          value={projectName}
          onChange={setProjectName}
          placeholder="Select Project"
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
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <Input
          type="date"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        
        <Button label="Add Task" type="submit" styleType="primary" />
        <Button label="Cancel" type="button" styleType="secondary" onClick={onClose} />
      </form>
    </div>
  );
};

export default CreateTask;
