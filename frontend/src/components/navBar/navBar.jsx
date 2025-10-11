import React, { useState } from "react";
import { FaUser, FaSignInAlt, FaSearch ,FaHome ,FaHeart, FaShoppingCart, FaOpencart, FaBars, FaTimes} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoHelpCircle } from "react-icons/io5";
import "./navBar.css";
// import logo from "/logo.png"
import { NavLink , useLocation } from "react-router-dom";
export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/auth/login" || location.pathname === "/auth/login";
    const isRegisterPage = location.pathname === "/auth/register" || location.pathname === "/auth/register";

    // Check localStorage for user or token on every render
    React.useEffect(() => {
        const checkAuth = () => {
            const userStr = localStorage.getItem('user');
            const token = localStorage.getItem('token') || localStorage.getItem('authToken');
            
            // More thorough validation
            let hasValidUser = false;
            
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);
                    // Check if user object has essential properties
                    hasValidUser = user && (user._id || user.id) && user.email;
                } catch (error) {
                    console.warn('Invalid user data in localStorage:', error);
                    localStorage.removeItem('user');
                }
            }
            
            const hasValidToken = !!token;
            
            // Only consider logged in if we have both valid user data AND token
            const isAuthenticated = hasValidUser && hasValidToken;
            
            setIsLoggedIn(isAuthenticated);
            
            // If user data is invalid but we're on a protected route, redirect
            if (!isAuthenticated && (
                location.pathname === '/account' || 
                location.pathname === '/wishlist' || 
                location.pathname === '/trolley'
            )) {
                console.log('Invalid user session detected, cleaning up...');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('authToken');
                // Dispatch event to notify other components
                window.dispatchEvent(new Event('userLoggedOut'));
            }
        };
        
        // Initial check
        checkAuth();
        
        // Listen for storage changes (when localStorage is updated from other tabs)
        window.addEventListener('storage', checkAuth);
        
        // Listen for custom events (when user logs out or login state changes)
        window.addEventListener('userLoggedOut', checkAuth);
        window.addEventListener('userLoggedIn', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('userLoggedOut', checkAuth);
            window.removeEventListener('userLoggedIn', checkAuth);
        };
    }, [location.pathname]);

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('nav')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <nav className="border-b border-gray-700 bg-[#18181b] shadow-lg relative">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex h-14 w-full justify-evenly items-center gap-5 px-4">
                <Logo />
                <Search />
                {isLoginPage ? (
                    <div className="authLinks w-2xs flex gap-4 items-center justify-between">
                        <NavLink to="/auth/register" className="createUser flex items-center gap-2 px-4 py-2 rounded border hover:border-gray-600" style={{ whiteSpace: 'nowrap' }}>
                            <FaUser />
                            Create Account
                        </NavLink>
                    </div>
                ) : (isRegisterPage ? (
                    <div className="authLinks w-2xs flex gap-4 items-center justify-between">
                        <NavLink to="/auth/login" className="login flex items-center gap-2 px-3 py-2 rounded border border-gray-600">
                            <FaSignInAlt />
                            Login
                        </NavLink>
                    </div>
                ) : isLoggedIn ? <NavLinks /> : <Auth />
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex h-14 w-full justify-between items-center px-4">
                <Logo />
                
                {/* Mobile Search - Smaller */}
                <div className="flex-1 mx-4">
                    <MobileSearch />
                </div>
                
                {/* Mobile Menu Button - Animated Hamburger */}
                <div 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="hamburger-menu p-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                    aria-label="Toggle menu"
                >
                    <div className={`hamburger-icon ${isMobileMenuOpen ? 'open' : ''}`}>
                        <span className="line1"></span>
                        <span className="line2"></span>
                        <span className="line3"></span>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-14 left-0 right-0 bg-[#18181b] border-b border-gray-700 shadow-lg z-[9999]">
                    <div className="px-4 py-4 space-y-3">
                        {isLoginPage ? (
                            <NavLink 
                                to="/auth/register" 
                                className="flex items-center gap-2 px-4 py-3 rounded border hover:border-gray-600 text-white hover:text-cyan-400 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaUser />
                                Create Account
                            </NavLink>
                        ) : (isRegisterPage ? (
                            <NavLink 
                                to="/auth/login" 
                                className="flex items-center gap-2 px-4 py-3 rounded border border-gray-600 text-white hover:text-cyan-400 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <FaSignInAlt />
                                Login
                            </NavLink>
                        ) : isLoggedIn ? <MobileNavLinks onLinkClick={() => setIsMobileMenuOpen(false)} /> : <MobileAuth onLinkClick={() => setIsMobileMenuOpen(false)} />
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

const NavLinks = () => {
    const handleProtectedRoute = (e) => {
        // Double-check user data before navigating to protected routes
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        
        if (!userStr || !token) {
            e.preventDefault();
            localStorage.clear();
            window.dispatchEvent(new Event('userLoggedOut'));
            window.location.href = '/auth/login';
            return;
        }
        
        try {
            const user = JSON.parse(userStr);
            if (!user || (!user._id && !user.id) || !user.email) {
                e.preventDefault();
                localStorage.clear();
                window.dispatchEvent(new Event('userLoggedOut'));
                window.location.href = '/auth/login';
            }
        } catch {
            e.preventDefault();
            localStorage.clear();
            window.dispatchEvent(new Event('userLoggedOut'));
            window.location.href = '/auth/login';
        }
    };

    return (
        <div className="links flex gap-2 lg:gap-3">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaHome />
                <span className="hidden md:inline">Home</span>
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaCircleInfo />
                <span className="hidden md:inline">About</span>
            </NavLink>
            <NavLink
                to="/help"
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <IoHelpCircle />
                <span className="hidden md:inline">Help</span>
            </NavLink>
            <NavLink
                to="/account"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaUser />
                <span className="hidden md:inline">Account</span>
            </NavLink>
            <NavLink
                to="/wishlist"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaHeart />
                <span className="hidden md:inline">Wishlist</span>
            </NavLink>
            <NavLink
                to="/trolley"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded font-medium transition-colors duration-200 text-sm lg:text-base ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaShoppingCart />
                <span className="hidden md:inline">Trolley</span>
            </NavLink>
        </div>
    );
}

const MobileNavLinks = ({ onLinkClick }) => {
    const handleProtectedRoute = (e) => {
        // Double-check user data before navigating to protected routes
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token') || localStorage.getItem('authToken');
        
        if (!userStr || !token) {
            e.preventDefault();
            localStorage.clear();
            window.dispatchEvent(new Event('userLoggedOut'));
            window.location.href = '/auth/login';
            return;
        }
        
        try {
            const user = JSON.parse(userStr);
            if (!user || (!user._id && !user.id) || !user.email) {
                e.preventDefault();
                localStorage.clear();
                window.dispatchEvent(new Event('userLoggedOut'));
                window.location.href = '/auth/login';
            }
        } catch {
            e.preventDefault();
            localStorage.clear();
            window.dispatchEvent(new Event('userLoggedOut'));
            window.location.href = '/auth/login';
        }
    };

    return (
        <div className="space-y-2">
            <NavLink
                to="/"
                onClick={onLinkClick}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <FaHome />
                Home
            </NavLink>
            <NavLink
                to="/about"
                onClick={onLinkClick}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <FaCircleInfo />
                About
            </NavLink>
            <NavLink
                to="/help"
                onClick={onLinkClick}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <IoHelpCircle />
                Help
            </NavLink>
            <NavLink
                to="/account"
                onClick={(e) => {
                    handleProtectedRoute(e);
                    onLinkClick();
                }}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <FaUser />
                Account
            </NavLink>
            <NavLink
                to="/wishlist"
                onClick={(e) => {
                    handleProtectedRoute(e);
                    onLinkClick();
                }}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <FaHeart />
                Wishlist
            </NavLink>
            <NavLink
                to="/trolley"
                onClick={(e) => {
                    handleProtectedRoute(e);
                    onLinkClick();
                }}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded font-medium transition-colors duration-200 ${isActive ? "bg-cyan-600 text-white" : "text-white hover:text-cyan-400 hover:bg-gray-800"}`
                }
            >
                <FaShoppingCart />
                Trolley
            </NavLink>
        </div>
    );
}

const Auth = () => {
    return (
        <div className="authLinks w-2xs flex gap-2 lg:gap-4 items-center justify-between">
            <NavLink to="/auth/login" className="login flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded border border-gray-600 text-sm lg:text-base">
                <FaSignInAlt />
                Login
            </NavLink>
            <NavLink to="/auth/register" className="createUser flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-2 rounded border hover:border-gray-600 text-sm lg:text-base" style={{ whiteSpace: 'nowrap' }}>
                <FaUser />
                Register
            </NavLink>
        </div>
    );
}

const MobileAuth = ({ onLinkClick }) => {
    return (
        <div className="space-y-2">
            <NavLink 
                to="/auth/login" 
                onClick={onLinkClick}
                className="flex items-center gap-3 px-4 py-3 rounded border border-gray-600 text-white hover:text-cyan-400 hover:bg-gray-800 transition-colors"
            >
                <FaSignInAlt />
                Login
            </NavLink>
            <NavLink 
                to="/auth/register" 
                onClick={onLinkClick}
                className="flex items-center gap-3 px-4 py-3 rounded border hover:border-gray-600 text-white hover:text-cyan-400 hover:bg-gray-800 transition-colors"
            >
                <FaUser />
                Register
            </NavLink>
        </div>
    );
}

const Search = () => {
    return (
        <div className="searchBar w-120 h-10 flex items-center rounded shadow border border-gray-600">
            <FaSearch className="ml-2 text-white" />
            <input
                type="search"
                name="search"
                id="search"
                className="w-full h-full border-none outline-none px-3 bg-transparent text-white placeholder-gray-400"
                placeholder="Search..."
            />
        </div>
    );
}

const MobileSearch = () => {
    return (
        <div className="searchBar h-8 flex items-center rounded shadow border border-gray-600">
            <FaSearch className="ml-2 text-white text-sm" />
            <input
                type="search"
                name="search"
                id="mobile-search"
                className="w-full h-full border-none outline-none px-2 bg-transparent text-white placeholder-gray-400 text-sm"
                placeholder="Search..."
            />
        </div>
    );
}

const Logo = () => {
    return (
        <div className="w-8 h-8 lg:w-12 lg:h-12 flex items-center justify-center">
            <FaOpencart className="w-full h-full object-cover text-blue-400" />
        </div>
    );
}


