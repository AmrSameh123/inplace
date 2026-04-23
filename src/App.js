
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Rewards from './Pages/Rewards';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
      <Footer />
    </>
  );
}
