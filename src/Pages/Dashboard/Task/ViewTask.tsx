import React, { useState } from 'react';
import axios from 'axios';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed
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

interface ViewTaskProps {
  tasks: Task[];
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ViewTask: React.FC<ViewTaskProps> = ({ tasks = [], onEdit, onDelete, setTasks }) => {
  const [filterPriority, setFilterPriority] = useState<string | null>(null); // State for the priority filter
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message

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
      setSuccessMessage('Task deleted successfully'); // Set success message

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  // Function to determine priority class for styling
  const getPriorityClass = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'low':
        return styles.priorityLow; // Green class
      case 'medium':
        return styles.priorityMedium; // Orange class
      case 'high':
        return styles.priorityHigh; // Red class
      default:
        return '';
    }
  };

  // Ensure tasks is an array
  const filteredTasks = Array.isArray(tasks)
    ? filterPriority
      ? tasks.filter((task) => task.priority.toLowerCase() === filterPriority.toLowerCase())
      : tasks
    : [];

  return (
    <section>
      <div className="container">
        {/* Filter Buttons */}
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

        {/* Success Message */}
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
                  priorityClass={getPriorityClass(task.priority)} // Priority-based styling
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
