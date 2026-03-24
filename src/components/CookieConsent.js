import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user already accepted or declined cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Small delay before showing the banner to ensure smooth page load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="container mx-auto max-w-5xl pointer-events-auto">
            <div className="glass-card bg-slate-900/90 border border-white/10 rounded-2xl p-6 shadow-2xl shadow-emerald-900/20 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
              
              <div className="flex items-start md:items-center gap-4 text-left">
                <div className="hidden sm:flex p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Cookie className="w-6 h-6 shrink-0" />
                </div>
                <div>
                  <h4 className="text-white font-medium font-poppins text-lg mb-1 flex items-center justify-between">
                    We Value Your Privacy
                    <button onClick={handleDecline} className="sm:hidden text-slate-400 hover:text-white transition">
                      <X className="w-5 h-5" />
                    </button>
                  </h4>
                  <p className="text-slate-400 text-sm font-light leading-relaxed max-w-2xl">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
                <button
                  onClick={handleDecline}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-300 font-medium hover:bg-white/5 transition-all text-sm w-full md:w-auto"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all text-sm w-full md:w-auto"
                >
                  Accept All
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
