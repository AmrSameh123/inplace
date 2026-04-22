import { Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

import Home from './pages/Home.jsx'

import Rewards from './pages/Rewards.jsx'

export default function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

   
        <Route path="/rewards" element={<Rewards />} />

     
      </Routes>
            <Footer />

    </UserProvider>
  )
}
