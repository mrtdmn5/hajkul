import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShieldCheck, Zap, Globe } from 'lucide-react';
import content from '../content.json';

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Platform': return <Globe className="w-5 h-5 text-blue-400" />;
    case 'Updates': return <Zap className="w-5 h-5 text-emerald-400" />;
    case 'Safety': return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
    default: return <ChevronDown className="w-5 h-5 text-slate-400" />;
  }
};

const FAQItem = ({ faq, isOpen, toggleOpen }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mb-4 border border-white/10 rounded-2xl glass-card overflow-hidden"
    >
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-800/50 rounded-lg">
            {getCategoryIcon(faq.category)}
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{faq.category}</span>
            <h4 className="text-lg font-medium text-white font-poppins mt-1">
              {faq.question}
            </h4>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-400 bg-white/5 p-2 rounded-full"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-white/5 mt-2 bg-slate-900/30">
              <ul className="space-y-3 mt-4">
                {faq.answers.map((answer, index) => {
                  const [boldPart, rest] = answer.split(': ');
                  return (
                    <li key={index} className="flex items-start gap-3 text-slate-300 font-light text-sm md:text-base">
                      <div className="mt-1.5 w-1.5 h-1.5 aspect-square rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                      <span>
                        {rest ? (
                          <>
                            <strong className="text-white font-medium">{boldPart}:</strong> {rest}
                          </>
                        ) : (
                          answer
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-400">
            Get the answers you need about our platform support, update frequency, and top-tier security measures.
          </p>
        </motion.div>

        <div>
          {content.faq.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              toggleOpen={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2"></div>
    </section>
  );
};

export default FAQ;
