import React from 'react';
import { motion } from 'framer-motion';
import content from '../content.json';

const About = () => {
  return (
    <section className="pt-32 pb-20 relative z-10 min-h-screen">
      {/* Background gradients similar to hero/global */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20 text-sm font-medium tracking-wide text-slate-200">
            <span className="w-2 h-2 rounded-full bg-main-secondary shadow-[0_0_8px_var(--color-main-secondary)] animate-pulse"></span>
            {content.aboutPage.subtitle}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-8 leading-tight">
            {content.aboutPage.titlePrefix} <span className="text-gradient">{content.aboutPage.titleHighlight}</span>
          </h1>
          
          <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 mb-12 relative overflow-hidden">
            {/* Subtle decorative background text for Malmö */}
            <div className="absolute -top-10 -right-10 opacity-[0.03] transform pointer-events-none select-none">
              <span className="font-poppins font-black text-[15rem] leading-none text-white">{content.aboutPage.backgroundText}</span>
            </div>
            
            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8 relative z-10" dangerouslySetInnerHTML={{ __html: content.aboutPage.paragraphs[0] }} />
            
            <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mb-8 rounded-full"></div>

            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-8 relative z-10" dangerouslySetInnerHTML={{ __html: content.aboutPage.paragraphs[1] }} />

            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed relative z-10" dangerouslySetInnerHTML={{ __html: content.aboutPage.paragraphs[2] }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.aboutPage.cards.map((card, idx) => (
              <div key={idx} className={`glass-card rounded-3xl p-8 border-t-2 ${card.borderColor}`}>
                <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-slate-400 font-light">{card.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
