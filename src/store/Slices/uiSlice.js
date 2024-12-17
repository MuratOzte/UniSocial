import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        userId: null,
    },
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
    },
});

export default uiSlice;
