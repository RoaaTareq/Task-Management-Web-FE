import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewTask from './ViewTask';
import CreateTask from './Modal/CreateTask';
import EditTask from './Modal/EditTask'; // Ensure the correct import path
import styles from './CSS/Task.module.css';
import axios from 'axios';

// Define Task type to include category
interface Task {
  id: number;
  title: string;
  category: string;
  content: string;
  priority: string;
  due_date: string;
  categories?: string[]; // Optional: categories for the task
  users?: string[]; // Optional: users assigned to the task
}

const TaskList: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const createTaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks.');
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  const fetchTaskCategories = async (taskId: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/categories`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching task categories:', err);
      return [];
    }
  };

  const fetchUsersForTask = async (taskId: number) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching users for task:', err);
      return [];
    }
  };

  const handleAddTask = async (task: {
    title: string;
    category: string;
    content: string;
    priority: string;
    due_date: string;
  }) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', task, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setShowCreateTask(false);
    } catch (err) {
      setError('Failed to add task.');
      console.error('Error adding task:', err);
    }
  };

  const handleEditTask = async (taskId: number, updatedTask: Task) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}`, updatedTask, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedTaskData = response.data;
      const categories = await fetchTaskCategories(taskId);
      const users = await fetchUsersForTask(taskId);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...updatedTaskData, categories, users } : task))
      );
      setEditTaskId(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError('Unauthorized: You cannot edit this task.');
      } else {
        setError('Failed to update task.');
      }
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 403) {
        setError('Unauthorized: You cannot delete this task.');
      } else {
        setError('Failed to delete task.');
      }
      console.error('Error deleting task:', err);
    }
  };

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
  };

  const handleCloseForm = () => {
    setShowCreateTask(false); // Hide form when cancel or outside click
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (createTaskRef.current && !createTaskRef.current.contains(event.target as Node)) {
      setShowCreateTask(false);
    }
  };

  useEffect(() => {
    if (showCreateTask) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCreateTask]);

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <h1>Task</h1>
          <Button
            label="Add Task +"
            type="submit"
            styleType="primary"
            onClick={() => setShowCreateTask(true)}
            className={styles.btnOpen}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        {showCreateTask && (
          <div ref={createTaskRef} className="create-task-form">
            <CreateTask onAddTask={handleAddTask} onClose={handleCloseForm} />
          </div>
        )}

        {editTaskId !== null && (
          <div className="edit-task-form">
            <EditTask
              task={tasks.find((task) => task.id === editTaskId)!}
              onEditTask={(updatedTask) => handleEditTask(editTaskId, updatedTask)}
            />
          </div>
        )}

        <ViewTask
          tasks={tasks}
          onEdit={handleEditClick}
          onDelete={handleDeleteTask} // Pass onDelete handler
        />
      </div>
    </section>
  );
};

export default TaskList;
