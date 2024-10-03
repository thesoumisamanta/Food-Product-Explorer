import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    page: 1,
    hasMore: true,
    loadingState: 'idle',
    error: null
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ query = '', barcode = '', category = '', sortOption = '', page }) => {
        if (typeof query !== 'string' || typeof barcode !== 'string' || typeof category !== 'string' || typeof sortOption !== 'string') {
            throw new Error('Invalid parameters');
        }

        try {
            const params = new URLSearchParams({
                search_terms: query,
                barcode,
                category,
                sort: sortOption,
                page,
                page_size: 5,
                json: true
            });

            const response = await axios.get(`/api/cgi/search.pl?${params.toString()}`);
            return { products: response.data.products, hasMore: response.data.products.length > 0 };
        } catch (error) {
            throw error;
        }
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loadingState = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loadingState = 'succeeded';
                if (action.meta.arg.page === 1) {
                    state.products = action.payload.products;
                } else {
                    state.products = [...state.products, ...action.payload.products];
                }
                state.hasMore = action.payload.hasMore;
                state.page = action.meta.arg.page + 1;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loadingState = 'failed';
                state.error = action.error.message;
            });
    }
});

export default productsSlice.reducer;