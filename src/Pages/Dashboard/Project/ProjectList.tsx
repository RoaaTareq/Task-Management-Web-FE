import React, { useState } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewProject from './ViewProject';
import CreateProject from './Modal/CreateProject';

interface Project {
  name: string;
  assignedUsers: string[];
  category: string;
  description: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);  // Manage the list of projects
  const [showCreateProject, setShowCreateProject] = useState(false);

  const handleAddTaskClick = () => {
    setShowCreateProject(true);
  };

  // Function to add a new project
  const addProject = (newProject: Project) => {
    setProjects([...projects, newProject]);
    setShowCreateProject(false);  // Hide the create project form after submission
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between">
          <h1>Task</h1>
          <Button
            label="Add Task +"
            type="button"
            styleType="primary"
            onClick={handleAddTaskClick}
          />
        </div>
        {showCreateProject ? (
          <CreateProject addProject={addProject} />  
        ) : (
          <ViewProject projects={projects} />  
        )}
      </div>
    </section>
  );
};

export default ProjectList;
