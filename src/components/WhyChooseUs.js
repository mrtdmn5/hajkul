import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import content from '../content.json';

const IconComponent = ({ name, className }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Box className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
};

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full glass border border-white/20 text-sm font-medium tracking-wide text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_var(--color-emerald-400)] animate-pulse"></span>
              {content.whyUs.subtitle}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
               {content.whyUs.title.split(' ')[0]} <span className="text-gradient">{content.whyUs.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            
            <p className="text-slate-400 font-light text-lg mb-8 leading-relaxed">
              {content.whyUs.description}
            </p>

            <a
               href="#contact"
               className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 group"
            >
              Let's Talk
              <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-emerald-400 transition-all" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {content.whyUs.features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-8 rounded-3xl border-t-2 border-t-transparent hover:border-t-emerald-500 transition-all group duration-300"
              >
                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 flex items-center justify-center mb-6">
                   <IconComponent name={feature.icon} className="w-6 h-6 text-emerald-400 group-hover:text-cyan-400 transition-colors" />
                 </div>
                 <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                 <p className="text-slate-400 font-light text-sm line-clamp-3">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
