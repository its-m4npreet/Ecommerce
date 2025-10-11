import React, { useState } from "react";
import { FaUser, FaSignInAlt, FaSearch ,FaHome ,FaHeart, FaShoppingCart, FaOpencart} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoHelpCircle } from "react-icons/io5";
import "./navBar.css";
// import logo from "/logo.png"
import { NavLink , useLocation } from "react-router-dom";
export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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

    return (
        <nav className="border-b border-gray-700 flex h-14 w-full justify-evenly items-center shadow-lg gap-5 bg-[#18181b]">
            <Logo />
            <Search />
            {isLoginPage ? (
                <div className="authLinks w-2xs flex gap-4 items-center justify-between ">
                    <NavLink to="/auth/register" className="createUser flex items-center gap-2 px-4 py-2 rounded border hover:border-gray-600" style={{ whiteSpace: 'nowrap' }}>
                        <FaUser />
                        Create Account
                    </NavLink>
                </div>
            ) : (isRegisterPage ? (
                <div className="authLinks w-2xs flex gap-4 items-center justify-between ">
                    <NavLink to="/auth/login" className="login flex items-center gap-2 px-3 py-2 rounded border border-gray-600">
                        <FaSignInAlt />
                        Login
                    </NavLink>
                </div>
            ) : isLoggedIn ? <NavLinks /> : <Auth />
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
        <div className="links flex gap-3">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaHome />
                Home
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaCircleInfo />
                About
            </NavLink>
            <NavLink
                to="/help"
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <IoHelpCircle />
                Help
            </NavLink>
            <NavLink
                to="/account"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaUser />
                Account
            </NavLink>
            <NavLink
                to="/wishlist"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaHeart />
                Wishlist
            </NavLink>
            <NavLink
                to="/trolley"
                onClick={handleProtectedRoute}
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaShoppingCart />
                Trolley
            </NavLink>
        </div>
    );
}

const Auth=()=>{
    return  <div className="authLinks w-2xs flex gap-4 items-center justify-between ">

                <NavLink to="/auth/login" className="login flex items-center gap-2 px-3 py-2 rounded border border-gray-600">
                    <FaSignInAlt />
                    Login
                </NavLink>
                    <NavLink to="/auth/register" className="createUser flex items-center gap-2 px-4 py-2 rounded border  hover:border-gray-600" style={{ WhiteSpace: 'nowrap'  }}>
                        <FaUser />
                    Register
                </NavLink>
            </div>
}

const Search =()=>{
    return <div className="searchBar w-120 h-10 flex items-center rounded shadow">
                <FaSearch className="ml-2 text-white" />
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="w-full h-full border-none outline-none px-3 bg-transparent"
                    placeholder="Search..."
                />
            </div>
}

const Logo=()=>{
    return <div className="w-12.5 h-12.5 flex items-center justify-center">
                <FaOpencart className="w-full h-full object-cover text-blue-400" />
            </div>
}


