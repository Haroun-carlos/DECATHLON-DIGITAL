import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// The build error indicates these file paths cannot be resolved.
// This is usually because the files (Login.jsx, Signup.jsx, Home.jsx) are missing in ./components/
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home'; 


// CONCEPTUAL: This component checks if the user has an auth token.
const ProtectedRoute = ({ element }) => {
    // In a MERN stack, you'd check for a token here.
    // For now, we allow access for development.
    return element; 
};


function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Default route: Redirect root to the Login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 3. Main Application Flow (Protected) - This is where the profile form and camera check live */}
        <Route 
            path="/home" 
            element={<ProtectedRoute element={<Home />} />} 
        />
        
        {/* 4. Catch-all route: Redirects any unknown path back to the login page */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;