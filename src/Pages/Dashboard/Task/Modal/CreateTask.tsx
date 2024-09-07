import React, { useState } from 'react';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';
import Button from '../../../../Components/Buttons/Button';
import styles from '../CSS/Task.module.scss'; // Import CSS Module styles

interface CreateTaskProps {
  onAddTask: (task: { title: string; projectName: string; content: string }) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask }) => {
  // State management for form fields
  const [taskTitle, setTaskTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [assignedUser, setAssignedUser] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  // Example options for dropdown lists
  const projectOptions = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
  ];

  const userOptions = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Form submit logic (e.g., send data to API)
    const formData = {
      taskTitle,
      projectName,
      startDate,
      endDate,
      assignedUser,
      priority,
      description,
    };
    console.log('Form submitted:', formData);

    // You can call `onAddTask` if needed, passing only relevant fields
    onAddTask({ title: taskTitle, projectName, content: description });
  };

  return (
    <form onSubmit={handleSubmit} className={styles['Create-form']}>
      <Input
        value={taskTitle}
        placeholder="Task Title"
        onChange={(e) => setTaskTitle(e.target.value)}
      />

      {/* Project Name Select */}
      <SelectList
        options={projectOptions}
        value={projectName}
        onChange={setProjectName}
        placeholder="Select Project"
      />

      {/* Start Date Input */}
      <Input
        type="date"
        value={startDate}
        placeholder="Start Date"
        onChange={(e) => setStartDate(e.target.value)}
      />

      {/* End Date Input */}
      <Input
        type="date"
        value={endDate}
        placeholder="End Date"
        onChange={(e) => setEndDate(e.target.value)}
      />

      {/* Assign User Select */}
      <SelectList
        options={userOptions}
        value={assignedUser}
        onChange={setAssignedUser}
        placeholder="Assign User"
      />

      {/* Priority Select */}
      <SelectList
        options={priorityOptions}
        value={priority}
        onChange={setPriority}
        placeholder="Select Priority"
      />

      {/* Task Description Input (Textarea) */}
      <Input
        type="textarea"
        value={description}
        placeholder="Task Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <Button label="Add Task" type="submit" styleType="primary" />
    </form>
  );
};

export default CreateTask;
