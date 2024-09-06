import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './Pages/Layout/NavBar'; // Adjust path if necessary
import MobileNavBar from './Pages/MobileNavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import './App.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <div>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
