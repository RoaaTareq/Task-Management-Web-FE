import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TaskList from './Task/Task';
import UserList from './User/UserList';
import ProjectList from './Project/ProjectList';

const Dashboard: React.FC = () => {
  return (
    <section>
      <div className="container">
      
        <div>
          <Routes>
            <Route path="/task" element={<TaskList />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/project" element={<ProjectList />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
