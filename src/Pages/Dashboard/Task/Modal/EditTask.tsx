import React, { useState } from 'react';
import Input from '../../../../Components/Inputs/Input';
import Button from '../../../../Components/Buttons/Button';
import styles from '../CSS/Task.module.scss';

interface Task {
  id: number;
  title: string;
  projectName: string;
  content: string;
}

interface EditTaskProps {
  task: Task;
  onEditTask: (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [projectName, setProjectName] = useState(task.projectName);
  const [description, setDescription] = useState(task.content);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTask = {
      ...task,
      title: taskTitle,
      projectName: projectName,
      content: description,
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
        value={projectName}
        placeholder="Project Name"
        onChange={(e) => setProjectName(e.target.value)}
      />

      <Input
        type="textarea"
        value={description}
        placeholder="Task Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button label="Save Changes" type="submit" styleType="primary" />
    </form>
  );
};

export default EditTask;
