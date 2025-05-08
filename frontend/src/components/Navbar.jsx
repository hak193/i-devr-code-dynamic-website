import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">I-DevR Code</Link>
      </div>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About Us</Link>
        <Link to="/services" className="hover:underline">Services</Link>
        <Link to="/app-builder" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
          Try the App Builder
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
