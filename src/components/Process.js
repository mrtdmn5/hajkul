import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import content from '../content.json';

const IconComponent = ({ name, className }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Box className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
};

const Process = () => {
  return (
    <section id="process" className="py-32 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true, margin: "-100px" }}
           className="text-center max-w-2xl mx-auto mb-20"
         >
           <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20 text-sm font-medium tracking-wide text-slate-200">
             <span className="w-2 h-2 rounded-full bg-main-secondary shadow-[0_0_8px_var(--color-main-secondary)] animate-pulse"></span>
             {content.process.subtitle}
           </div>
           
           <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
             {content.process.title.split(' ')[0]} <span className="text-gradient">{content.process.title.split(' ').slice(1).join(' ')}</span>
           </h2>
           <p className="text-slate-400 font-light">
             {content.process.description}
           </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
           {content.process.steps.map((step, index) => (
             <motion.div
               key={step.number}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: index * 0.15 }}
               viewport={{ once: true, margin: "0px" }}
               className="relative"
             >
               {/* Decorative connecting line for desktop */}
               {index < content.process.steps.length - 1 && (
                 <div className="hidden md:block absolute top-[45px] left-[60%] w-[100%] h-[2px] bg-gradient-to-r from-emerald-500/20 to-transparent z-0"></div>
               )}

               <div className="glass-card rounded-3xl p-6 h-full relative z-10 group hover:-translate-y-2 transition-transform duration-300">
                 <div className="text-6xl font-black text-white/5 font-doto absolute top-4 right-4 pointer-events-none transition-all duration-300 group-hover:text-main-secondary group-hover:opacity-20">
                   {step.number}
                 </div>
                 
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:border-emerald-500/30 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all duration-300">
                   <IconComponent name={step.icon} className="w-7 h-7 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                 </div>
                 
                 <h3 className="text-xl font-semibold text-white mb-3 font-poppins">
                   {step.title}
                 </h3>
                 
                 <p className="text-slate-400 text-sm font-light leading-relaxed">
                   {step.description}
                 </p>
               </div>
             </motion.div>
           ))}
         </div>
      </div>
    </section>
  );
};

export default Process;
