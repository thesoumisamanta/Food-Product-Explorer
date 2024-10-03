import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortProducts } from '../redux/productsSlice';  // Define the sortProducts action in your slice

const SortDropdown = () => {
    const [sortOption, setSortOption] = useState('');
    const dispatch = useDispatch();

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
        setSortOption(sortValue);
        dispatch(sortProducts(sortValue));  // Dispatch action to sort products
    };

    return (
        <div className="mb-4">
            <label htmlFor="sort-dropdown" className="block text-sm font-medium text-gray-700">
                Sort by
            </label>
            <select
                id="sort-dropdown"
                value={sortOption}
                onChange={handleSortChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">Select Sort Option</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="nutrition-asc">Nutrition Grade (Ascending)</option>
                <option value="nutrition-desc">Nutrition Grade (Descending)</option>
            </select>
        </div>
    );
};

export default SortDropdown;
