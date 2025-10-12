

import { FaShippingFast, FaHeadset, FaLock, FaUndo, FaUsers, FaStore } from "react-icons/fa";

export const About = () => (
  <div className="min-h-screen bg-[#18181b] flex flex-col items-center py-0 px-4 font-sans">
    {/* Hero Banner */}
    <div className="w-full h-20 md:h-32 relative flex items-center justify-center rounded-b-3xl overflow-hidden">
      <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-white text-center px-6 py-2 rounded-xl tracking-tight drop-shadow-xl">
        About <span className="text-blue-400">E-shoply</span>
      </h2>
    </div>

    {/* Description */}
    <div className="max-w-2xl w-full text-center mb-10 mt-10">
      <p className="text-lg text-gray-200 mb-6 font-normal">
        Welcome to <span className="font-bold text-blue-400">E-shoply</span>! We bring you the latest electronics, fashion, furniture, and more—all at unbeatable prices. Our mission is to make online shopping easy, affordable, and enjoyable for everyone in India.
      </p>
    </div>

    {/* Why Shop With Us? */}
    <div className="max-w-4xl w-full mb-14">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-8 tracking-tight">Why Shop With Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-[#23232a] rounded-xl p-6 flex flex-col items-center shadow-md">
          <FaShippingFast className="text-3xl text-blue-400 mb-2" />
          <h3 className="text-base font-semibold text-white mb-1">Fast & Free Delivery</h3>
          <p className="text-gray-400 text-center text-sm">Get your orders delivered quickly and at no extra cost, anywhere in India.</p>
        </div>
        <div className="bg-[#23232a] rounded-xl p-6 flex flex-col items-center shadow-md">
          <FaHeadset className="text-3xl text-blue-400 mb-2" />
          <h3 className="text-base font-semibold text-white mb-1">24/7 Support</h3>
          <p className="text-gray-400 text-center text-sm">Our friendly team is always here to help you with any questions or issues.</p>
        </div>
        <div className="bg-[#23232a] rounded-xl p-6 flex flex-col items-center shadow-md">
          <FaLock className="text-3xl text-blue-400 mb-2" />
          <h3 className="text-base font-semibold text-white mb-1">100% Secure Payments</h3>
          <p className="text-gray-400 text-center text-sm">Shop with confidence—your payments and data are always safe with us.</p>
        </div>
        <div className="bg-[#23232a] rounded-xl p-6 flex flex-col items-center shadow-md">
          <FaUndo className="text-3xl text-blue-400 mb-2" />
          <h3 className="text-base font-semibold text-white mb-1">Easy Returns</h3>
          <p className="text-gray-400 text-center text-sm">Not satisfied? Enjoy hassle-free returns and quick refunds on all orders.</p>
        </div>
      </div>
    </div>

    {/* Brand Story & Mission */}
    <div className="max-w-3xl w-full mx-auto mb-14  rounded-2xl  p-8 text-center">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Our Story & Mission</h2>
      <p className="text-gray-200 mb-4">
        Founded in 2025, <span className="font-bold text-blue-400">E-shoply</span> was created to revolutionize the way India shops online. We believe in quality, transparency, and putting our customers first. Our mission is to empower every Indian to shop smarter, safer, and happier.
      </p>
      <p className="text-gray-400 mb-2">
        <span className="font-semibold text-white">What makes us unique?</span> We offer the best prices, a huge selection, and a seamless shopping experience—backed by a passionate team that cares.
      </p>
    </div>

    {/* Team Section */}
    <div className="max-w-2xl w-full mx-auto mb-10 text-center">
      <h2 className="text-xl font-bold text-blue-400 mb-6">Meet Our Team</h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Card 1 */}
        <div className="bg-[#23232a] rounded-2xl shadow-md p-6 flex flex-col items-center w-60 hover:scale-105 transition-transform">
          <FaUsers className="text-4xl text-blue-400 mb-2" />
          <div className="text-white font-semibold text-base mb-1">Manpreet</div>
          <div className="text-gray-400 text-xs mb-2">Founder & CEO</div>
          <p className="text-gray-400 text-xs">Visionary leader passionate about customer experience and innovation.</p>
        </div>
        {/* Card 2 */}
        <div className="bg-[#23232a] rounded-2xl shadow-md p-6 flex flex-col items-center w-60 hover:scale-105 transition-transform">
          <FaStore className="text-4xl text-blue-400 mb-2" />
          <div className="text-white font-semibold text-base mb-1">E-shoply Team</div>
          <div className="text-gray-400 text-xs mb-2">Customer Success</div>
          <p className="text-gray-400 text-xs">Dedicated team ensuring your shopping journey is smooth and delightful.</p>
        </div>
      </div>
    </div>
  </div>
);
