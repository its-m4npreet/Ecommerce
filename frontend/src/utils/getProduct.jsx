import { NavLink, useLoaderData } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { useState } from "react";

export const GetProducts = ({ selectedCategory = "All" }) => {
    const [likedProducts, setLikedProducts] = useState([]);
    const products = useLoaderData();
    console.log("Products in GetProducts:", products);
    const getCategoryName = (cat) => cat.toLowerCase();
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(product =>
            product.category &&
            getCategoryName(product.category.name) === getCategoryName(selectedCategory)
        );
    const toggleLike = (productId) => {
        setLikedProducts(prevLikedProducts =>
            prevLikedProducts.includes(productId)
                ? prevLikedProducts.filter(id => id !== productId)
                : [...prevLikedProducts, productId]
        );
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts && filteredProducts.length > 0 ? filteredProducts.map(product => (
                    <div className="bg-[#2e2e30] rounded-xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300 min-h-[441.5px] drop-shadow-2xl" key={product.id}>
                        <div className="aspect-w-1 aspect-h-1 bg-gray-100 flex items-center justify-center">
                            <NavLink to={`/product/${product.id}`} className="block w-full h-full">
                                <img src={product.images} alt={product.title} className="object-cover w-full h-[337.5px]" />
                            </NavLink>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                            <h2 className="text-lg font-semibold text-white mb-2 truncate">{product.title}</h2>
                            <div className="flex justify-between items-center">
                                <div className="text-blue-600 font-bold text-xl mb-2">₹{(product.price * 80).toLocaleString()}</div>
                                <div className="like">
                                    <span className="flex items-center justify-center text-gray-400 hover:text-gray-200 transition">
                                        {
                                            likedProducts.includes(product.id) ? (
                                                console.log("Product liked:", product.id),
                                                <FaRegHeart className="w-5 h-5 text-red-500" onClick={() => toggleLike(product.id)} />
                                            ) : (
                                                <FaRegHeart className="w-5 h-5" onClick={() => toggleLike(product.id)} />
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center text-gray-400 text-lg py-12">No products found for this category.</div>
                )}
            </div>
        </div>
    );
};
