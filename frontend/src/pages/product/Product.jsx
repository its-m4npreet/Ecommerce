
import { useState, useEffect } from "react";
import { useLoaderData, NavLink } from "react-router-dom";

export const Product = () => {
    const product = useLoaderData();
    const [showFullDesc, setShowFullDesc] = useState(false);
    const [related, setRelated] = useState([]);
    const maxDescLength = 120;
    const isLong = product.description && product.description.length > maxDescLength;
    const shortDesc = isLong ? product.description.slice(0, maxDescLength) + "..." : product.description;

    useEffect(() => {
        async function fetchRelated() {
            try {
                const res = await fetch("https://api.escuelajs.co/api/v1/products");
                const all = await res.json();
                // Filter by same category, exclude current product
                const rel = all.filter(
                    p => p.id !== product.id && p.category && product.category && p.category.name === product.category.name
                ).slice(0, 6); // limit to 6
                setRelated(rel);
            } catch (e) {
                console.error("Error fetching related products:", e);
                setRelated([]);
            }
        }
        fetchRelated();
    }, [product]);

    return (
        <div className="flex  flex-col justify-center items-center min-h-[80vh] bg-black py-12 gap-5">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl max-w-3xl w-full flex flex-col md:flex-row overflow-hidden border border-gray-700">
                <div className="md:w-1/2 flex items-center justify-center bg-black p-8">
                    <img
                        src={Array.isArray(product.images) ? product.images[0] : product.images}
                        alt={product.title}
                        className="object-contain w-full h-80 rounded-xl shadow-lg border border-gray-800 bg-gray-900"
                    />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-between text-white">
                    <h1 className="text-1.5xl font-bold mb-3 text-white drop-shadow-lg tracking-tight">{product.title}</h1>
                    <div className="text-2xl text-green-400 font-bold mb-4">₹{(product.price * 80).toLocaleString()}</div>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        {showFullDesc || !isLong ? product.description : shortDesc}
                        {isLong && !showFullDesc && (
                            <a
                                className="ml-2 cursor-pointer text-blue-400 underline hover:text-blue-300  text-base font-semibold"
                                onClick={() => setShowFullDesc(true)}
                            >
                                Read more
                            </a>
                        )}
                        {isLong && showFullDesc && (
                            <a
                                className="ml-2 cursor-pointer text-blue-400 underline hover:text-blue-300 text-base font-semibold"
                                onClick={() => setShowFullDesc(false)}
                            >
                                Show less
                            </a>
                        )}
                    </p>
                    <button className="mt-auto bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-200 text-lg">Add to Cart</button>
                </div>
            </div>

            <div className="relatedImages w-full max-w-5xl">
                <h2 className="text-lg font-bold mb-4 text-white">Related Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {related.length === 0 && (
                        <div className="col-span-full text-gray-400 text-center">No related products found.</div>
                    )}
                    {related.map(rp => (
                        <NavLink to={`/shop/${rp.id}`} key={rp.id} className="block">
                            <div className="bg-gray-900 rounded-lg shadow flex flex-col items-center p-4 hover:shadow-xl transition">
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

// Deleted after migration to features/product/Product.jsx
