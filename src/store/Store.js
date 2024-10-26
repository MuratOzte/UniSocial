import { configureStore } from '@reduxjs/toolkit';
//slices
import registerSlice from './Slices/RegisterSlice';
import loginSlice from './Slices/LoginSlice';
import uiSlice from './Slices/uiSlice';

export const store = configureStore({
    reducer: {
        register: registerSlice.reducer,
        login: loginSlice.reducer,
        ui: uiSlice.reducer,
    },
});
