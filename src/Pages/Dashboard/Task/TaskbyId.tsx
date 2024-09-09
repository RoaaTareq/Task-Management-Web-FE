import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  content: string;
  priority: string;
  due_date: string;
  category: string;
  categories?: string[];
  users?: string[];
}

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.content}</p>
      <p>Priority: {task.priority}</p>
      <p>Due Date: {task.due_date}</p>
      <p>Category: {task.category}</p>
      <p>Assigned Users: {task.users?.join(', ') || 'None'}</p>
      <p>Categories: {task.categories?.join(', ') || 'None'}</p>
    </div>
  );
};

export default TaskDetail;
