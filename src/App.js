
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Rewards from './Pages/Rewards';
import AuthPage from './Pages/AuthPage';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Routes>
      <Footer />
    </>
  );
}
