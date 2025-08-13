'use client';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Dock from './Dock';
import { VscHome, VscLightbulb, VscRocket } from 'react-icons/vsc';
import { MdRequestQuote, MdOutlineShoppingBag } from 'react-icons/md';
import { FaClipboardList } from 'react-icons/fa';
import CartIcon from './CartIcon';
import Image from 'next/image';
// import dotenv from 'dotenv';
// dotenv.config();

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if (!BACKEND_URL) {
  console.error('BACKEND_URL is not defined in .env file');
}

export default function Navigation() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [signInUsername, setSignInUsername] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpHome, setSignUpHome] = useState('');
  const [signUpCity, setSignUpCity] = useState('');
  const [signUpState, setSignUpState] = useState('');
  const [signUpCountry, setSignUpCountry] = useState('');
  const [signUpPincode, setSignUpPincode] = useState('');
  const [user, setUser] = useState("Guest User");
  // const [signUpAddress, setSignUpAddress] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/me`, {
          withCredentials: true, // ⬅️ This is very important
        });
        setUser(res.data.username);
        setShowSignIn(false);
        setIsProfileOpen(false);
      } catch (error) {
        console.log("User not logged in");
        setUser("Guest User");
      }
    };

    fetchUser();
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

  const handleSignIn = (e) => {
    e.preventDefault();
    axios.post(`${BACKEND_URL}/customer/login`, {
      username: signInUsername,
      email: signInEmail,
      password: signInPassword
    }, {
      withCredentials: true // ⬅️ This is very important to maintain session
    })
      .then(response => {
        setUser(response.data.data.username);
        setShowSignIn(false);
        setIsProfileOpen(false);
      })
      .catch(error => {
        console.error('Error signing in:', error);
        alert('Failed to sign in. Please try again.');
      });
  };

  const handleLogout = () => {
    axios.post(`${BACKEND_URL}/customer/logout`,{}, { withCredentials: true }).then(() => {
      setUser("Guest User");
      setIsProfileOpen(false);
    }).catch(err => {
      console.error("Logout failed", err);
    });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const address = `${signUpHome}, ${signUpCity}, ${signUpState}, ${signUpCountry}, ${signUpPincode}`;
    axios.post(`${BACKEND_URL}/customer/register`, {
      username: signUpUsername,
      email: signUpEmail,
      password: signUpPassword,
      address: address
    })
      .then(response => {

        setShowSignUp(false);
        setIsProfileOpen(false);
      })
      .catch(error => {
        console.error('Error signing up:', error);
        alert('Failed to sign up. Please try again.');
      });
  };

  return (
    <div className="relative font-inter">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-gradient-to-b from-black/70 to-black/10 backdrop-blur-md shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="w-[160px] sm:w-[300px] h-[40px] flex items-center z-10">
            <span className="text-white text-lg sm:text-xl font-bold mt-55 ">
              <img src="/LayerForge.png" alt="LayerForge Logo" />
            </span>
          </Link>

          <div className="relative" ref={profileMenuRef}>
            <button
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 12C14.2 12 16 10.2 16 8s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Z" stroke="currentColor" strokeWidth="2" />
                <path d="M20 19c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1 0-3.9 3.6-7 8-7s8 3.1 8 7Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-zinc-900/90 backdrop-blur-xl border border-white/10 shadow-2xl p-5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white text-lg font-semibold">
                    G
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{user}</p>
                    <div className="mt-3 flex gap-2">
                      {user === "Guest User" ? (
                        <>
                          <button
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition"
                            onClick={() => { setShowSignIn(true); setIsProfileOpen(false); }}
                          >
                            Sign In
                          </button>
                          <button
                            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-800 text-white text-sm rounded-lg transition"
                            onClick={() => { setShowSignUp(true); setIsProfileOpen(false); }}
                          >
                            Sign Up
                          </button>
                        </>
                      ) : (
                        <button
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                          onClick={handleLogout }
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-black rounded-2xl p-6 w-full max-w-sm shadow-xl border border-zinc-200">
            <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
            <form onSubmit={handleSignIn} className="space-y-4">
              <input type="username" value={signInUsername} onChange={e => setSignInUsername(e.target.value)} placeholder="Username" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="email" value={signInEmail} onChange={e => setSignInEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="password" value={signInPassword} onChange={e => setSignInPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition">Sign In</button>
              <button type="button" className="w-full text-sm text-gray-500 hover:underline" onClick={() => setShowSignIn(false)}>Cancel</button>
            </form>
            <p className="mt-4 text-sm text-center">Don’t have an account? <button className="text-indigo-600 hover:underline" onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>Sign Up</button></p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-black rounded-2xl p-6 w-full max-w-sm shadow-xl border border-zinc-200">
            <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
            <form onSubmit={handleSignUp} className="space-y-4">
              <input type="username" value={signUpUsername} onChange={e => setSignUpUsername(e.target.value)} placeholder="Username" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="email" value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} placeholder="Email" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="password" value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="address" value={signUpHome} onChange={e => setSignUpHome(e.target.value)} placeholder="Home No." required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="address" value={signUpCity} onChange={e => setSignUpCity(e.target.value)} placeholder="City" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="address" value={signUpState} onChange={e => setSignUpState(e.target.value)} placeholder="State" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="address" value={signUpCountry} onChange={e => setSignUpCountry(e.target.value)} placeholder="Country" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="address" value={signUpPincode} onChange={e => setSignUpPincode(e.target.value)} placeholder="Pincode" required className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2 transition">Sign Up</button>
              <button type="button" className="w-full text-sm text-gray-500 hover:underline" onClick={() => setShowSignUp(false)}>Cancel</button>
            </form>
            <p className="mt-4 text-sm text-center">Already have an account? <button className="text-indigo-600 hover:underline" onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>Sign In</button></p>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4">
        <Dock items={navigationItems} className="bg-black/20 backdrop-blur-md" />
      </nav>
    </div>
  );
}
