import React, { useState } from 'react';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';
import Button from '../../../../Components/Buttons/Button';

interface CreateTaskProps {
  onAddTask: (task: { title: string; projectName: string; content: string }) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [projectName, setProjectName] = useState('');
  const [content, setContent] = useState('');

  const projectOptions = [
    { value: 'projectA', label: 'Project A' },
    { value: 'projectB', label: 'Project B' },
    // Add more project options if needed
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add task to the list
    onAddTask({ title, projectName, content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      <Input
        type="text"
        value={title}
        placeholder="Task Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <SelectList
        options={projectOptions}
        value={projectName}
        onChange={setProjectName}
        placeholder="Select Project"
      />
      <Input
        type="textarea"
        value={content}
        placeholder="Task Description"
        onChange={(e) => setContent(e.target.value)}
      />
      <Button label="Add Task" type="submit" styleType="primary" />
    </form>
  );
};

export default CreateTask;
