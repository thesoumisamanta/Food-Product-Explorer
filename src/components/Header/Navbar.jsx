import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    setSearchQuery, 
    setBarcodeQuery, 
    setCategory, 
    setSortOption, 
    fetchCategories, 
    fetchProducts 
} from '../../redux/filtersSlice';

export default function Navbar() {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.filters.categories);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [barcode, setBarcode] = useState('');
    const [category, setLocalCategory] = useState('');
    const [sort, setLocalSort] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        dispatch(setSearchQuery(e.target.value));
        dispatch(fetchProducts({
            searchQuery: e.target.value,
            barcodeQuery: barcode,
            category,
            sortOption: sort,
            page: 1
        }));
    };

    const handleBarcodeChange = (e) => {
        setBarcode(e.target.value);
        dispatch(setBarcodeQuery(e.target.value));
        dispatch(fetchProducts({
            searchQuery: search,
            barcodeQuery: e.target.value,
            category,
            sortOption: sort,
            page: 1
        }));
    };

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setLocalCategory(newCategory);
        dispatch(setCategory(newCategory));
        dispatch(fetchProducts({
            searchQuery: search,
            barcodeQuery: barcode,
            category: newCategory,
            sortOption: sort,
            page: 1
        }));
    };

    const handleSortChange = (e) => {
        const newSort = e.target.value;
        setLocalSort(newSort);
        dispatch(setSortOption(newSort));
        dispatch(fetchProducts({
            searchQuery: search,
            barcodeQuery: barcode,
            category,
            sortOption: newSort,
            page: 1
        }));
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <a href="/" className="text-2xl font-bold text-green-500">
                            Food Explorer
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <input
                            type="text"
                            value={search}
                            onChange={handleSearchChange}
                            placeholder="Search by name..."
                            className="px-3 py-2 border border-gray-300 rounded-md"
                        />

                        <input
                            type="text"
                            value={barcode}
                            onChange={handleBarcodeChange}
                            placeholder="Search by barcode..."
                            className="px-3 py-2 border border-gray-300 rounded-md"
                        />

                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={handleSortChange}
                            className="px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Sort by</option>
                            <option value="product_name.asc">Name (A-Z)</option>
                            <option value="product_name.desc">Name (Z-A)</option>
                            <option value="nutrition_grade_fr.asc">Nutrition Grade (Low to High)</option>
                            <option value="nutrition_grade_fr.desc">Nutrition Grade (High to Low)</option>
                        </select>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMobileMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4">
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Search by name..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />

                    <input
                        type="text"
                        value={barcode}
                        onChange={handleBarcodeChange}
                        placeholder="Search by barcode..."
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />

                    <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sort}
                        onChange={handleSortChange}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Sort by</option>
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="nutriscore_asc">Nutrition Grade (Low to High)</option>
                        <option value="nutriscore_desc">Nutrition Grade (High to Low)</option>
                    </select>
                </div>
            )}
        </nav>
    );
}