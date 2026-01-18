import React, { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import useAuth from '../hooks/useAuth';
import { Link, NavLink, useNavigate } from 'react-router';

const Navbar = () => {
    const { user, logOut } = useAuth();
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);
    const profileMenuRef = useRef();
    const servicesMenuRef = useRef();

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target)) {
                setIsServicesMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu when window is resized
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinkClass = ({ isActive }) =>
        `hover:text-[#f57676] transition-colors duration-200 ${isActive ? 'text-[#f57676] font-semibold' : 'text-white'}`;

    const mobileNavLinkClass = ({ isActive }) =>
        `block px-4 py-2 hover:bg-[#4a1515] transition-colors duration-200 ${isActive ? 'text-[#f57676] bg-[#4a1515] font-semibold' : 'text-white'}`;

    const handleProfileClick = () => {
        navigate('/dashboard/profile');
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        logOut();
        setIsProfileMenuOpen(false);
        setIsMobileMenuOpen(false);
    };

    // Logged out navigation options (minimum 3 routes)
    const loggedOutNavOptions = (
        <>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/donation-requests" className={navLinkClass}>Find Donors</NavLink>
            <NavLink to="/about" className={navLinkClass}>About Us</NavLink>

            {/* Services Dropdown Menu */}
            <div ref={servicesMenuRef} className="relative">
                <button
                    onClick={() => setIsServicesMenuOpen(!isServicesMenuOpen)}
                    className="flex items-center text-white hover:text-[#f57676] transition-colors duration-200"
                >
                    Services
                    <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>

                {isServicesMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-2">
                            <Link
                                to="/donation-requests"
                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setIsServicesMenuOpen(false)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">🩸</span>
                                    <div>
                                        <div className="font-medium">Find Blood Donors</div>
                                        <div className="text-sm text-gray-500">Search for compatible donors</div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/stories"
                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setIsServicesMenuOpen(false)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">❤️</span>
                                    <div>
                                        <div className="font-medium">Success Stories</div>
                                        <div className="text-sm text-gray-500">Read inspiring donation stories</div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/contact"
                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setIsServicesMenuOpen(false)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">📞</span>
                                    <div>
                                        <div className="font-medium">Emergency Support</div>
                                        <div className="text-sm text-gray-500">24/7 emergency assistance</div>
                                    </div>
                                </div>
                            </Link>
                            <Link
                                to="/faq"
                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                onClick={() => setIsServicesMenuOpen(false)}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">❓</span>
                                    <div>
                                        <div className="font-medium">Help & FAQ</div>
                                        <div className="text-sm text-gray-500">Get answers to common questions</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

    // Logged in navigation options (minimum 5 routes)
    const loggedInNavOptions = (
        <>
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/donation-requests" className={navLinkClass}>Find Donors</NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/dashboard/my-requests" className={navLinkClass}>My Requests</NavLink>
            <NavLink to="/dashboard/create-request" className={navLinkClass}>Request Blood</NavLink>
            <NavLink to="/dashboard/funding" className={navLinkClass}>Emergency Fund</NavLink>
        </>
    );

    // Mobile navigation options
    const mobileLoggedOutNavOptions = (
        <>
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/donation-requests" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Find Donors</NavLink>
            <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>About Us</NavLink>
            <NavLink to="/stories" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Success Stories</NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
            <NavLink to="/faq" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>FAQ</NavLink>
        </>
    );

    const mobileLoggedInNavOptions = (
        <>
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
            <NavLink to="/donation-requests" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Find Donors</NavLink>
            <NavLink to="/dashboard" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
            <NavLink to="/dashboard/my-requests" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>My Requests</NavLink>
            <NavLink to="/dashboard/create-request" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Request Blood</NavLink>
            <NavLink to="/dashboard/funding" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Emergency Fund</NavLink>
        </>
    );

    return (
        <nav className="sticky top-0 w-full bg-[#360c0c] backdrop-blur-xl shadow-lg border-b border-white/20 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="shrink-0">
                        <Link to='/' className="flex items-center">
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8 text-sm lg:text-base font-medium">
                        {user ? loggedInNavOptions : loggedOutNavOptions}
                    </div>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            /* Profile Dropdown Menu */
                            <div ref={profileMenuRef} className="relative">
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-3 text-white hover:text-[#f57676] transition-colors duration-200"
                                >
                                    <img
                                        src={user.photoURL || '/public/default-Profile.png'}
                                        alt={user.displayName || 'User'}
                                        className="w-10 h-10 rounded-full border-2 border-[#f57676] object-cover"
                                    />
                                    <div className="text-left">
                                        <div className="text-sm font-medium">{user.displayName || 'User'}</div>
                                        <div className="text-xs text-gray-300">View Profile</div>
                                    </div>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                        <div className="py-2">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-200">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={user.photoURL || '/public/default-Profile.png'}
                                                        alt={user.displayName || 'User'}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{user.displayName || 'User'}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <button
                                                onClick={handleProfileClick}
                                                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center"
                                            >
                                                <span className="mr-3">👤</span>
                                                My Profile
                                            </button>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <span className="mr-3">📊</span>
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/dashboard/my-requests"
                                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <span className="mr-3">📋</span>
                                                My Requests
                                            </Link>
                                            <Link
                                                to="/dashboard/create-request"
                                                className="block px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors"
                                                onClick={() => setIsProfileMenuOpen(false)}
                                            >
                                                <span className="mr-3">➕</span>
                                                Create Request
                                            </Link>
                                            <div className="border-t border-gray-200 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                                >
                                                    <span className="mr-3">🚪</span>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* Login/Register Buttons */
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-lg bg-transparent border border-[#f57676] text-[#f57676] hover:bg-[#f57676] hover:text-white font-medium transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 rounded-lg bg-[#f57676] hover:bg-[#f14343] text-white font-medium shadow-lg transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-[#f57676] transition-colors duration-200 p-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#360c0c] border-t border-white/20">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {user ? mobileLoggedInNavOptions : mobileLoggedOutNavOptions}

                        {/* Mobile Auth Section */}
                        <div className="border-t border-white/20 pt-3 mt-3">
                            {user ? (
                                <div className="space-y-2">
                                    <div className="flex items-center px-4 py-2">
                                        <img
                                            src={user.photoURL || '/public/default-Profile.png'}
                                            alt={user.displayName || 'User'}
                                            className="w-8 h-8 rounded-full border border-[#f57676] object-cover mr-3"
                                        />
                                        <div>
                                            <div className="text-white text-sm font-medium">{user.displayName || 'User'}</div>
                                            <div className="text-gray-300 text-xs">{user.email}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleProfileClick}
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-[#4a1515] transition-colors"
                                    >
                                        👤 My Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-red-400 hover:bg-[#4a1515] transition-colors"
                                    >
                                        🚪 Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2 px-4">
                                    <Link
                                        to="/login"
                                        className="block w-full text-center py-2 rounded-lg border border-[#f57676] text-[#f57676] hover:bg-[#f57676] hover:text-white transition-all duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="block w-full text-center py-2 rounded-lg bg-[#f57676] text-white hover:bg-[#f14343] transition-all duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;