import { FaUser, FaSignInAlt, FaSearch ,FaHome ,FaHeart, FaShoppingCart, FaOpencart} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoHelpCircle } from "react-icons/io5";
import "./navBar.css";
// import logo from "/logo.png"
import { NavLink , useLocation } from "react-router-dom";
import { useState } from "react";
export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/auth/login" || location.pathname === "/auth/login";
    const isRegisterPage = location.pathname === "/auth/register" || location.pathname === "/auth/register";

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
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaUser />
                Account
            </NavLink>
            <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded font-medium transition-colors duration-200 ${isActive ? "active" : "text-white hover:text-cyan-400"}`
                }
            >
                <FaHeart />
                Wishlist
            </NavLink>
            <NavLink
                to="/trolley"
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


