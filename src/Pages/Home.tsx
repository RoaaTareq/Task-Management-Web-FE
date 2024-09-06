import React from 'react';
import UserList from './Dashboard/User/UserList';
import ProjectList from './Dashboard/Project/ProjectList';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <UserList/>
      <ProjectList/>
      
    </div>
  );
};

export default Home;
