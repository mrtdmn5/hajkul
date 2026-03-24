import React from 'react';

const Logo = ({ className = "w-24 h-24" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* Top Left Cyan Block */}
      <div 
        className="absolute inset-0 bg-[#009CD9]"
        style={{ clipPath: 'polygon(38% 10%, 58% 10%, 50% 26%, 30% 26%)' }}
      ></div>
      
      {/* Main Dark Blue Fold */}
      <div 
        className="absolute inset-0 bg-[#002D72]"
        style={{ clipPath: 'polygon(58% 10%, 80% 10%, 98% 46%, 40% 46%)' }}
      ></div>
      
      {/* Bottom Light Blue Chevron */}
      <div 
        className="absolute inset-0 bg-[#009CD9]"
        style={{ clipPath: 'polygon(17% 100%, 42% 50%, 58% 50%, 83% 100%, 67% 100%, 50% 66%, 33% 100%)' }}
      ></div>
    </div>
  );
};

export default Logo;
