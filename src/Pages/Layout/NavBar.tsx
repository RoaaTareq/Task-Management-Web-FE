import React, { useContext } from 'react';
import Navbar from '../../Components/Layout/NavBar'; // Adjust the path as necessary
import { AuthContext } from '../../Context/AuthContext'; // Import the AuthContext

const MainNavbar: React.FC = () => {
    const { isAuthenticated, logout } = useContext(AuthContext) || {};

    // Conditionally render links based on authentication status and admin status
    const links = isAuthenticated
        ? [
             
                { href: '/users', text: 'Users' },
                { href: '/projects', text: 'Create Project' },
           
            { href: '/tasks', text: 'Create Task' },
            { href: '/logout', text: 'Logout', onClick: logout }, // Logout link calls the logout function
        ]
        : [
            { href: '/', text: 'Home' },
            { href: '/login', text: 'Login' },
            { href: '/register', text: 'Register' },
        ];

    return (
        <div>
            <Navbar
                brandName="Task Management Tracker"
                links={links}
                className="custom-navbar-class"
            />
        </div>
    );
};

export default MainNavbar;
