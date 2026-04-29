import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './styles/global.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home';
import Rewards from './Pages/Rewards';
import AuthPage from './Pages/AuthPage';
import PreferenceForm from './Pages/PreferenceForm';
import Recommended from './Pages/Recommended';
import TopOpportunities from './Pages/TopOpportunities';
import Profile from './Pages/Profile';
import EditProfile from './Pages/EditProfile';
import OrgPreferenceForm from './Pages/OrgPreferenceForm';
import OrgProfile from './Pages/OrgProfile';
import Messages from './Pages/Messages';
import Community from './Pages/Community';
import { PrivacyPage, TermsPage, ContactPage, AboutPage, HowItWorksPage, ImpactPage } from './Pages/LegalPages';

export default function App() {
  const location = useLocation();

  React.useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />

            <Route path="/volunteer/preference" element={<PreferenceForm />} />
            <Route path="/recommended" element={<Recommended />} />
            <Route path="/Opportunities" element={<TopOpportunities />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />

            <Route path="/org/preference" element={<OrgPreferenceForm />} />
            <Route path="/org/profile" element={<OrgProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/community" element={<Community />} />
            
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/impact" element={<ImpactPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
}
