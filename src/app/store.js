import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";
import filtersReducer from "../redux/filtersSlice";

export const store = configureStore({
    reducer: {
        products: productsReducer,
        filters: filtersReducer
    }
})