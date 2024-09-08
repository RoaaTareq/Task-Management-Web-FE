import React, { useState } from 'react';
import Input from '../../../../Components/Inputs/Input';
import SelectList from '../../../../Components/DropDownList/SelectList'; // Import SelectList for priority
import Button from '../../../../Components/Buttons/Button';
import styles from '../CSS/Task.module.css';

// Extend Task interface to include new fields
interface Task {
  id: number;
  title: string;
  projectName: string;
  content: string;
  priority: string;
  startTime: string;
  endTime: string;
}

interface EditTaskProps {
  task: Task;
  onEditTask: (updatedTask: Task) => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onEditTask }) => {
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [projectName, setProjectName] = useState(task.projectName);
  const [description, setDescription] = useState(task.content);
  const [priority, setPriority] = useState(task.priority);
  const [startTime, setStartTime] = useState(task.startTime);
  const [endTime, setEndTime] = useState(task.endTime);

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const updatedTask = {
      id: task.id,
      title: taskTitle,
      projectName: projectName,
      content: description,
      priority,
      startTime,
      endTime,
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

      <Button label="Save Changes" type="submit" styleType="primary" />
    </form>
  );
};

export default EditTask;
