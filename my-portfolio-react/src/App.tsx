import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminPage from './admin/AdminPage';
import './App.css'; // Vite default styles, can be removed or modified

// Custom component to handle redirects to static content
const StaticRedirect: React.FC = () => {
  useEffect(() => {
    window.location.replace('/project/guhbot/index.html');
  }, []);
  
  return <div>Redirecting to GuhBot...</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Redirect /project/guhbot to the static page */}
        <Route path="/project/guhbot/*" element={<StaticRedirect />} />
        {/* Route for other project detail pages, e.g., /project/blink-twice */}
        <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        {/* Admin page route */}
        <Route path="/admin" element={<AdminPage />} />
        {/* You can add a 404 Not Found route here later */}
      </Routes>
    </Router>
  );
};

export default App;
