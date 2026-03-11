import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import content from '../content.json';

const AnimatedCounter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [currentValue, setCurrentValue] = useState(0);
  
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  useEffect(() => {
    if (inView) {
      springValue.set(parseInt(value));
    }
  }, [inView, value, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setCurrentValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{currentValue}</span>;
};

const Stats = () => {
  return (
    <section className="relative py-20 z-10 border-y border-white/5 bg-slate-900/50 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center justify-center p-6 rounded-2xl glass-card text-center"
            >
              <div className="text-4xl md:text-5xl font-bold font-poppins text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] flex items-end">
                <AnimatedCounter value={stat.value} />
                <span className="text-purple-400 ml-1 leading-tight">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base text-slate-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -z-10"></div>
    </section>
  );
};

export default Stats;
