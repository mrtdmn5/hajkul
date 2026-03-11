import { motion } from 'framer-motion';
import { Send, MapPin, Mail } from 'lucide-react';
import content from '../content.json';

const ContactFooter = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-6 border-t border-white/10 bg-black/50 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[150px] pointer-events-none -z-10"></div>

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
              {content.contact.title.substring(0, 11)} <span className="text-gradient">Help!</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 max-w-md font-light">
              {content.contact.subtitle} {content.contact.cta}
            </p>

            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 glass">
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
            className="glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl shadow-purple-900/10"
          >
            <h3 className="text-2xl font-semibold mb-8 font-poppins text-white">Send a Message</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Name*</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-light" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Email*</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-light" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Choose a Service</label>
                <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all font-light appearance-none">
                  <option value="" disabled selected>Select a category</option>
                  <option value="mobile">Mobile App Development</option>
                  <option value="web">Web Application</option>
                  <option value="cloud">Cloud Integration</option>
                  <option value="uiux">UI/UX Design</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Enter Your Project Details</label>
                <textarea rows="4" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-light resize-none" placeholder="Tell us about your next big idea..."></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "rgba(168,85,247,0.9)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-purple-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
