import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        userId: null,
        userName:'',
        userAvatar:'',
    },
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setUser(state, action) {
            state.userName = action.payload.name;
            state.userAvatar = action.payload.avatar;
        }
    },
});

export default uiSlice;
