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
        //shareEvent
        OpenShareModal: false,
        //Calendar
        SelectedCalendarDate: '',
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
    },
});

export default feedSlice;
