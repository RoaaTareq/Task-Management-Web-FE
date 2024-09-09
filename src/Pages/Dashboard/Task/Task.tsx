import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewTask from './ViewTask';
import CreateTask from './Modal/CreateTask';
import EditTask from './Modal/EditTask';
import styles from './CSS/Task.module.css';
import axios from 'axios';

// Task interface definition
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

// Function to get the auth token
const getAuthToken = () => localStorage.getItem('token');

// API base URL
const API_URL = 'http://127.0.0.1:8000/api';

const TaskList: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const createTaskRef = useRef<HTMLDivElement>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
          const token = getAuthToken();
          console.log('Token used:', token);  // Debugging line
          const { data } = await axios.get(`${API_URL}/tasks`, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          setTasks(data);
      } catch (err) {
          handleError('Failed to fetch tasks.', err);
      }
  };
  
    fetchTasks();
  }, []);

  // Fetch task categories
  const fetchTaskCategories = async (taskId: number) => {
    try {
      const { data } = await axios.get(`${API_URL}/tasks/${taskId}/categories`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return data;
    } catch (err) {
      handleError('Error fetching task categories.', err);
      return [];
    }
  };

  // Fetch users for a task
  const fetchUsersForTask = async (taskId: number) => {
    try {
      const { data } = await axios.get(`${API_URL}/tasks/${taskId}/users`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return data;
    } catch (err) {
      handleError('Error fetching users for task.', err);
      return [];
    }
  };

  // Add a new task
  const handleAddTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const { data } = await axios.post(`${API_URL}/tasks`, newTask, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setTasks((prev) => [...prev, data]);
      setShowCreateTask(false);
    } catch (err) {
      handleError('Failed to add task.', err);
    }
  };

  // Edit an existing task
  const handleEditTask = async (taskId: number, updatedTask: Task) => {
    try {
      const { data } = await axios.put(`${API_URL}/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      const categories = await fetchTaskCategories(taskId);
      const users = await fetchUsersForTask(taskId);
      updateTaskInList(taskId, { ...data, categories, users });
      setEditTaskId(null);
    } catch (err) {
      handleError('Failed to update task.', err, 403, 'Unauthorized: You cannot edit this task.');
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      handleError('Failed to delete task.', err, 403, 'Unauthorized: You cannot delete this task.');
    }
  };

  // Update task in the state list
  const updateTaskInList = (taskId: number, updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? updatedTask : task))
    );
  };

  // Handle task editing
  const handleEditClick = (taskId: number) => setEditTaskId(taskId);

  // Handle closing the create task form
  const handleCloseForm = () => setShowCreateTask(false);

  // Close the form when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (createTaskRef.current && !createTaskRef.current.contains(event.target as Node)) {
      setShowCreateTask(false);
    }
  };

  // Error handling
  const handleError = (
    defaultMessage: string,
    error: any,
    status?: number,
    customMessage?: string
  ) => {
    if (axios.isAxiosError(error) && error.response?.status === status) {
      setError(customMessage || defaultMessage);
    } else {
      setError(defaultMessage);
    }
    console.error(defaultMessage, error);
  };

  // Attach and detach event listeners for clicking outside the form
  useEffect(() => {
    if (showCreateTask) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCreateTask]);

  return (
    <section>
      <div className="container">
        <div className="row align-items-center">
         <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
         <h1>Task</h1>
         
         </div>
         <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12'>
           <Button
            label="Add Task +"
            type="submit"
            styleType="primary"
            onClick={() => setShowCreateTask(true)}
            className={styles.btnOpen}
          /></div>
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
          onDelete={handleDeleteTask}
          setTasks={setTasks}
        />
      </div>
    </section>
  );
};

export default TaskList;
