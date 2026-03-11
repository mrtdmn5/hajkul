import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import TechStack from './components/TechStack';
import FAQ from './components/FAQ';
import ContactFooter from './components/ContactFooter';

function App() {
  return (
    <div className="bg-slate-900 text-slate-300 font-inter antialiased min-h-screen relative overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-to-br from-slate-900 via-[#0a0f1a] to-[#040608]"></div>
      
      {/* Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay z-[-1]" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')"}}></div>

      <Navbar />
      
      <main>
        <Hero />
        <Stats />
        <Services />
        <TechStack />
        <FAQ />
      </main>

      <ContactFooter />
    </div>
  );
}

export default App;
