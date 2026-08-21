import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Core Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EarlyAccess from './components/EarlyAccess';
import Services from './components/Services';
import Footer from './components/Footer';
import OurWorkPage from './components/OurWorkPage';
import AboutUs from './components/AboutUs';
import JuniorEcologist from './components/JuniorEcologist';
import JuniorEcologistModal from './components/JuniorEcologistModal';

// Informational Pages
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactPage from './pages/ContactPage';

// Security & Authentication
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ArchivalUpload from './pages/workspace/ArchivalUpload';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  );

  return (
    <AuthProvider>
      <Router>
        <div
          className={`${
            theme === 'dark' ? 'dark bg-black' : 'bg-stone-50'
          } min-h-screen relative transition-colors duration-200`}
        >
        
          <Navbar theme={theme} setTheme={setTheme} />

          <Routes>
            
            <Route
              path='/'
              element={
                <>
                  <JuniorEcologistModal />
                  <Hero />
                  <EarlyAccess />
                </>
              }
            />

            
            <Route
              path='/programs'
              element={
                <main className='pt-8 pb-16'>
                  <JuniorEcologist />
                </main>
              }
            />

            
            <Route
              path='/services'
              element={
                <main className='pt-8 pb-16'>
                  <Services />
                </main>
              }
            />

            
            <Route path='/our-work' element={<OurWorkPage />} />
            <Route path='/privacy' element={<PrivacyPolicy />} />
            <Route path='/terms' element={<TermsOfService />} />
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/contact' element={<ContactPage />} />

            
            <Route path='/login' element={<Login />} />

           
            <Route
              path='/workspace'
              element={
                <ProtectedRoute>
                  <ArchivalUpload />
                </ProtectedRoute>
              }
            />
          </Routes>

       
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;