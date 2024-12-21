import { createSlice } from '@reduxjs/toolkit';

const eventSlice=createSlice({
    name: 'event',
    initialState:{
        SelectedDate:"2024-12-17",
        //community
        isCommunityJoined:"",

    },
    reducers:{
        SelectedDateChangeHandler(state,action){
            state.SelectedDate=action.payload
        },
        isCommunityJoinedChangeHandler(state,action){
            state.isCommunityJoined=action.payload;
        }
    },

})
export default eventSlice;