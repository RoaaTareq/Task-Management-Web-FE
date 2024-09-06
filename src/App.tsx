import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './Pages/Layout/NavBar'; // Adjust path if necessary
import MobileNavBar from './Pages/MobileNavBar'
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <Router>
      <MainNavbar />
      <MobileNavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
