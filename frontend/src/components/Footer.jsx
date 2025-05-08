import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-6 mt-12">
      <p>&copy; {new Date().getFullYear()} I-DevR Code. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
