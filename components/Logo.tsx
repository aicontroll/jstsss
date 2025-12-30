import React from 'react';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

const Logo: React.FC = () => {
  return (
    <Link 
      to="/" 
      className="h-16 md:h-20 flex items-center justify-center transition-transform hover:scale-105"
      title="Return to Home"
    >
      <img
        src={LOGO_URL}
        alt="Jatashankar Thakur Smariti Seva Sansthan Logo"
        className="h-full w-auto object-contain"
      />
    </Link>
  );
};

export default Logo;
