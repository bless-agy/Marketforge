import React from 'react';
import { ShoppingCart, User, Search, Store } from 'lucide-react';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenLogin,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <nav id="app-header-nav" className="bg-[#ffffff] border-b border-[#c6c6cd] w-full sticky top-0 z-50 shadow-xs">
      <div className="flex justify-between items-center px-4 md:px-8 max-w-[1280px] mx-auto h-20">
        {/* Left: Brand & Navigation */}
        <div className="flex items-center gap-6">
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="text-2xl font-bold tracking-tight text-[#000000] hover:opacity-85 transition-opacity text-left flex items-center gap-2"
          >
            <span>MarketForge</span>
          </button>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <button
              id="nav-shop-btn"
              onClick={() => onNavigate('shop')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                currentView === 'shop'
                  ? 'text-[#000000] font-bold border-b-2 border-[#000000] rounded-b-none'
                  : 'text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6]'
              }`}
            >
              Shop
            </button>
            <button
              id="nav-categories-btn"
              onClick={() => onNavigate('shop')}
              className="text-[#45464d] hover:text-[#000000] transition-colors hover:bg-[#f2f4f6] rounded-lg px-3 py-1.5"
            >
              Categories
            </button>
            <button
              id="nav-sellers-btn"
              onClick={() => onNavigate('shop')}
              className="text-[#45464d] hover:text-[#000000] transition-colors hover:bg-[#f2f4f6] rounded-lg px-3 py-1.5"
            >
              Sellers
            </button>
            <button
              id="nav-deals-btn"
              onClick={() => onNavigate('shop')}
              className="text-[#45464d] hover:text-[#000000] transition-colors hover:bg-[#f2f4f6] rounded-lg px-3 py-1.5"
            >
              Deals
            </button>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#76777d] w-4 h-4" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-[#f2f4f6] border border-[#c6c6cd] focus:border-[#000000] focus:ring-1 focus:ring-[#000000] rounded-lg text-sm text-[#191c1e] outline-none transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cart Icon */}
          <button
            id="cart-icon-btn"
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="p-2.5 text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6] rounded-lg transition-all relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span id="cart-badge-count" className="absolute -top-1 -right-1 bg-[#006c49] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button
            id="user-account-btn"
            onClick={onOpenLogin}
            aria-label="Account"
            className="hidden sm:flex p-2.5 text-[#45464d] hover:text-[#000000] hover:bg-[#f2f4f6] rounded-lg transition-all"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Login button */}
          <button
            id="login-btn"
            onClick={onOpenLogin}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium border border-[#c6c6cd] text-[#000000] bg-white rounded-lg hover:bg-[#f2f4f6] transition-colors"
          >
            Login
          </button>

          {/* Start Selling / Dashboard button */}
          <button
            id="start-selling-btn"
            onClick={() => onNavigate('seller-dashboard')}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentView === 'seller-dashboard'
                ? 'bg-[#131b2e] text-white hover:bg-[#131b2e]/90'
                : 'bg-[#000000] text-white hover:bg-[#000000]/90'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{currentView === 'seller-dashboard' ? 'Seller Portal' : 'Start Selling'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
