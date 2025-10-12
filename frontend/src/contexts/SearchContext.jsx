import { createContext, useState, useEffect } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Load all products for search
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://ecommerce-agqj.onrender.com/api/products');
                if (response.ok) {
                    const products = await response.json();
                    setAllProducts(products);
                }
            } catch (error) {
                console.error('Error fetching products for search:', error);
            }
        };
        fetchProducts();
    }, []);

    // Search function
    const performSearch = (term) => {
        if (!term.trim()) {
            setSearchResults([]);
            return;
        }

        const filtered = allProducts.filter(product =>
            product.title.toLowerCase().includes(term.toLowerCase()) ||
            product.description.toLowerCase().includes(term.toLowerCase()) ||
            (product.category && product.category.name.toLowerCase().includes(term.toLowerCase()))
        );

        setSearchResults(filtered);
    };

    // Handle search input
    const handleSearch = (term) => {
        setSearchTerm(term);
        performSearch(term);
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    const value = {
        searchTerm,
        searchResults,
        isSearching,
        handleSearch,
        clearSearch,
        setIsSearching,
        setSearchTerm,
        setSearchResults
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};