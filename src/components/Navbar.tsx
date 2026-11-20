import React, { useState } from 'react';
import { useChurch } from '../context/ChurchContext';
import { CHURCH_INFO } from '../data/churchData';
import { 
  Radio, 
  Menu, 
  X, 
  HeartHandshake, 
  Wifi, 
  WifiOff, 
  Type, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  Flame, 
  Award 
} from 'lucide-react';
import { UserRole } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    lowBandwidthMode, 
    toggleLowBandwidth, 
    largeTextMode, 
    toggleLargeText,
    userRole,
    setUserRole,
    openModal
  } = useChurch();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About & Message' },
    { id: 'sermons', label: 'Sermons & Tapes' },
    { id: 'testimonies', label: 'Testimonies' }, // VOGR signature section
    { id: 'live', label: 'Live Broadcast' },
    { id: 'youth', label: 'Youth Alive' },
    { id: 'ministries', label: 'Ministries & Care' },
    { id: 'baptisms', label: 'Water Baptism' },
    { id: 'events', label: 'Events' },
    { id: 'fellowships', label: 'Enugu Fellowships' },
    { id: 'contact', label: 'Visit Us' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rolesList: { id: UserRole; label: string }[] = [
    { id: 'visitor', label: 'Visitor' },
    { id: 'member', label: 'Virtual Member' },
    { id: 'pastor', label: 'Pastor Oke Hyacinth Ayogu' },
    { id: 'care_team', label: 'Care & Follow-up Team' },
    { id: 'admin', label: 'Church Administrator' },
    { id: 'youth_leader', label: 'Youth Alive Leader' },
    { id: 'music_lead', label: 'Music Lead (Instrumental)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md transition-colors border-b border-slate-200">
      
      {/* 1. TOP UTILITY STRIP (VOGR NAVY BAR) */}
      <div className="bg-vogr-navy text-white text-xs py-1.5 px-4 font-medium flex justify-between items-center tracking-wide border-b border-vogr-gold/30">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-vogr-gold animate-pulse"></span>
          <span className="truncate text-slate-200">
            Independence Layout, Enugu (Beside IMT Campus 2) • Sunday Worship: 9:00 AM • Wed & Fri: 4:00 PM
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          {/* Low Bandwidth Mode Toggle */}
          <button
            onClick={toggleLowBandwidth}
            title="Toggle data-saving audio-first mode (branham.org low-data)"
            className={`flex items-center space-x-1 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
              lowBandwidthMode 
                ? 'bg-vogr-gold text-vogr-navyDark font-bold shadow' 
                : 'bg-vogr-navyLight hover:bg-slate-700 text-slate-200'
            }`}
          >
            {lowBandwidthMode ? <WifiOff size={12} /> : <Wifi size={12} />}
            <span className="hidden sm:inline">{lowBandwidthMode ? 'Low Data (Active)' : 'Save Data'}</span>
          </button>

          {/* Large Text Accessibility */}
          <button
            onClick={toggleLargeText}
            title="Toggle large text readability"
            className={`p-1 rounded text-[11px] transition-colors ${
              largeTextMode 
                ? 'bg-vogr-gold text-vogr-navyDark font-bold' 
                : 'hover:bg-vogr-navyLight text-slate-200'
            }`}
          >
            <Type size={13} />
          </button>

          {/* Role Preview Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center space-x-1.5 text-[11px] bg-vogr-navyLight hover:bg-slate-700 px-2.5 py-0.5 rounded text-white border border-vogr-gold/30"
            >
              <ShieldCheck size={12} className="text-vogr-gold" />
              <span>Role: <strong className="text-vogr-gold capitalize">{userRole.replace('_', ' ')}</strong></span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-slate-300 rounded-lg shadow-2xl py-1 text-slate-800 z-50">
                <div className="px-3 py-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-100">
                  Switch Testing Role
                </div>
                {rolesList.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setUserRole(r.id);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors ${
                      userRole === r.id ? 'font-bold text-vogr-crimson bg-slate-50' : ''
                    }`}
                  >
                    <span>{r.label}</span>
                    {userRole === r.id && <span className="w-1.5 h-1.5 rounded-full bg-vogr-crimson"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & SEAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Official Church Seal & Typography */}
          <button 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-3.5 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-vogr-navy text-vogr-gold flex items-center justify-center border-2 border-vogr-gold shadow-md group-hover:scale-105 transition-transform shrink-0">
              <Sparkles size={24} className="text-vogr-gold" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-vogr-navy block leading-tight">
                Jehovah Good Shepherd Church
              </span>
              <span className="text-[11px] sm:text-xs text-vogr-crimson font-semibold tracking-wider uppercase block">
                Independence Layout, Enugu • Spoken Word Fellowship
              </span>
            </div>
          </button>

          {/* Action CTAs: Live Broadcast Badge + Member Portal */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => handleNavClick('live')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-vogr-crimson border border-rose-200 text-xs font-bold hover:bg-rose-100 transition-colors shadow-sm"
            >
              <Radio size={14} className="text-rose-600 animate-pulse" />
              <span>Live Broadcast</span>
            </button>

            <button
              onClick={() => handleNavClick('give')}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-vogr-crimson hover:bg-vogr-crimsonHover text-white text-xs sm:text-sm font-bold shadow transition-all"
            >
              <HeartHandshake size={15} />
              <span>Give Offering</span>
            </button>

            {/* Portal Button */}
            {(userRole === 'admin' || userRole === 'pastor' || userRole === 'care_team') ? (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                  activePage === 'admin'
                    ? 'bg-vogr-navy text-vogr-gold border-vogr-gold'
                    : 'bg-slate-100 text-vogr-navy border-slate-300 hover:bg-slate-200'
                }`}
              >
                Staff Care Portal
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('virtual-member')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  activePage === 'virtual-member'
                    ? 'bg-vogr-navy text-white border-vogr-navy'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
              >
                Member Hub
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick('give')}
              className="px-3 py-1.5 rounded-full bg-vogr-crimson text-white text-xs font-bold"
            >
              Give
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-vogr-navy hover:bg-slate-100 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. DESKTOP NAVIGATION BAR (Clean VOGR Navigation Strip) */}
      <div className="hidden xl:block bg-vogr-navyLight text-white border-t border-slate-700/60 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-1 py-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 rounded text-xs font-semibold transition-all ${
                  activePage === link.id
                    ? 'text-vogr-gold font-bold bg-vogr-navy border-b-2 border-vogr-gold'
                    : 'text-slate-200 hover:text-white hover:bg-vogr-navy/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold ${
                activePage === link.id
                  ? 'bg-vogr-navy text-vogr-gold font-bold'
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('virtual-member')}
              className="w-full text-center py-2.5 rounded-lg bg-vogr-navy text-white text-sm font-semibold"
            >
              Virtual Member Dashboard
            </button>
            {(userRole === 'admin' || userRole === 'pastor' || userRole === 'care_team') && (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-center py-2.5 rounded-lg bg-vogr-crimson text-white text-sm font-bold"
              >
                Staff Portal & Care Inbox
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
