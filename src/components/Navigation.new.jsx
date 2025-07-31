'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Dock from './Dock';
import { VscHome, VscLightbulb, VscRocket } from 'react-icons/vsc';
import { MdRequestQuote, MdOutlineShoppingBag } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import CartIcon from './CartIcon';

export default function Navigation() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigationItems = [
    { icon: <VscHome size={20} className="text-white" />, label: 'Home', href: '/', active: pathname === '/' },
    { icon: <VscRocket size={20} className="text-white" />, label: '3D Printing', href: '/3d-printing', active: pathname === '/3d-printing' },
    { icon: <MdOutlineShoppingBag size={20} className="text-white" />, label: 'All Products', href: '/products', active: pathname === '/products' },
    { icon: <VscLightbulb size={20} className="text-white" />, label: 'Consultancy', href: '/consultancy', active: pathname === '/consultancy' },
    { icon: <MdRequestQuote size={20} className="text-white" />, label: 'Get Quote', href: '/quote', active: pathname === '/quote' },
    { icon: <FaClipboardList size={20} className="text-white" />, label: 'Orders', href: '/orders', active: pathname === '/orders' },
    { icon: <CartIcon />, label: 'Cart', href: '/cart', active: pathname === '/cart' }
  ];

  return (
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="w-[100px] sm:w-[120px] h-[40px] flex items-center">
            <span className="text-white text-lg sm:text-xl font-bold">LayerForge</span>
          </Link>
          
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

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-black/80 backdrop-blur-lg border border-white/10 shadow-2xl">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      U
                    </div>
                    <div>
                      <p className="text-white font-medium">Guest User</p>
                      <p className="text-white/60 text-sm">Sign in to continue</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
        <Dock items={navigationItems} className="bg-black/20 backdrop-blur-md" />
      </nav>
    </div>
  );
}
