import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="app-footer" className="bg-[#e0e3e5] w-full mt-16 border-t border-[#c6c6cd]">
      <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 md:px-8 max-w-[1280px] mx-auto gap-4 md:gap-0">
        <div className="text-lg font-bold text-[#000000]">
          MarketForge
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#45464d]">
          <a href="#" className="hover:text-[#000000] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#000000] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#000000] transition-colors">Seller Handbook</a>
          <a href="#" className="hover:text-[#000000] transition-colors">Affiliate Program</a>
        </div>
        <div className="text-sm text-[#45464d]">
          © 2024 MarketForge. Engineered for Excellence.
        </div>
      </div>
    </footer>
  );
};
