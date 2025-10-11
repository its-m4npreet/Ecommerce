
import { useState, useEffect } from "react";
import { useLoaderData, NavLink } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const Product = () => {
	const product = useLoaderData();
	const [showFullDesc, setShowFullDesc] = useState(false);
	const [related, setRelated] = useState([]);
	const [isInTrolley, setIsInTrolley] = useState(false);
	const [isInWishlist, setIsInWishlist] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [selectedSize, setSelectedSize] = useState('');
	const maxDescLength = 120;
	const isLong = product.description && product.description.length > maxDescLength;
	const shortDesc = isLong ? product.description.slice(0, maxDescLength) + "..." : product.description;

	// Check if product is already in trolley and wishlist
	useEffect(() => {
		const trolleyIds = JSON.parse(localStorage.getItem('trolley')) || [];
		const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
		const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
		const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
		
		setIsInTrolley(trolleyIds.includes(product.id));
		setIsInWishlist(wishlistIds.includes(product.id));
		
		// Set size - prioritize trolley details, then wishlist details, then default
		if (product.sizes && product.sizes.length > 0) {
			if (trolleyDetails[product.id] && trolleyDetails[product.id].size) {
				// Use saved size from trolley details (highest priority)
				setSelectedSize(trolleyDetails[product.id].size);
				// Also restore quantity if available
				if (trolleyDetails[product.id].quantity) {
					setQuantity(trolleyDetails[product.id].quantity);
				}
			} else if (wishlistDetails[product.id] && wishlistDetails[product.id].size) {
				// Use saved size from wishlist details (second priority)
				setSelectedSize(wishlistDetails[product.id].size);
				// Also restore quantity from wishlist if available
				if (wishlistDetails[product.id].quantity) {
					setQuantity(wishlistDetails[product.id].quantity);
				}
			} else {
				// Set first size as default (lowest priority)
				setSelectedSize(product.sizes[0]);
			}
		}
	}, [product.id, product.sizes]);

	useEffect(() => {
		async function fetchRelated() {
			try {
				const res = await fetch("http://localhost:8080/api/products");
				if (!res.ok) throw new Error("Failed to fetch products");
				const all = await res.json();
				// Filter by same category, exclude current product
				const rel = all.filter(
					p => p.id !== product.id && p.category && product.category && p.category.name?.toLowerCase() === product.category.name?.toLowerCase()
				).slice(0, 6); // limit to 6
				setRelated(rel);
			} catch (e) {
				console.error("Error fetching related products:", e);
				setRelated([]);
			}
		}
		fetchRelated();
	}, [product]);

	const handleAddToTrolley = () => {
		const trolleyIds = JSON.parse(localStorage.getItem('trolley')) || [];
		const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
		
		if (isInTrolley) {
			// Remove from trolley
			const updatedTrolleyIds = trolleyIds.filter(id => id !== product.id);
			localStorage.setItem('trolley', JSON.stringify(updatedTrolleyIds));
			
			// Remove from trolley details
			delete trolleyDetails[product.id];
			localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
			
			setIsInTrolley(false);
		} else {
			// Add to trolley with quantity
			for (let i = 0; i < quantity; i++) {
				trolleyIds.push(product.id);
			}
			localStorage.setItem('trolley', JSON.stringify(trolleyIds));
			
			// Store product details including selected size and quantity
			trolleyDetails[product.id] = {
				size: selectedSize,
				quantity: quantity,
				addedAt: new Date().toISOString()
			};
			localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
			
			setIsInTrolley(true);
		}
	};

	const handleAddToWishlist = () => {
		const wishlistIds = JSON.parse(localStorage.getItem('wishlist')) || [];
		const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
		
		if (isInWishlist) {
			// Remove from wishlist
			const updatedWishlistIds = wishlistIds.filter(id => id !== product.id);
			localStorage.setItem('wishlist', JSON.stringify(updatedWishlistIds));
			
			// Remove from wishlist details
			delete wishlistDetails[product.id];
			localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
			
			setIsInWishlist(false);
		} else {
			// Add to wishlist
			wishlistIds.push(product.id);
			localStorage.setItem('wishlist', JSON.stringify(wishlistIds));
			
			// Store product details including selected size and quantity
			wishlistDetails[product.id] = {
				size: selectedSize,
				quantity: quantity,
				addedAt: new Date().toISOString()
			};
			localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
			
			setIsInWishlist(true);
		}
	};

	const incrementQuantity = () => {
		setQuantity(prev => {
			const newQuantity = prev + 1;
			updateQuantityInStorage(newQuantity);
			return newQuantity;
		});
	};

	const decrementQuantity = () => {
		setQuantity(prev => {
			const newQuantity = prev > 1 ? prev - 1 : 1;
			updateQuantityInStorage(newQuantity);
			return newQuantity;
		});
	};

	const updateQuantityInStorage = (newQuantity) => {
		// Update trolley details if product is in trolley
		if (isInTrolley) {
			const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
			if (trolleyDetails[product.id]) {
				trolleyDetails[product.id].quantity = newQuantity;
				localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
			}
		}

		// Update wishlist details if product is in wishlist
		if (isInWishlist) {
			const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
			if (wishlistDetails[product.id]) {
				wishlistDetails[product.id].quantity = newQuantity;
				localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
			}
		}
	};

	const handleSizeChange = (size) => {
		setSelectedSize(size);
		
		// Update trolley details if product is already in trolley
		if (isInTrolley) {
			const trolleyDetails = JSON.parse(localStorage.getItem('trolleyDetails')) || {};
			if (trolleyDetails[product.id]) {
				trolleyDetails[product.id].size = size;
				localStorage.setItem('trolleyDetails', JSON.stringify(trolleyDetails));
			}
		}
		
		// Update wishlist details if product is already in wishlist
		if (isInWishlist) {
			const wishlistDetails = JSON.parse(localStorage.getItem('wishlistDetails')) || {};
			if (wishlistDetails[product.id]) {
				wishlistDetails[product.id].size = size;
				wishlistDetails[product.id].quantity = quantity; // Also update quantity
				localStorage.setItem('wishlistDetails', JSON.stringify(wishlistDetails));
			}
		}
	};
	// console.log(product);



	return (
		<div className="flex  flex-col justify-center items-center min-h-[80vh] bg-[#18181b] py-12 gap-5">
			<div className=" rounded-2xl max-w-5xl w-full flex flex-col md:flex-row overflow-hidden">
				<div className="md:w-1/2 flex items-center justify-center p-8">
					<img
						src={Array.isArray(product.images) ? product.images[0] : product.images}
						alt={product.title}
						className="object-contain w-full h-80 rounded-xl shadow-lg "
					/>
				</div>
				<div className="md:w-1/2 p-8 flex flex-col text-white">
					<h1 className="text-2xl font-bold mb-4 text-white ">{product.title}</h1>
					
					{/* Rating */}
					<div className="flex items-center mb-4">
						<div className="flex text-yellow-400 mr-2">
							★★★★☆
						</div>
						<span className="text-gray-400 text-sm">(4.0 rating)</span>
					</div>

					{/* Price */}
					<div className="mb-4">
						<span className="text-3xl text-green-400 font-bold">₹{(product.price * 80).toLocaleString()}</span>
						<span className="text-gray-400 line-through ml-3 text-lg">₹{Math.round(product.price * 80 * 1.2).toLocaleString()}</span>
						<span className="text-green-400 ml-2 text-sm font-semibold">20% OFF</span>
					</div>

					{/* Description */}
					<p className="text-gray-300 mb-6 text-sm leading-relaxed">
						{showFullDesc || !isLong ? product.description : shortDesc}
						{isLong && !showFullDesc && (
							<a
								className="ml-2 cursor-pointer text-blue-400 underline hover:text-blue-300 text-sm font-semibold"
								onClick={() => setShowFullDesc(true)}
							>
								Read more
							</a>
						)}
						{isLong && showFullDesc && (
							<a
								className="ml-2 cursor-pointer text-blue-400 underline hover:text-blue-300 text-sm font-semibold"
								onClick={() => setShowFullDesc(false)}
							>
								Show less
							</a>
						)}
					</p>

					{/* Size Selection */}
					{product.sizes && product.sizes.length > 0 && (
						<div className="mb-4">
							<div className="text-sm font-semibold mb-2">Size</div>
							<div className="flex gap-2 flex-wrap">
								{product.sizes.map((size) => (
									<span
										key={size}
										onClick={() => handleSizeChange(size)}
										className={`px-4 py-2 border rounded-lg text-sm transition-colors cursor-pointer ${
											size === selectedSize 
												? 'bg-blue-600 text-white border-blue-600' 
												: 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700'
										}`}
									>
										{size}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Quantity Selection */}
					<div className="mb-6 flex items-center gap-6">
						<div className="text-sm font-semibold  flex items-center">Quantity</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center  rounded-lg">
								<span
									onClick={decrementQuantity}
									className="px-3 py-2 hover:bg-gray-800 transition-colors cursor-pointer "
								>
									−
								</span>
								<span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
								<span
									onClick={incrementQuantity}
									className="px-3 py-2 hover:bg-gray-800 transition-colors cursor-pointer"
								>
									+
								</span>
							</div>
						</div>
					</div>

					{/* Action Buttons */}
					<div className="flex w-full gap-3 mt-auto">
						<span 
							onClick={handleAddToTrolley}
							className="p-3 rounded-lg border transition-all duration-200 text-sm border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center justify-center cursor-pointer"
						>
							{isInTrolley ? 'REMOVE FROM TROLLEY' : 'ADD TO TROLLEY'}
						</span>
						<span
							onClick={handleAddToWishlist}
							className="p-3 rounded-lg border transition-all duration-200 text-sm border-gray-600 text-gray-300 hover:bg-gray-800 flex items-center justify-center cursor-pointer"
						>
							{isInWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
						</span>
					</div>

					{/* Product Features */}
					{/* <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-700">
						<div className="text-center">
							<div className="text-2xl mb-1">🚚</div>
							<div className="text-xs text-gray-400">Free Shipping</div>
						</div>
						<div className="text-center">
							<div className="text-2xl mb-1">↩️</div>
							<div className="text-xs text-gray-400">Free Returns</div>
						</div>
						<div className="text-center">
							<div className="text-2xl mb-1">🛡️</div>
							<div className="text-xs text-gray-400">Secure Payment</div>
						</div>
						<div className="text-center">
							<div className="text-2xl mb-1">✅</div>
							<div className="text-xs text-gray-400">Quality Assured</div>
						</div>
					</div> */}
				</div>
			</div>

			<div className="relatedImages w-full max-w-5xl">
				<h2 className="text-lg font-bold mb-4 text-white">RELATED PRODUCTS</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
					{related.length === 0 && (
						<div className="col-span-full text-gray-400 text-center">NO RELATED PRODUCTS FOUND</div>
					)}
					{related.map(rp => (
						<NavLink to={`/product/${rp.id}`} key={rp.id} className="block">
							<div className="border border-gray-800 rounded-lg shadow flex flex-col items-center p-4 hover:shadow-xl transition">
								<img src={Array.isArray(rp.images) ? rp.images[0] : rp.images} alt={rp.title} className="object-contain w-full h-35 mb-2 rounded" />
								<div className="text-white font-semibold text-base truncate w-full text-center">{rp.title}</div>
								<div className="text-green-400 font-bold text-lg">₹{(rp.price * 80).toLocaleString()}</div>
							</div>
						</NavLink>
					))}
				</div>
			</div>
		</div>
	);
}
