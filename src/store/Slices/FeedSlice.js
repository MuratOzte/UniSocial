import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useSWR from 'swr';

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async (token) => {
    const response = await fetch('http://localhost:3000/api/get-all-posts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    return data.posts;
});

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
        SelectedCalendarDate: '',
        posts: [],
        status: 'idle',
        error: null,
        loadingPosts: {},
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
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default feedSlice;
