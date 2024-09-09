import React from 'react';
import axios from 'axios';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed

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

const ViewTask: React.FC<ViewTaskProps> = ({ tasks, onEdit, onDelete, setTasks }) => {

  const handleDelete = async (taskId: number) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert('Unauthorized: Please log in.');
      return;
    }

    try {
      // Make DELETE request to the API
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove the deleted task from the state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      alert('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task.');
    }
  };

  return (
    <section>
      <div className="container">
        {tasks.length === 0 ? (
          <p className="no-tasks-message">No tasks available</p>
        ) : (
          <div className="row">
            {tasks.map((task) => (
              <div key={task.id} className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
                <Card
                  title={task.title}
                  content={task.content}
                  category={task.category}
                  priority={task.priority}
                  due_date={task.due_date}
                  categories={task.categories} // Pass categories to Card
                  users={task.users} // Pass users to Card
                  onEdit={() => onEdit(task.id)}
                  onDelete={() => handleDelete(task.id)} // Trigger direct delete
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
