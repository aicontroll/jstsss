import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { NAV_ITEMS, ORGANIZATION_NAME } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-lg border-b border-emerald-100 transition-all duration-300">
      <div className="w-full pl-4 pr-4">
        <div className="flex items-center h-24 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center flex-shrink-0 flex-1">
            <Logo />
            <div className="ml-0 hidden md:block">
              <h1 className={`font-bold text-emerald-900 leading-tight ${language === 'hi' ? 'text-xl' : 'text-lg'}`}>
                {t.organizationName}
              </h1>
              <p className="text-xs text-emerald-600 font-medium">
                {t.home.registeredUnder}
              </p>
              <p className="text-xs text-emerald-700 font-semibold italic mt-0.5">
                "सत्य परेशान हो सकता है, पराजित नहीं |"
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex space-x-3 items-center">
            {NAV_ITEMS.map((item, index) => {
              const navLabels = [t.nav.home, t.nav.about, t.nav.missionVision, t.nav.legal, t.nav.operationalArea, t.nav.governingBody, t.nav.activities, t.nav.gallery, t.nav.contact];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/50'
                      : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-700 hover:shadow-md border border-gray-200 hover:border-emerald-300'
                    }`
                  }
                >
                  {navLabels[index]}
                </NavLink>
              );
            })}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 hover:from-blue-200 hover:to-blue-100 hover:text-blue-800 hover:shadow-md border border-blue-200 hover:border-blue-300 flex items-center gap-2"
              aria-label="Toggle language"
            >
              <Globe size={18} />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
          </div>

          {/* Mobile menu button & Language Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-semibold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe size={16} />
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-emerald-700 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Brand text for mobile if needed, though logo is visible above */}
            <div className="md:hidden px-3 py-2 mb-2 border-b border-gray-200">
              <p className="text-xs font-bold text-emerald-800">{t.organizationName}</p>
            </div>
            {NAV_ITEMS.map((item, index) => {
              const navLabels = [t.nav.home, t.nav.about, t.nav.missionVision, t.nav.legal, t.nav.operationalArea, t.nav.governingBody, t.nav.activities, t.nav.gallery, t.nav.contact];
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-700'
                    }`
                  }
                >
                  {navLabels[index]}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
