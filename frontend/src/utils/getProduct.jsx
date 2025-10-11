import { NavLink, useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

export const GetProducts = ({ selectedCategory = "All" }) => {
    const [wishlist, setWishlist] = useState(() => {
        const stored = localStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });
    // const [likedProducts, setLikedProducts] = useState([]);
    const [animatingId, setAnimatingId] = useState(null);
    const [msg, setMsg] = useState("");
    const products = useLoaderData();
    const getCategoryName = (cat) => cat.toLowerCase();
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product =>
            product.category &&
            getCategoryName(product.category.name) === getCategoryName(selectedCategory)
        );
    const toggleLike = (productId) => {
        setAnimatingId(productId);
        setTimeout(() => setAnimatingId(null), 500); // Animation duration
        setWishlist(prevWishlist => {
            let updated;
            if (prevWishlist.includes(productId)) {
                updated = prevWishlist.filter(id => id !== productId);
                setMsg("Removed from wishlist");
            } else {
                updated = [...prevWishlist, productId];
                setMsg("Added to wishlist");
            }
            localStorage.setItem('wishlist', JSON.stringify(updated));
            setTimeout(() => setMsg(""), 1200);
            return updated;
        });
    };
    return (
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
            {msg && (
                <div className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl shadow-lg z-50 text-sm sm:text-base lg:text-lg font-semibold animate-bounce max-w-xs sm:max-w-none text-center">{msg}</div>
            )}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <div className="bg-[#2e2e30] rounded-lg sm:rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 hover:scale-105 min-h-[300px] sm:min-h-[380px] lg:min-h-[441.5px] drop-shadow-2xl" key={product.id}>
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 flex items-center justify-center">
                            <NavLink to={`/product/${product.id}`}  className="block w-full h-full">
                                <img src={product.images} alt={product.title} className="product-image object-cover w-full h-[200px] sm:h-[250px] lg:h-[337.5px]" />
                            </NavLink>
                        </div>
                        <div className="p-2 sm:p-3 lg:p-4 flex-1 flex flex-col justify-between">
                            <div className="flex-1">
                                <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-white mb-1 sm:mb-2 truncate leading-tight">{product.title}</h2>
                                <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                                <div className="text-blue-600 font-bold text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2">₹{(product.price * 80).toLocaleString()}</div>
                                <div className="like">
                                    <span className="flex items-center justify-center text-gray-400 hover:text-gray-200 transition hover:cursor-pointer" title="Add to Wishlist">
                                        <FaRegHeart
                                            className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.includes(product.id) ? 'text-red-500' : ''} transition-transform duration-500 ${animatingId === product.id ? 'scale-125 animate-bounce' : ''}`}
                                            onClick={() => toggleLike(product.id)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center text-gray-400 text-base sm:text-lg py-8 sm:py-12">No products found for this category.</div>
                )}
            </div>
        </div>
    );
};
