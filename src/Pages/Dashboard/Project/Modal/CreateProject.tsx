import React, { useState } from 'react';
import styles from '../CSS/Project.module.scss';
import Button from '../../../../Components/Buttons/Button';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';

interface CreateProjectProps {
  addProject: (newProject: { name: string; assignedUsers: string[]; category: string; description: string }) => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ addProject }) => {
  const [name, setName] = useState('');
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newProject = { name, assignedUsers, category, description };
    addProject(newProject);  // Pass new project back to parent
  };

  const userOptions = [
    { value: 'user1', label: 'User 1' },
    { value: 'user2', label: 'User 2' },
    { value: 'user3', label: 'User 3' },
  ];

  const categoryOptions = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles['Create-form']}>
        <Input
          type="text"
          value={name}
          placeholder="Enter project name"
          onChange={(e) => setName(e.target.value)}
        />
        
        <SelectList
          label="Assign Users"
          options={userOptions}
          value={assignedUsers.join(', ')}
          onChange={(value) => setAssignedUsers([value])}
          placeholder="Select users"
        />
        
        <SelectList
          label="Project Category"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          placeholder="Select category"
        />
        
        <Input
          type="textarea"
          value={description}
          placeholder="Enter project description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button label="Add Project" type="submit" styleType="primary" />
        <Button label="Cancel" type="button" styleType="secondary" className="mt-4" />
      </form>
    </div>
  );
};

export default CreateProject;
