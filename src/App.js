
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Rewards from './Pages/Rewards';
import Login from './Pages/Login';
import RoleSelection from './Pages/RoleSelection';
import RegisterVolunteer from './Pages/RegisterVolunteer';
import RegisterOrg from './Pages/RegisterOrg';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RoleSelection />} />
        <Route path="/register/volunteer" element={<RegisterVolunteer />} />
        <Route path="/register/organization" element={<RegisterOrg />} />
      </Routes>
      <Footer />
    </>
  );
}
