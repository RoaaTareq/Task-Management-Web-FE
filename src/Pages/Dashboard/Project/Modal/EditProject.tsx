import React, { useState, useEffect } from 'react';
import styles from '../CSS/Project.module.scss';
import Button from '../../../../Components/Buttons/Button';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';

interface EditProjectProps {
  addProject: (updatedProject: { id: string; name: string; assignedUsers: string[]; category: string; description: string }) => void;
  project: { id: string; name: string; assignedUsers: string[]; category: string; description: string };
}

const EditProject: React.FC<EditProjectProps> = ({ addProject, project }) => {
  const [name, setName] = useState(project.name);
  const [assignedUsers, setAssignedUsers] = useState<string[]>(project.assignedUsers);
  const [category, setCategory] = useState(project.category);
  const [description, setDescription] = useState(project.description);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setName(project.name);
    setAssignedUsers(project.assignedUsers);
    setCategory(project.category);
    setDescription(project.description);
  }, [project]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !assignedUsers.length || !category || !description) {
      setError('All fields are required.');
      return;
    }

    const updatedProject = { id: project.id, name, assignedUsers, category, description };
    addProject(updatedProject);

    setError(null);
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
        {error && <p className={styles['error-message']}>{error}</p>}

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

        <Button label="Update Project" type="submit" styleType="primary" />
        <Button label="Cancel" type="button" styleType="secondary" className="mt-4" />
      </form>
    </div>
  );
};

export default EditProject;
