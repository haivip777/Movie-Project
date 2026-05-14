import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) => 
    `relative text-base font-medium transition-colors pb-1 w-fit ` +
    `after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-[#AB8BFF] after:transition-all after:duration-300 ` +
    (isActive ? `text-white after:w-full` : `text-gray-300 hover:text-white after:w-0 hover:after:w-full`);

  return (
    <nav className="sticky top-4 flex justify-between items-center py-4 px-6 md:px-8 max-w-7xl mx-auto w-full z-50 bg-dark-100/40 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl shadow-black/50">
      <Link to="/" className="flex items-center gap-2">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-8 h-8" />
        <span className="text-white text-xl font-bold tracking-wider">Movie<span className="text-[#AB8BFF]">Hub</span></span>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink id="watchlist-nav" to="/favorites" className={navLinkClass}>Watchlist</NavLink>
      </div>

      {/* Mobile Hamburger Button */}
      <button 
        id="hamburger-nav"
        className="md:hidden text-white focus:outline-none hover:text-[#AB8BFF] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[110%] left-0 right-0 bg-dark-100/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex flex-col gap-5 shadow-2xl md:hidden origin-top animate-in fade-in slide-in-from-top-2 duration-200">
          <NavLink to="/" className={navLinkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/favorites" className={navLinkClass} onClick={() => setIsOpen(false)}>Watchlist</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
