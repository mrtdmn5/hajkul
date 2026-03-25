import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Tech Stack', href: '#tech' },
    { name: 'FAQ', href: '#faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (href.startsWith('/about') || href.startsWith('/portfolio')) {
      navigate(href);
      window.scrollTo(0, 0);
      return;
    }

    const isHash = href.includes('#');
    const hashTarget = isHash ? href.substring(href.indexOf('#')) : '';

    if (location.pathname !== '/') {
      navigate('/' + hashTarget);
      return;
    }

    // Add a slight delay to allow the menu to start closing before scrolling
    setTimeout(() => {
      const targetId = hashTarget.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        // Offset for fixed navbar
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 bg-slate-900/80 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-emerald-900/20' : 'py-6 bg-transparent'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500 flex items-center gap-3">
          <span className="font-doto text-4xl text-blue-400 tracking-wide flex items-center">
            Typeof
            <span className="relative inline-block">
              <span className="text-main-secondary">X</span>
              <span className="absolute  right-[-3px] text-main-secondary">X</span>
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-main-secondary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1 text-white"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-lg font-medium text-slate-300 hover:text-main-secondary w-full py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="text-lg font-medium text-emerald-400 hover:text-emerald-300 w-full py-2 pb-4"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
