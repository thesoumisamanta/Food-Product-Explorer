import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';
import ProductCard from './ProductCard';

export default function ProductList() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const loadingState = useSelector(state => state.products.loadingState);
    const hasMore = useSelector(state => state.products.hasMore);
    const page = useSelector(state => state.products.page);

    // Fetch filter states
    const searchQuery = useSelector(state => state.filters.searchQuery);
    const barcodeQuery = useSelector(state => state.filters.barcodeQuery);
    const category = useSelector(state => state.filters.category);
    const sortOption = useSelector(state => state.filters.sortOption);

    useEffect(() => {
        dispatch(fetchProducts({ query: searchQuery, barcode: barcodeQuery, category, sortOption, page: 1 }));
    }, [dispatch, searchQuery, barcodeQuery, category, sortOption]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 200) {
                if (loadingState !== 'loading' && hasMore) {
                    dispatch(fetchProducts({ query: searchQuery, barcode: barcodeQuery, category, sortOption, page }));
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadingState, hasMore, searchQuery, barcodeQuery, category, sortOption, page, dispatch]);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-8">Food Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {loadingState === 'loading' && (
                <div className="flex justify-center my-4">
                    <img src="/Spinner.gif" alt="Loading..." className="w-28 h-28" />
                </div>
            )}

            {!hasMore && (
                <p className="text-center text-gray-500 my-4">No more products available.</p>
            )}
        </div>
    );
}