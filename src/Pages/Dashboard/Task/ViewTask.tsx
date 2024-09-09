import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../../Components/Cards/Card';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import styles from './CSS/Task.module.css';

interface Task {
  id: number;
  title: string;
  category: string;
  content: string;
  priority: string;
  due_date: string;
  categories?: string[];
  users?: string[];
}

interface TaskUpdatedEvent {
  task: Task;
}

interface ViewTaskProps {
  tasks: Task[];
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ViewTask: React.FC<ViewTaskProps> = ({ tasks = [], onEdit, onDelete, setTasks }) => {
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDelete = async (taskId: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Unauthorized: Please log in.');
      return;
    }

    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      setSuccessMessage('Task deleted successfully');

      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return styles.priorityLow;
      case 'medium':
        return styles.priorityMedium;
      case 'high':
        return styles.priorityHigh;
      default:
        return '';
    }
  };

  useEffect(() => {
    console.log('Pusher Key:', process.env.REACT_APP_PUSHER_APP_KEY);
  console.log('Pusher Cluster:', process.env.REACT_APP_PUSHER_APP_CLUSTER);
    if (!process.env.REACT_APP_PUSHER_APP_KEY || !process.env.REACT_APP_PUSHER_APP_CLUSTER) {
      console.error('Pusher key or cluster is missing!');
      return;
    }
  
    window.Pusher = Pusher;
  
    const echo = new Echo({
      broadcaster: 'pusher',
      key: '6b8fe1afa1493628c215', // Hardcoded for testing
      cluster: 'ap2', // Hardcoded for testing
      forceTLS: true,
    });
    
  
    const channel = echo.channel('tasks');
    channel.listen('TaskUpdated', (e: TaskUpdatedEvent) => {
      console.log('Task updated:', e.task);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === e.task.id ? e.task : task))
      );
    });
  
    return () => {
      echo.leaveChannel('tasks');
    };
  }, [setTasks]);
  

  const filteredTasks = Array.isArray(tasks)
    ? filterPriority
      ? tasks.filter((task) => task.priority.toLowerCase() === filterPriority.toLowerCase())
      : tasks
    : [];

  return (
    <section>
      <div className="container">
        <div className={styles['filter-container']}>
          <button onClick={() => setFilterPriority(null)} className={styles['filter-button']}>
            All
          </button>
          <button onClick={() => setFilterPriority('low')} className={styles['filter-button']}>
            Low
          </button>
          <button onClick={() => setFilterPriority('medium')} className={styles['filter-button']}>
            Medium
          </button>
          <button onClick={() => setFilterPriority('high')} className={styles['filter-button']}>
            High
          </button>
        </div>

        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        {filteredTasks.length === 0 ? (
          <p className="no-tasks-message">No tasks available</p>
        ) : (
          <div className="row">
            {filteredTasks.map((task) => (
              <div key={task.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                <Card
                  title={task.title}
                  content={task.content}
                  category={task.category}
                  priority={task.priority}
                  due_date={task.due_date}
                  categories={task.categories}
                  users={task.users}
                  priorityClass={getPriorityClass(task.priority)}
                  onEdit={() => onEdit(task.id)}
                  onDelete={() => handleDelete(task.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewTask;
