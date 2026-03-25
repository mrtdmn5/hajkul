import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';
import CookieConsent from './components/CookieConsent';
import About from './components/About';
import Portfolio from './components/Portfolio';
import WhyChooseUs from './components/WhyChooseUs';

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return (
    <div className="bg-slate-900 text-slate-300 font-inter antialiased min-h-screen relative overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-br from-bg-gradient-top via-bg-gradient-mid to-bg-gradient-bottom"></div>
      
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay z-[-1]" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')"}}></div>

      <Navbar />
      
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Services />
            <Process />
            <TechStack />
            <WhyChooseUs />
            <FAQ />
          </main>
        } />
        <Route path="/about" element={
          <main>
            <About />
          </main>
        } />
        <Route path="/portfolio" element={
          <main>
            <Portfolio />
          </main>
        } />
      </Routes>

      <ContactFooter />
      <CookieConsent />
    </div>
  );
}

export default App;
