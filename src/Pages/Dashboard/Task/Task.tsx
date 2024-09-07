// TaskList.tsx
import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewTask from './ViewTask';
import CreateTask from './Modal/CreateTask';
import EditTask from './Modal/EditTask'; // Ensure the correct import path
import styles from './CSS/Task.module.scss';

interface Task {
  id: number;
  title: string;
  projectName: string;
  content: string;
}

const TaskList: React.FC = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const createTaskRef = useRef<HTMLDivElement>(null);

  const handleAddTaskClick = () => {
    setShowCreateTask(true);
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

  const handleAddTask = (task: { title: string; projectName: string; content: string }) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: tasks.length + 1 }]);
    setShowCreateTask(false);
  };
  const handleCloseForm = () => {
    setShowCreateTask(false); // Hide form when cancel or outside click
  };

  const handleEditTask = (taskId: number, updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
    setEditTaskId(null);
  };

  const handleEditClick = (taskId: number) => {
    setEditTaskId(taskId);
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between mt-5">
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

        <ViewTask tasks={tasks} onEdit={handleEditClick} />
      </div>
    </section>
  );
};

export default TaskList;
