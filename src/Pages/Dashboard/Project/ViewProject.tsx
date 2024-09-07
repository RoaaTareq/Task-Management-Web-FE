import React from 'react';
import Card from '../../../Components/Cards/Card'; // Adjust the path as needed
import EditProject from './Modal/EditProject'; // Import the EditProject component

interface ViewProjectProps {
  projects: any[]; // List of projects
  onEdit: (project: any) => void; // Callback function for editing
  onDelete: (id: string) => void; // Callback function for deleting
}

const ViewProject: React.FC<ViewProjectProps> = ({ projects, onEdit, onDelete }) => {
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
                  onEdit={() => onEdit(project)}  // Pass the project to the onEdit callback
                  onDelete={() => onDelete(project.id)}  // Pass the project ID to the onDelete callback
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
