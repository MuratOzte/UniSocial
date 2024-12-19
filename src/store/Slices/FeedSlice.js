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
        OpenShareModal: false,
        SelectedCalendarDate: null,
        loadingPosts: {},
        optimisticPost: {
            isVisible: false,
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
        OpenShareModalChangeHandler(state, action) {
            state.OpenShareModal = action.payload;
        },
        SelectedCalendarDateChangeHandler(state, action) {
            state.SelectedCalendarDate = action.payload;
        },
        setPostLoading(state, action) {
            const { id, isLoading } = action.payload;
            state.loadingPosts[id] = isLoading;
        },
        setOptimisticPost(state, action) {
            state.optimisticPost = action.payload;
        }
    },
});

export default feedSlice;
