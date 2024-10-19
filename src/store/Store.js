import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './Slices/RegisterSlice';

export const store = configureStore({
    reducer: {
        register: registerSlice.reducer,
    },
});
