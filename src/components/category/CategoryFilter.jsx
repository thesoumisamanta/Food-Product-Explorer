import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchProducts } from '../redux/productsSlice';

const CategoryFilter = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch categories from the OpenFoodFacts API
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://world.openfoodfacts.org/categories.json');
                setCategories(response.data.tags);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        setSelectedCategory(category);
        dispatch(fetchProducts(category));  // Fetch products based on the selected category
    };

    return (
        <div className="mb-4">
            <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700">
                Filter by Category
            </label>
            <select
                id="category-filter"
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoryFilter;
