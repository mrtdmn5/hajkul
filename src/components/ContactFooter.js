import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import content from '../content.json';

const ContactFooter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
    botcheck: false // Honeypot field
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Custom spam check (Honeypot) - If botcheck is true, it's a bot.
    if (formData.botcheck) {
      setStatus('success'); // Pretend it worked for the bot
      return;
    }

    setStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          service: formData.service,
          message: formData.message,
          subject: `New Contact from ${formData.name}`,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '', botcheck: false }); // Reset form
        
        // Return to idle after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="relative pt-32 pb-6 border-t border-white/10 bg-black/50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 relative z-10 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6">
              {content.contact.title.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">{content.contact.title.split(' ').pop()}</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md font-light">
              {content.contact.subtitle} {content.contact.cta}
            </p>

            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 glass">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">Locate Us</h5>
                  <p className="text-white text-lg font-medium">{content.contact.location.country}</p>
                  <p className="text-slate-400">{content.contact.location.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 glass">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-1">Write to Us</h5>
                  <p className="text-white text-lg font-medium">Information</p>
                  <a href={`mailto:${content.contact.email}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {content.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl shadow-emerald-900/10"
          >
            <h3 className="text-2xl font-semibold mb-8 font-poppins text-white">Send a Message</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* Spam Protection Honeypot */}
              <input 
                type="checkbox" 
                name="botcheck" 
                className="hidden" 
                style={{ display: 'none' }} 
                checked={formData.botcheck} 
                onChange={handleChange} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Name*</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-light" 
                    placeholder="John Doe" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Email*</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-light" 
                    placeholder="john@example.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Choose a Service*</label>
                <select 
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light appearance-none"
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Cloud Integration">Cloud Integration</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Enter Your Project Details*</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  minLength="10"
                  rows="4" 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 transition-all font-light resize-none" 
                  placeholder="Tell us about your next big idea..."
                ></textarea>
              </div>

              {/* Form Status Messages */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center gap-3 text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <p>Message sent successfully! We will get back to you soon.</p>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p>Something went wrong. Please try again later.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={status !== 'submitting' ? { scale: 1.02, backgroundColor: "rgba(16,185,129,0.9)" } : {}}
                whileTap={status !== 'submitting' ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-3 transition-all group ${
                  status === 'submitting' 
                  ? 'bg-emerald-600/50 cursor-not-allowed text-white/70' 
                  : 'bg-emerald-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                }`}
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
        </div>
      </div>

      <div className="container mx-auto px-6 pt-6 border-t border-white/5 text-center flex flex-col items-center justify-between md:flex-row">
        <p className="text-slate-500 text-sm font-light mb-4 md:mb-0">
          {content.contact.copyright.split('|')[0]}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-slate-400 text-sm font-light">
            {content.contact.copyright.split('|')[1]}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
