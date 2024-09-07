import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewTask from './ViewTask';
import CreateTask from './Modal/CreateTask';
import styles from './CSS/Task.module.scss'

interface Task {
  title: string;
  projectName: string;
  content: string;
}

const TaskList: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); // Store tasks here
  const createTaskRef = useRef<HTMLDivElement>(null);

  // Toggle form visibility
  const handleAddTaskClick = () => {
    setShowCreateTask(true);
  };

  // Close form when clicked outside
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

  // Function to add new task to the list
  const handleAddTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]); // Add new task to state
    setShowCreateTask(false); // Close the form after adding the task
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Task</h1>
          <Button
            label="Add Task +"
            type="submit"
            styleType="primary"
            onClick={handleAddTaskClick}
            className={styles.btnOpen}
            />    
        </div>

       
        {showCreateTask && (
          <div ref={createTaskRef} className="create-task-form">
            <CreateTask onAddTask={handleAddTask} /> 
          </div>
        )}

       
        <ViewTask tasks={tasks} />
      </div>
    </section>
  );
};

export default TaskList;
