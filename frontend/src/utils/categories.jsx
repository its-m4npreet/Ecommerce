import { categories } from "../api/categories";

export const Categories = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <div className="w-full mt-2 mb-4 sm:my-6 lg:my-8">
            {/* Mobile Design: Horizontal Pills */}
            <div className="block sm:hidden px-4">
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.title)}
                            className={`
                                flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap text-sm font-medium
                                transition-all duration-200 flex-shrink-0 border-2
                                ${selectedCategory === category.title 
                                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/25" 
                                    : "bg-gray-800/60 text-gray-300 border-gray-700 hover:bg-gray-700/80 hover:border-gray-600 hover:text-white"
                                }
                            `}
                        >
                            <img 
                                src={category.img} 
                                alt={category.title} 
                                className="w-5 h-5 object-contain rounded-sm" 
                                onError={(e) => {
                                    console.log(`Failed to load image for ${category.title}:`, category.img);
                                    e.target.style.display = 'none';
                                }}
                                onLoad={() => {
                                    console.log(`Successfully loaded image for ${category.title}`);
                                }}
                            />
                            <span>{category.title}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Design: Original Cards */}
            <div className="hidden sm:block">
                <div className="categories flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <div
                            className={`category flex-shrink-0 ${selectedCategory === category.title ? "bg-blue-600 text-white" : ""}`}
                            key={category.id}
                            onClick={() => setSelectedCategory(category.title)}
                            style={{ cursor: "pointer" }}
                        >
                            <img 
                                src={category.img} 
                                alt={category.title} 
                                className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-cover" 
                                onError={(e) => {
                                    console.log(`Failed to load image for ${category.title}:`, category.img);
                                    e.target.style.display = 'none';
                                }}
                                onLoad={() => {
                                    console.log(`Successfully loaded image for ${category.title}`);
                                }}
                            />
                            <h3 className="text-xs sm:text-sm md:text-base lg:text-lg">{category.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
