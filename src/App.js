
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Rewards from './Pages/Rewards';
import AuthPage from './Pages/AuthPage';
import PreferenceForm from './Pages/PreferenceForm';
import Recommended from './Pages/Recommended';
import TopOpportunities from './Pages/TopOpportunities'

import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        <Route path="/volunteer/preference" element={<PreferenceForm />} />
        <Route path="/recommended" element={<Recommended />} />
        <Route path="/Opportunities" element={<TopOpportunities />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  );
}

