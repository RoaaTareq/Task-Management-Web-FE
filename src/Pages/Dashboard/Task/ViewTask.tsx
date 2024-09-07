import React from 'react';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed

interface Task {
  title: string;
  projectName: string;
  content: string;
}

interface ViewTaskProps {
  tasks: Task[];
}

const ViewTask: React.FC<ViewTaskProps> = ({ tasks }) => {
  return (
    <section>
      <div className="container">
        <div className="row">
          {tasks.map((task, index) => (
            <div key={index} className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12">
              <Card
                title={task.title}
                content={task.content}
                projectName={task.projectName}
                onEdit={() => console.log(`Edit ${task.title}`)}
                onDelete={() => console.log(`Delete ${task.title}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewTask;
