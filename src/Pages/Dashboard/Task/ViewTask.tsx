import React from 'react';
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
}

const ViewTask: React.FC<ViewTaskProps> = ({ tasks, onEdit, onDelete }) => {
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
                  onDelete={() => onDelete(task.id)}
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
