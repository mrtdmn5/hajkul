import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import content from '../content.json';

const IconComponent = ({ name, className }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Settings className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
};

const TechStack = () => {
  return (
    <section id="tech" className="py-32 relative bg-slate-950/80 border-y border-white/5 backdrop-blur-3xl overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-cyan-400 font-medium tracking-wider uppercase text-sm mb-4 block">Powered By</span>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Our <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-slate-400">
            We leverage industry-leading technologies to build scalable, secure, and high-performance solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {content.techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "0px" }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group flex flex-col items-center justify-center p-6 glass-card rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-blue-500/0 group-hover:from-emerald-500/10 group-hover:to-blue-500/10 transition-colors duration-500 rounded-2xl"></div>
              
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] group-hover:border-blue-500/30 transition-all duration-300 relative z-10">
                <IconComponent name={tech.icon} className="w-8 h-8 text-slate-300 group-hover:text-cyan-400 transition-colors" />
              </div>
              
              <h4 className="text-base font-semibold text-white font-poppins text-center z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-colors mb-2">
                {tech.name}
              </h4>
              
              {/* Tooltip on hover */}
              <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -bottom-2 group-hover:bottom-4 px-2 w-full text-center sm:hidden group-hover:sm:block hidden z-20">
                <p className="text-[10px] text-slate-400 leading-tight bg-slate-900/90 backdrop-blur-md rounded border border-white/10 p-2 shadow-xl">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
