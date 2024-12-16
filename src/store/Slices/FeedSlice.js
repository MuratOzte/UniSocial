import { createSlice } from '@reduxjs/toolkit';
const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        shareMessage: '',
        isFileUploadModalOpen: false,
        isEditModalOpen: false,
    },

    reducers: {
        shareMessageChangeHandler(state, action) {
            state.shareMessage = action.payload;
        },
        setIsFileUploadModalOpen(state, action) {
            state.isFileUploadModalOpen = action.payload;
        },
        setIsEditModalOpen(state, action) {
            state.isEditModalOpen = action.payload;
        },
    },
});

export default feedSlice;
