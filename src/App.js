
import React from 'react'; 
import { Routes, Route } from 'react-router-dom';

// استدعاء التنسيقات العالمية (هذا ما سيضبط شكل الموقع)
import './styles/global.css'; 

// استدعاء المكونات
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// استدعاء الصفحات (تأكدي من مطابقة الحروف الكبيرة/الصغيرة للمجلدات)
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
