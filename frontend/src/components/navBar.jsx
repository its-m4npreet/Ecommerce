import { FaUser, FaSignInAlt, FaSearch ,FaHome ,FaHeart, FaShoppingCart} from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { IoHelpCircle } from "react-icons/io5";
import "./navBar.css";
import logo from "/logo.png"
import { NavLink } from "react-router-dom";
import { useState } from "react";
export const Navbar = () => {
    const[isLoggedIn ,setIsLoggedIn]=useState(true)
    return (
        <nav className="flex h-16 w-full justify-evenly items-center shadow-lg  gap-5 bg-[#071e35]">
            <Logo />
            <Search />
          {
            isLoggedIn ?<NavLinks />: <Auth />
          }
           
        </nav>
    );
}

const NavLinks =()=>{
return <div className="links flex gap-3">
                    <NavLink to="/home" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <FaHome />
                        Home
                    </NavLink>
                    <NavLink to="/shop" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <GiShoppingBag />
                        Shop
                    </NavLink>
                    <NavLink to="/about" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <FaCircleInfo />
                        About
                    </NavLink>
                    <NavLink to="/help" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <IoHelpCircle />
                        Help
                    </NavLink>
                    <NavLink to="/account" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <FaUser />
                        Account
                    </NavLink>
                    <NavLink to="/wishlist" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <FaHeart />
                        Wishlist
                    </NavLink>
                    <NavLink to="/cart" className="flex items-center gap-2 px-4 py-2 rounded font-medium text-white hover:text-cyan-400 transition-colors duration-200">
                        <FaShoppingCart />
                        Cart
                    </NavLink>
                </div>
}

const Auth=()=>{
    return  <div className="authLinks w-2xs flex gap-4 items-center justify-between ">
                <NavLink to="/login" className="login flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white transition shadow">
                    <FaSignInAlt />
                    Login
                </NavLink>
                <NavLink to="/profile" className="createUser flex items-center gap-2 px-4 py-2 rounded bg-green-600 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition shadow">
                    <FaUser />
                    Profile
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
    return <div className="w-16 h-16 flex items-center">
                <img src={logo} alt="logo" className="w-full h-full object-contain"/>
            </div>
}
