import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './Slices/RegisterSlice';
import loginSlice from './Slices/LoginSlice';

export const store = configureStore({
    reducer: {
        register: registerSlice.reducer,
        login: loginSlice.reducer,
    },
});
