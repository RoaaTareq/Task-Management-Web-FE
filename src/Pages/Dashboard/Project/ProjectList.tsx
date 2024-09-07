import React, { useState } from 'react';
import Button from '../../../Components/Buttons/Button';
import ViewProject from './ViewProject';
import EditProject from './Modal/EditProject';
import CreateProject from './Modal/CreateProject';
import styles from './CSS/Project.module.scss'

interface Project {
  id: string;
  name: string;
  assignedUsers: string[];
  category: string;
  description: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleAddTaskClick = () => {
    setShowCreateProject(true);
  };

  const addProject = (newProject: { name: string; assignedUsers: string[]; category: string; description: string }) => {
    // Generate a unique ID for the new project
    const projectWithId = {
      id: Date.now().toString(), // Replace with your preferred ID generation logic
      ...newProject,
    };
    setProjects([...projects, projectWithId]);
    setShowCreateProject(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map(project =>
      project.id === updatedProject.id ? updatedProject : project
    ));
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <section>
      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <h1>Project</h1>
          <Button
            label="Add Project +"
            type="button"
            styleType="primary"
            className={styles.btnOpen}
            onClick={handleAddTaskClick}
          />
        </div>
        {showCreateProject ? (
          <CreateProject addProject={addProject} />
        ) : editingProject ? (
          <EditProject addProject={updateProject} project={editingProject} />
        ) : (
          <ViewProject
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
      </div>
    </section>
  );
};

export default ProjectList;
