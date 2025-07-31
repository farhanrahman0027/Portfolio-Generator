import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Users, Plus, Home } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { portfolios } = usePortfolio();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Professionals', href: '/professionals', icon: Users, badge: portfolios.length },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-amber-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
              PortfolioGen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Create Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:from-emerald-700 hover:to-amber-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-emerald-100">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-1 min-w-[24px] text-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white px-4 py-3 rounded-lg font-medium hover:from-emerald-700 hover:to-amber-700 transition-all duration-200 mt-4"
            >
              <Plus className="w-5 h-5" />
              <span>Create Portfolio</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;