import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const navLinkClass = ({ isActive }) => 
    `relative text-base font-medium transition-colors pb-1 ` +
    `after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-[#AB8BFF] after:transition-all after:duration-300 ` +
    (isActive ? `text-white after:w-full` : `text-gray-300 hover:text-white after:w-0 hover:after:w-full`);

  return (
    <nav className="sticky top-4 flex justify-between items-center py-4 px-8 max-w-7xl mx-auto w-full z-50 bg-dark-100/40 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl shadow-black/50">
      <Link to="/" className="flex items-center gap-2">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-8 h-8" />
        <span className="text-white text-xl font-bold tracking-wider">Movie<span className="text-[#AB8BFF]">Hub</span></span>
      </Link>
      <div className="flex gap-8 items-center">
        <NavLink to="/" className={navLinkClass}>Home</NavLink>
        <NavLink id="watchlist-nav" to="/favorites" className={navLinkClass}>Watchlist</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
