import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import content from '../content.json';

const Portfolio = () => {
  return (
    <section className="pt-32 pb-20 relative z-10 min-h-screen">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20 text-sm font-medium tracking-wide text-slate-200">
            <span className="w-2 h-2 rounded-full bg-main-secondary shadow-[0_0_8px_var(--color-main-secondary)] animate-pulse"></span>
            {content.portfolioPage.subtitle}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            {content.portfolioPage.titlePrefix} <span className="text-gradient">{content.portfolioPage.titleHighlight}</span>
          </h1>
          <p className="text-slate-400 font-light">
            {content.portfolioPage.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.portfolioPage.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, margin: "0px" }}
              className="glass-card rounded-3xl overflow-hidden group border border-white/5"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                  <a href="#" className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-400 transition-colors transform hover:scale-110">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors border border-white/20 transform hover:scale-110">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-white mb-3 font-poppins group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 font-light text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-medium px-2 py-1 bg-slate-800/80 rounded-md text-emerald-400 border border-emerald-500/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
