import { FaUser, FaSignInAlt } from "react-icons/fa";
import "./navBar.css";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
    return (
        <nav className="flex h-16 w-full justify-evenly items-center shadow-lg px-6 gap-5 bg-[#0a2540]">
            <div className="logo w-16 h-16 flex items-center">
                <img src="/logo.png" alt="logo" className="w-12 h-12" />
            </div>
            <div className="searchBar w-120 h-10 flex items-center rounded shadow">
                <input
                    type="search"
                    name="search"
                    id="search"
                    className="w-full h-full border-none outline-none px-3 bg-transparent"
                    placeholder="Search..."
                />
            </div>
            <div className="authLinks w-2xs flex justify-between items-center">
             <NavLink to="/login" className="flex items-center w-5">
                 <FaSignInAlt className="mr-2" />
                 Login
             </NavLink>
             <NavLink to="/profile" className="flex items-center">
                 <FaUser className="mr-2" />
                 Profile
             </NavLink>
            </div>
        </nav>
    );
}
