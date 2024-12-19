import { createSlice } from '@reduxjs/toolkit';

const eventSlice=createSlice({
    name: 'event',
    initialState:{
        SelectedDate:"2024-12-17"
    },
    reducers:{
        SelectedDateChangeHandler(state,action){
            state.SelectedDate=action.payload
        }
    },

})
export default eventSlice;