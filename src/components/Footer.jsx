import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-dark-100/50 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo" className="w-8 h-8" />
            <span className="text-white text-xl font-bold tracking-wider">Movie<span className="text-[#AB8BFF]">Hub</span></span>
          </div>

          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} MovieHub. All rights reserved.</p>
            <p className="mt-1">Designed with ❤️ by HaiDev.</p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/haivip777" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors font-medium">
              GitHub
            </a>
            <a href="https://haidev.vercel.app/" target="_blank" className="text-gray-400 hover:text-white transition-colors font-medium">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
