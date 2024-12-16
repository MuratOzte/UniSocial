import { createSlice } from '@reduxjs/toolkit';
const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        shareMessage: '',
        isFileUploadModalOpen: false,
        isEditModalOpen: false,
        selectedPost: {
            id: '',
            content: '',
            image: '',
        },
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
        setSelectedPost(state, action) {
            state.selectedPost = action.payload;
        },
    },
});

export default feedSlice;
