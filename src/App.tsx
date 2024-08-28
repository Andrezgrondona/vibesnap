
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home'; 
import PhotosUserPage from './pages/PhotosUserPage';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<PhotosUserPage />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;