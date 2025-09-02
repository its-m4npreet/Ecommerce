
import { FaShippingFast, FaHeadset, FaLock, FaUndo, FaUsers, FaFacebook, FaInstagram, FaTwitter, FaStore } from "react-icons/fa";

export const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center py-0 px-4">
    {/* Hero Banner */}
    <div className="w-full h-24 md:h-80 bg-cover bg-center flex items-center justify-center mb-8 rounded-b-3xl " style={{backgroundImage: 'url("https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=1200&q=80")'}}>
      <h2 className="text-5xl md:text-6xl font-bold text-blue-400 drop-shadow-lg text-center  px-6 py-2 rounded-xl">About <span className="text-white">E-Shop</span></h2>
    </div>

    {/* Description */}
    <div className="max-w-3xl w-full text-center mb-10">
      <p className="text-xl text-gray-200 mb-6 font-medium">
        Welcome to <span className="font-bold text-blue-400">E-Shop</span>! We bring you the latest electronics, fashion, furniture, and more—all at unbeatable prices. Our mission is to make online shopping easy, affordable, and enjoyable for everyone in India.
      </p>
    </div>

    {/* Why Shop With Us? */}
    <div className="max-w-5xl w-full mb-12">
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">Why Shop With Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <FaShippingFast className="text-4xl text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Fast & Free Delivery</h3>
          <p className="text-gray-300 text-center">Get your orders delivered quickly and at no extra cost, anywhere in India.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <FaHeadset className="text-4xl text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">24/7 Support</h3>
          <p className="text-gray-300 text-center">Our friendly team is always here to help you with any questions or issues.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <FaLock className="text-4xl text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">100% Secure Payments</h3>
          <p className="text-gray-300 text-center">Shop with confidence—your payments and data are always safe with us.</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center shadow-lg">
          <FaUndo className="text-4xl text-blue-400 mb-3" />
          <h3 className="text-lg font-bold text-white mb-2">Easy Returns</h3>
          <p className="text-gray-300 text-center">Not satisfied? Enjoy hassle-free returns and quick refunds on all orders.</p>
        </div>
      </div>
    </div>

    {/* Brand Story & Mission */}
    <div className="max-w-4xl w-full mx-auto mb-12 bg-white/10 rounded-2xl shadow-xl p-8 text-center">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Our Story & Mission</h2>
      <p className="text-gray-200 mb-4">
        Founded in 2025, <span className="font-bold text-blue-400">E-Shop</span> was created to revolutionize the way India shops online. We believe in quality, transparency, and putting our customers first. Our mission is to empower every Indian to shop smarter, safer, and happier.
      </p>
      <p className="text-gray-300 mb-2">
        <span className="font-semibold text-white">What makes us unique?</span> We offer the best prices, a huge selection, and a seamless shopping experience—backed by a passionate team that cares.
      </p>
    </div>

    {/* Team Section (optional) */}
    <div className="max-w-3xl w-full mx-auto mb-12 text-center">
      <h2 className="text-2xl font-bold text-blue-400 mb-6">Meet Our Team</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Card 1 */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 hover:scale-105 transition-transform">
          <FaUsers className="text-5xl text-blue-400 mb-3" />
          <div className="text-white font-semibold text-lg mb-1">Manpreet</div>
          <div className="text-gray-400 text-sm mb-2">Founder & CEO</div>
          <p className="text-gray-300 text-xs">Visionary leader passionate about customer experience and innovation.</p>
        </div>
        {/* Card 2 */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center w-64 hover:scale-105 transition-transform">
          <FaStore className="text-5xl text-blue-400 mb-3" />
          <div className="text-white font-semibold text-lg mb-1">E-Shop Team</div>
          <div className="text-gray-400 text-sm mb-2">Customer Success</div>
          <p className="text-gray-300 text-xs">Dedicated team ensuring your shopping journey is smooth and delightful.</p>
        </div>
      </div>
    </div>

    {/* Contact & Social */}
    {/* <div className="max-w-3xl w-full mx-auto mb-16 text-center">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">Contact <span className="text-white">&</span> Connect</h2>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-4">
        <a href="mailto:support@eshop.com" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition">Email Support</a>
        <a href="/contact" className="bg-white/20 hover:bg-blue-600 hover:text-white text-blue-400 font-bold py-2 px-6 rounded-lg border border-blue-400 transition">Contact Form</a>
      </div>
    </div> */}
  </div>
);
