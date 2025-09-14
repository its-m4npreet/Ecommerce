import React, { useState, useEffect } from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";


const Wishlist = () => {
	const [products, setProducts] = useState([]);
	const [wishlist, setWishlist] = useState([]);

	useEffect(() => {
		// Fetch all products from backend
		fetch('http://localhost:8080/api/products')
			.then(res => res.json())
			.then(data => setProducts(data));
	}, []);

	useEffect(() => {
		// Get wishlist product IDs from localStorage
		const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
		// Filter products to only those in wishlist
		const wishlistProducts = products.filter(product => wishlistIds.includes(product.id));
		setWishlist(wishlistProducts);
	}, [products]);

	const removeFromWishlist = (id) => {
		const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
		const updatedWishlistIds = wishlistIds.filter(wid => wid !== id);
		localStorage.setItem('wishlist', JSON.stringify(updatedWishlistIds));
		setWishlist(wishlist.filter(item => item.id !== id));
	};
	const handleTrolley = (item) => {
		const trolley = JSON.parse(localStorage.getItem('trolley')) || [];
		if (!trolley.includes(item.id)) {
			trolley.push(item.id);
			localStorage.setItem('trolley', JSON.stringify(trolley));
			removeFromWishlist(item.id);
		}
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
							<img src={item.image || item.images} alt={item.title} className="object-cover w-full h-56" />
						</div>
						<div className="p-4 flex-1 flex flex-col justify-between gap-1">
							<h2 className="text-lg font-semibold text-gray-100 mb-2 truncate">{item.title}</h2>
							<div className="text-[gray] font-bold text-base">₹ {(item.price * 80).toLocaleString()}</div>
							<div className="flex justify-between items-center mt-auto">
								<button className="ml-2 p-2 rounded-full bg-gray-800 hover:bg-pink-500 transition-colors text-gray-300 hover:text-white shadow group-hover:scale-110" onClick={()=>{handleTrolley(item)}}> 
									ADD TO TROLLEY
								</button>
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
