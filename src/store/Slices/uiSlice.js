import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        userId: null,
        userName:'',
        userAvatar:'',
        //settings
        IsSettingsModalOpened:false,
    },
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
        setUser(state, action) {
            state.userName = action.payload.name;
            state.userAvatar = action.payload.avatar;
        },
        IsSettingsModalOpenedChangeHandler(state,action){
            state.IsSettingsModalOpened=action.payload;
        }
    },
});

export default uiSlice;
