import React, { useState, useEffect } from "react";
import { FaRegHeart, FaTrashAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Wishlist = () => {
	const [products, setProducts] = useState([]);
	const [wishlist, setWishlist] = useState([]);
	const [wishlistDetails, setWishlistDetails] = useState({});

	useEffect(() => {
		// Fetch all products from backend
		fetch('http://localhost:8080/api/products')
			.then(res => res.json())
			.then(data => setProducts(data));
	}, []);

	useEffect(() => {
		// Get wishlist details from localStorage
		const details = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
		setWishlistDetails(details);
	}, [wishlist]);

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
		
		// Also remove from wishlist details
		const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
		delete wishlistDetails[id];
		localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
		
		setWishlist(wishlist.filter(item => item.id !== id));
	};
	const handleTrolley = (item) => {
		const trolley = JSON.parse(localStorage.getItem('trolley')) || [];
		if (!trolley.includes(item.id)) {
			// Transfer wishlist details to trolley details first to get quantity
			const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
			const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
			
			let quantityToAdd = 1; // Default quantity
			
			if (wishlistDetails[item.id]) {
				quantityToAdd = wishlistDetails[item.id].quantity || 1;
				trolleyDetails[item.id] = {
					size: wishlistDetails[item.id].size,
					quantity: quantityToAdd,
					addedAt: new Date().toISOString()
				};
				localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
			}
			
			// Add to trolley array based on quantity (add multiple instances)
			for (let i = 0; i < quantityToAdd; i++) {
				trolley.push(item.id);
			}
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
							 <NavLink to={`/product/${item.id}`}  className="block w-full h-full">
							<img src={item.image || item.images} alt={item.title} className="object-cover w-full h-56" />
							</NavLink>
						</div>
						<div className="p-4 flex-1 flex flex-col justify-between gap-1">
							<h2 className="text-lg font-semibold text-gray-100 mb-2 truncate">{item.title}</h2>
							{(wishlistDetails[item.id]?.size || wishlistDetails[item.id]?.quantity) && (
								<div className="mb-1 flex gap-2">
									{wishlistDetails[item.id]?.size && (
										<span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded">
											Size: {wishlistDetails[item.id].size}
										</span>
									)}
									{wishlistDetails[item.id]?.quantity && (
										<span className="bg-[#444] text-gray-200 text-xs px-2 py-0.5 rounded">
											Qty: {wishlistDetails[item.id].quantity}
										</span>
									)}
								</div>
							)}
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
					<div className="col-span-full flex flex-col items-center justify-center py-16 px-6">
						<FaRegHeart className="text-6xl mb-6 text-gray-600" />
						<h3 className="text-2xl font-semibold text-white mb-4">
							No Items in Wishlist
						</h3>
						<p className="text-gray-400 text-center mb-8 max-w-md">
							You haven't added any items to your wishlist yet. Start browsing to discover products you love!
						</p>
						<NavLink
							to="/"
							className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
						>
							Start Shopping
						</NavLink>
					</div>
				)}
			</div>
		</div>
	);
};

export default Wishlist;
