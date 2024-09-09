import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNavbar from './Pages/Layout/NavBar'; 
import MobileNavBar from './Pages/Auth/MobileNavBar';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Logout from './Pages/Auth/Logout';
import './App.css'; 
import Dashboard from './Pages/Dashboard/Dashboard';
import AuthProvider from './Context/AuthContext'; 
import ProtectedRoute from './Components/privateRoute'; 

const App: React.FC = () => {
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
          
          {/* Protect the Dashboard and its routes */}
          {/* <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          /> */}
          <Route 
            path="/*" 
            element={
             
                <Dashboard />}
              
              />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
