'use client';

import { useState, useRef, useEffect } from 'react';
import Dock from './Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear, VscHistory, VscLightbulb, VscPerson, VscRocket } from 'react-icons/vsc';

const Navigation = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo placeholder */}
          <div className="w-[100px] sm:w-[120px] h-[40px] flex items-center">
            <div className="text-white text-lg sm:text-xl font-bold">
              {/* Replace this div with your logo image when ready */}
              {/* <Image src="/your-logo.svg" alt="LayerForge Logo" width={120} height={40} priority /> */}
              Logo
            </div>
          </div>

          {/* Profile Menu */}
          <div className="relative" ref={profileMenuRef}>
            <button 
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <svg 
                className="w-6 h-6 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M20 19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19C4 15.134 7.58172 12 12 12C16.4183 12 20 15.134 20 19Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Profile Dropdown */}
            <div 
              className={`absolute right-0 mt-2 w-72 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 shadow-2xl transform transition-all duration-200 ease-in-out ${
                isProfileOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              {/* Profile Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                    U
                  </div>
                  <div>
                    <div className="font-semibold text-white">User Name</div>
                    <div className="text-sm text-white/60">user@example.com</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <VscPerson className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Profile Details</div>
                    <div className="text-sm text-white/60">Manage your account</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <VscHistory className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Previous Orders</div>
                    <div className="text-sm text-white/60">View your order history</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <VscRocket className="w-5 h-5 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">Get Your Consultant</div>
                    <div className="text-sm text-white/60">Professional guidance</div>
                  </div>
                </button>

                <button className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <VscLightbulb className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Make Your Idea Reality</div>
                    <div className="text-sm text-white/60">Start your project</div>
                  </div>
                </button>

                <div className="h-px bg-white/10 my-2"></div>

                <button className="w-full px-4 py-3 flex items-center gap-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <VscSettingsGear className="w-5 h-5 text-white/70" />
                  <div>
                    <div className="text-white font-medium">Settings</div>
                    <div className="text-sm text-white/60">Customize your experience</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Dock 
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
          className="bg-black/20 backdrop-blur-lg"
        />
      </div>
    </>
  );
};

export default Navigation;
