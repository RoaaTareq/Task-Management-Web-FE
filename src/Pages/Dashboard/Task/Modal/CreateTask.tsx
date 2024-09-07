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
  const [description, setDescription] = useState('');

  // Example options for dropdown lists
  const projectOptions = [
    { value: 'project1', label: 'Project 1' },
    { value: 'project2', label: 'Project 2' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      title: taskTitle,
      projectName,
      content: description,
    };
    onAddTask(formData);
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
