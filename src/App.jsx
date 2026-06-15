import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EarlyAccess from './components/EarlyAccess';
import Services from './components/Services';
import Footer from './components/Footer';
import OurWorkPage from './components/OurWorkPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactPage from './pages/ContactPage';
import AboutUs from './components/AboutUs';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  );

  return (
    <Router>
      <div
        className={`${theme === 'dark' ? 'dark bg-black' : 'bg-stone-50'} min-h-screen relative transition-colors duration-200`}
      >
        <Navbar theme={theme} setTheme={setTheme} />

        <Routes>
          <Route
            path='/'
            element={
              <>
                <Hero />
                <EarlyAccess />
                <Services />
              </>
            }
          />

          <Route path='/our-work' element={<OurWorkPage />} />
          <Route path='/privacy' element={<PrivacyPolicy />} />
          <Route path='/terms' element={<TermsOfService />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact' element={<ContactPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
