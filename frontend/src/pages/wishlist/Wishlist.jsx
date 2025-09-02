import React from "react";
import { FaRegHeart } from "react-icons/fa";

// Dummy wishlist data
const wishlist = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1513708927688-890fe8c7b8c3?auto=format&fit=crop&w=200&q=80",
    title: "Wireless Headphones",
    price: 2499,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=200&q=80",
    title: "Smart Watch",
    price: 3999,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=200&q=80",
    title: "Bluetooth Speaker",
    price: 1299,
  },
];

const Wishlist = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10 px-4 flex flex-col items-center">
    <h1 className="text-4xl font-extrabold text-gray-200 mb-8 flex items-center gap-2">
      <FaRegHeart className="text-gray-400" /> Wishlist
    </h1>
    <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {wishlist.length > 0 ? wishlist.map(item => (
        <div key={item.id} className="bg-[#232326] rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
          <div className="aspect-w-1 aspect-h-1 bg-gray-900 flex items-center justify-center">
            <img src={item.image} alt={item.title} className="object-cover w-full h-56" />
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <h2 className="text-lg font-semibold text-gray-100 mb-2 truncate">{item.title}</h2>
            <div className="flex justify-between items-center">
              <div className="text-gray-300 font-bold text-xl mb-2">₹{item.price.toLocaleString()}</div>
              <FaRegHeart className="w-6 h-6 text-gray-500" title="Wishlisted" />
            </div>
          </div>
        </div>
      )) : (
        <div className="col-span-full text-center text-gray-400 text-lg py-12">No items in your wishlist.</div>
      )}
    </div>
  </div>
);

export default Wishlist;