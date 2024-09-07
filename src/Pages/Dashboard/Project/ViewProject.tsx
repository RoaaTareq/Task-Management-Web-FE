import React from 'react';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed

interface ViewProjectProps {
  projects: any[]; // List of projects
}

const handleEdit = () => {
  console.log('Edit clicked');
};

const handleDelete = () => {
  console.log('Delete clicked');
};

const ViewProject: React.FC<ViewProjectProps> = ({ projects }) => {
  return (
    <section>
      <div className="container">
        {projects.length === 0 ? (  // Check if there are no projects
          <p>No projects available</p>  // Display this message if projects array is empty
        ) : (
          <div className="row">
            {projects.map((project, index) => (
              <div
                key={index}
                className="col-xl-3 col-lg-3 col-md-4 col-sm-12 col-xs-12"
              >
                <Card
                  title={project.name}
                  content={project.description}
                  projectName={project.category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ViewProject;
