// App.tsx or any other component where you want to use Navbar
import React from 'react';
import Navbar from '../../Components/Layout/NavBar'; // Adjust the path as necessary

const MainNavbar: React.FC = () => {
  const links = [
    { href: '/home', text: 'Home' },
    { href: '/login', text: 'Login' },
    { href: '/register', text: 'Register' }
  ];

  return (
   <div>
      <Navbar
        brandName="Task Mangament Tracker"
        links={links}
        className="custom-navbar-class" 
      />
     
    </div>
  );
};

export default MainNavbar;
