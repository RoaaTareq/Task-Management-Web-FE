import React, { useState, useRef, useEffect } from 'react';
import styles from '../CSS/Project.module.css';
import Button from '../../../../Components/Buttons/Button';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList';

interface CreateProjectProps {
  addProject: (newProject: { name: string; assignedUsers: string[]; category: string; description: string }) => void;
  onClose: () => void; // Add an onClose prop to handle closing the form
}

const CreateProject: React.FC<CreateProjectProps> = ({ addProject, onClose }) => {
  const [name, setName] = useState('');
  const [assignedUsers, setAssignedUsers] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose(); // Call the onClose function if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !assignedUsers.length || !category || !description) {
      setError('All fields are required.');
      return;
    }

    // Generate a unique ID for the new project (e.g., using a timestamp)
    const newProject = {
      id: Date.now().toString(), // Replace with your preferred ID generation logic
      name,
      assignedUsers,
      category,
      description,
    };

    addProject(newProject);

    setName('');
    setAssignedUsers([]);
    setCategory('');
    setDescription('');
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
    <div ref={formRef}>
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

        <Button label="Add Project" type="submit" styleType="primary" />
        <Button label="Cancel" type="button" styleType="secondary" className="mt-4" onClick={onClose} />
      </form>
    </div>
  );
};

export default CreateProject;
