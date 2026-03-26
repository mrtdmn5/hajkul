import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import content from '../content.json';

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500, 800], [1, 0.9, 0]);

  const floatingElementsRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // GSAP floating animation
    const elements = floatingElementsRef.current.children;

    Array.from(elements).forEach((el, i) => {
      gsap.to(el, {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        rotation: 'random(-15, 15)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.2
      });
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Parallax and Gradients */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </motion.div>

      {/* GSAP Floating 3D-like elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/5 w-16 h-16 glass rounded-2xl transform rotate-12 bg-white/5 opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 glass rounded-full bg-emerald-500/10 opacity-50 backdrop-blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-12 h-12 border border-blue-400/30 rounded-lg transform -rotate-12 opacity-80 backdrop-blur-md bg-blue-500/5"></div>
        <div className="absolute top-1/3 right-1/5 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-sm transform rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          style={{ opacity, y: y2 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20 text-sm font-medium tracking-wide text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-main-secondary shadow-[0_0_8px_var(--color-main-secondary)] animate-pulse"></span>
            {content.hero.subtitle}
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-extrabold font-poppins leading-tight mb-8">
            {content.hero.title.split(' ').map((word, i, arr) => (
              i >= arr.length - 2 ?
                <span key={i} className="text-gradient"> {word}</span> :
                <span key={i} className="text-white"> {word}</span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-inter font-light">
            {content.about}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168,85,247,0.5)" }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-emerald-600 via-indigo-600 to-blue-600 text-white font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10">{content.hero.cta}</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#services"
              className="px-8 py-4 rounded-full glass border-white/20 text-white font-medium hover:bg-white/10 transition-all duration-300"
            >
              Our Services
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Decorative scroll indicator */}
      <AnimatePresence>
        {!hasScrolled ? (
          <motion.div
            key="scroller"
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 text-slate-400 opacity-70"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-slate-400 to-transparent"></div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="track"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100px" }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent"
          ></motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
