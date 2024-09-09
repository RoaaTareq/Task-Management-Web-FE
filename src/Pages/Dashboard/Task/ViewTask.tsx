import React from 'react';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed

interface Task {
  id: number;
  title: string;
  category: string; // Updated to category
  content: string;
}

interface ViewTaskProps {
  tasks: Task[];
  onEdit: (taskId: number) => void;
}

const ViewTask: React.FC<ViewTaskProps> = ({ tasks, onEdit }) => {
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
                  category={task.category} // Updated to category
                  onEdit={() => onEdit(task.id)}
                  onDelete={() => console.log(`Delete ${task.title}`)}
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
