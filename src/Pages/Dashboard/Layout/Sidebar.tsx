import React from 'react';
import Sidebar from '../../../Components/Layout/SideBar'; // Import the Sidebar component

const Dashboard: React.FC = () => {
  // Define the sidebar items with routes and text
  const sidebarItems = [
    { href: '/projects', text: 'Project List' },
    { href: '/users', text: 'User List' },
    { href: '/tasks', text: 'Task List' },
  ];

  return (
    <div className="dashboard">
      {/* Call the Sidebar component */}
      <Sidebar
        items={sidebarItems}
        title="Navigation"
        className="custom-sidebar"
        style={{ backgroundColor: '#f8f9fa', padding: '20px' }}
      />
      
      {/* Main content section */}
      <div className="main-content">
        {/* Other components or routing logic */}
        <h1>Welcome to the Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
