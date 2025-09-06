import React, { useState } from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";


const initialWishlist = [
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


const Wishlist = () => {
	const [wishlist, setWishlist] = useState(initialWishlist);

	const removeFromWishlist = (id) => {
		setWishlist(wishlist.filter(item => item.id !== id));
	};

	return (
		<div className="min-h-screen bg-[#18181b] py-10 px-4 flex flex-col items-center">
			<h2 className="font-bold text-gray-200 mb-10 w-5xl text-left ">MY WISHLIST ({wishlist.length})</h2>
			<div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
				{wishlist.length > 0 ? wishlist.map(item => (
					<div
						key={item.id}
						className="bg-[#232326] rounded-xl overflow-hidden flex flex-col border border-gray-700"
					>
						<div className="aspect-w-1 aspect-h-1 bg-gray-900 flex items-center justify-center">
							<img src={item.image} alt={item.title} className="object-cover w-full h-56" />
						</div>
						<div className="p-4 flex-1 flex flex-col justify-between">
							<h2 className="text-lg font-semibold text-gray-100 mb-2 truncate">{item.title}</h2>
							<div className="flex justify-between items-center mt-auto">
								<div className="text-gray-300 font-bold text-xl">₹ {item.price.toLocaleString()}</div>
								<button
									className="ml-2 p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors text-gray-300 hover:text-white shadow group-hover:scale-110"
									title="Remove from wishlist"
									onClick={() => removeFromWishlist(item.id)}
								>
									<FaTrashAlt />
								</button>
							</div>
						</div>
					</div>
				)) : (
					<div className="col-span-full text-center text-gray-400 text-lg py-16 flex flex-col items-center">
						<FaRegHeart className="text-5xl mb-4 text-gray-600" />
						<div>No items in your wishlist.</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wishlist;
