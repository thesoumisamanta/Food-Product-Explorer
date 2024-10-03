import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('filters/fetchCategories', async () => {
    const response = await axios.get('/api/categories.json');
    return response.data.tags.map(category => category.name);
});

export const fetchProducts = createAsyncThunk(
    'filters/fetchProducts',
    async ({ searchQuery, barcodeQuery, category, sortOption, page = 1, pageSize = 20 }) => {
        const params = new URLSearchParams({
            search_terms: searchQuery,
            barcode: barcodeQuery,
            tagtype_0: 'categories',
            tag_0: category,
            sort_by: sortOption,
            page,
            page_size: pageSize,
            json: true
        });

        const response = await axios.get(`/api/v2/search?${params.toString()}`);
        return {
            products: response.data.products,
            totalCount: response.data.count,
            page: response.data.page,
            pageSize: response.data.page_size,
        };
    }
);

const initialState = {
    searchQuery: '',
    barcodeQuery: '',
    category: '',
    sortOption: '',
    products: [],
    categories: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 1,
    pageSize: 20,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            state.currentPage = 1; // Reset to first page on new search
        },
        setBarcodeQuery: (state, action) => {
            state.barcodeQuery = action.payload;
            state.currentPage = 1; // Reset to first page on new barcode search
        },
        setCategory: (state, action) => {
            state.category = action.payload;
            state.currentPage = 1; // Reset to first page on category change
        },
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
            state.currentPage = 1; // Reset to first page on sort change
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.products;
                state.totalPages = Math.ceil(action.payload.totalCount / state.pageSize);
                state.currentPage = action.payload.page;
                state.status = 'succeeded';
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {
    setSearchQuery,
    setBarcodeQuery,
    setCategory,
    setSortOption,
    setCurrentPage
} = filterSlice.actions;

export default filterSlice.reducer;