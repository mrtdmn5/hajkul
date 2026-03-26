import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import content from '../content.json';

const IconComponent = ({ name, className }) => {
  const Icon = LucideIcons[name];
  if (!Icon) return <LucideIcons.Box className={className} />;
  return <Icon className={className} strokeWidth={1.5} />;
};

const Services = () => {
  return (
    <section id="services" className="pt-10 pb-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-slate-400">
            Innovative solutions crafted to elevate your business through cutting-edge technology and exceptional design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true, margin: "0px" }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-3 opacity-20 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">
                <IconComponent name={service.icon} className="w-32 h-32 text-emerald-500" />
              </div>
              
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                <IconComponent name={service.icon} className="w-7 h-7 text-cyan-400 group-hover:text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 font-poppins relative z-10 group-hover:text-emerald-300 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed relative z-10 font-light">
                {service.description}
              </p>
              
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
