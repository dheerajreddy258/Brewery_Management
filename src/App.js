import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BreweryDetails from './components/BreweryDetails';
import { UserProvider } from './context/userContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/brewery/:id" element={<BreweryDetails />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
