import { FaFacebookF, FaInstagram, FaTwitter, FaCcVisa, FaCcMastercard, FaCcPaypal, FaApple, FaGooglePlay, FaShoppingBag, FaOpencart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './footer.css';
export const Footer = () => {
return (
    <footer className="bg-[#18181b] text-gray-200 pt-8 md:pt-12 pb-6 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-10">
            {/* Branding & App Download */}
            <div className="sm:col-span-2 lg:col-span-2 flex flex-col gap-3 md:gap-4">
                <div className="flex items-center gap-2 mb-2">
                    <FaOpencart className="text-xl md:text-2xl text-blue-500" />
                    <span className="text-xl md:text-2xl font-bold tracking-tight text-white">E-Shop</span>
                </div>
                <p className="text-gray-400 text-sm">
                    Your one-stop shop for the latest products and best deals. Shop with confidence and enjoy fast delivery!
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                    <a href="#" className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-xs font-semibold transition">
                        <FaApple className="text-lg" /> App Store
                    </a>
                    <a href="#" className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded text-xs font-semibold transition">
                        <FaGooglePlay className="text-lg" /> Google Play
                    </a>
                </div>
            </div>
            {/* Quick Links */}
            <div>
                <h3 className="text-base md:text-lg font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                    <li><NavLink to="/shop" className="hover:text-white transition-colors">Shop</NavLink></li>
                    <li><NavLink to="/about" className="hover:text-white transition-colors">About</NavLink></li>
                    <li><NavLink to="/contact" className="hover:text-white transition-colors">Contact</NavLink></li>
                    <li><NavLink to="/faq" className="hover:text-white transition-colors">FAQ</NavLink></li>
                    <li><NavLink to="/returns" className="hover:text-white transition-colors">Returns</NavLink></li>
                    <li><NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink></li>
                </ul>
            </div>
            {/* Customer Service */}
            <div>
                <h3 className="text-base md:text-lg font-bold mb-3">Customer Service</h3>
                <ul className="space-y-2 text-sm">
                    <li><NavLink to="/shipping" className="hover:text-white transition-colors">Shipping Info</NavLink></li>
                    <li><NavLink to="/track" className="hover:text-white transition-colors">Track Order</NavLink></li>
                    <li><NavLink to="/support" className="hover:text-white transition-colors">Support</NavLink></li>
                    <li><NavLink to="/terms" className="hover:text-white transition-colors">Terms & Conditions</NavLink></li>
                </ul>
            </div>
            {/* Newsletter & Social */}
            <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="text-base md:text-lg font-bold mb-3">Stay Connected</h3>
                <form className="flex flex-col gap-2 mb-3" onSubmit={e => e.preventDefault()}>
                    <label htmlFor="newsletter" className="sr-only">Email address</label>
                    <input 
                        id="newsletter" 
                        type="email" 
                        placeholder="Your email address" 
                        className="px-3 py-2 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                    />
                    <button 
                        type="submit" 
                        className="border-2 text-white rounded px-3 py-2 font-semibold transition hover:border-[#23232a] text-sm" 
                        style={{ borderColor: '#23232a' }}
                    >
                        Subscribe
                    </button>
                </form>
                <div className="flex justify-center sm:justify-start space-x-4 mb-3">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition-colors text-xl">
                        <FaFacebookF />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors text-xl">
                        <FaInstagram />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors text-xl">
                        <FaTwitter />
                    </a>
                </div>
                <div className="flex justify-center sm:justify-start space-x-3 text-xl md:text-2xl text-gray-400">
                    <FaCcVisa title="Visa" />
                    <FaCcMastercard title="Mastercard" />
                    <FaCcPaypal title="Paypal" />
                </div>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-6 md:mt-10 pt-4 text-center text-gray-400 text-xs md:text-sm">
            © {new Date().getFullYear()} E-Shop. All rights reserved.
        </div>
    </footer>
);
};