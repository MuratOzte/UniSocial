import { createSlice } from '@reduxjs/toolkit';
const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        shareMessage: '',
        isFileUploadModalOpen: false,
    },

    reducers: {
        shareMessageChangeHandler(state, action) {
            state.shareMessage = action.payload;
        },
        setIsFileUploadModalOpen(state, action) {
            state.isFileUploadModalOpen = action.payload;
        },
    },
});

export default feedSlice;
