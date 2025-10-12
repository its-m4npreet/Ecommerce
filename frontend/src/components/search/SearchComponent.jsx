import { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';

export const SearchComponent = ({ isMobile = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const { searchResults, handleSearch } = useSearch();
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const dropdownRef = useRef(null);

    // Handle search input changes
    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocalSearchTerm(value);
        handleSearch(value);
        setIsExpanded(value.length > 0);
    };

    // Handle product selection
    const handleProductSelect = (product) => {
        navigate(`/product/${product.id}`);
        setLocalSearchTerm('');
        setIsExpanded(false);
    };

    // Handle search submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            handleProductSelect(searchResults[0]);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current && 
                !searchRef.current.contains(event.target) &&
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchBarClass = isMobile 
        ? "searchBar h-8 flex items-center rounded shadow border border-gray-600 relative"
        : "searchBar w-120 h-10 flex items-center rounded shadow border border-gray-600 relative";

    const inputClass = isMobile
        ? "w-full h-full border-none outline-none px-2 bg-transparent text-white placeholder-gray-400 text-sm"
        : "w-full h-full border-none outline-none px-3 bg-transparent text-white placeholder-gray-400";

    const iconClass = isMobile
        ? "ml-2 text-white text-sm cursor-pointer"
        : "ml-2 text-white cursor-pointer";

    return (
        <div className="relative" ref={searchRef}>
            <form onSubmit={handleSubmit} className={searchBarClass}>
                <FaSearch className={iconClass} onClick={() => searchRef.current?.querySelector('input')?.focus()} />
                <input
                    type="search"
                    name="search"
                    id={isMobile ? "mobile-search" : "search"}
                    className={inputClass}
                    placeholder="Search products..."
                    value={localSearchTerm}
                    onChange={handleInputChange}
                    onFocus={() => localSearchTerm && setIsExpanded(true)}
                />
            </form>

            {/* Search Results Dropdown */}
            {isExpanded && searchResults.length > 0 && (
                <div 
                    ref={dropdownRef}
                    className={`absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-b-lg shadow-lg z-50 max-h-80 overflow-y-auto ${
                        isMobile ? 'mt-1' : 'mt-2'
                    }`}
                >
                    {searchResults.slice(0, 8).map((product) => (
                        <div
                            key={product.id}
                            onClick={() => handleProductSelect(product)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                        >
                            <img
                                src={product.images?.[0] || product.image}
                                alt={product.title}
                                className="w-10 h-10 object-cover rounded"
                                onError={(e) => {
                                    e.target.src = "https://via.placeholder.com/40?text=No+Image";
                                }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-medium truncate">
                                    {product.title}
                                </p>
                                <p className="text-gray-400 text-xs truncate">
                                    {product.category?.name || 'No category'}
                                </p>
                            </div>
                            <p className="text-blue-400 text-sm font-semibold">
                                ₹{(product.price * 80).toLocaleString()}
                            </p>
                        </div>
                    ))}
                    
                    {searchResults.length > 8 && (
                        <div className="p-2 text-center text-gray-400 text-xs border-t border-gray-700">
                            And {searchResults.length - 8} more results...
                        </div>
                    )}
                </div>
            )}

            {/* No Results */}
            {isExpanded && localSearchTerm && searchResults.length === 0 && (
                <div 
                    ref={dropdownRef}
                    className={`absolute top-full left-0 right-0 bg-gray-800 border border-gray-600 rounded-b-lg shadow-lg z-50 ${
                        isMobile ? 'mt-1' : 'mt-2'
                    }`}
                >
                    <div className="p-4 text-center text-gray-400">
                        No products found for "{localSearchTerm}"
                    </div>
                </div>
            )}
        </div>
    );
};