import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './Pages/Layout/NavBar'; // Adjust path if necessary
import MobileNavBar from './Pages/Auth/MobileNavBar';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Logout from './Pages/Auth/Logout'
import './App.css'; // Import your CSS file
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthProvider from './Context/AuthContext'; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="main-navbar">
          <MainNavbar />
        </div>
        <div className="mobile-navbar">
          <MobileNavBar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
