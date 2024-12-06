import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        isFirstLoad: true,
        step: 1,
        maxStep: 1,
        isKvkk: false,
        isRequestPending: false,
        isFirstOpen: {
            first: true,
            second: true,
            third: true,
        },
        //first step constants
        nameValue: 'a',
        surnameValue: 'a',
        //second step constants
        univercityValue: '',
        departmentValue: '',
        //third step constants
        emailValue: '',
        emailExtension: '',
        passwordValue: '',
        isPasswordEntered: false,
        isKvkkSubmitted: false,
        passwordStrenght: 0,
        //teacher
        status: '',

    },
    reducers: {
        stepChangeHandler(state, action) {
            state.step = action.payload;
        },
        kvkkToggleHandler(state) {
            state.isKvkk = !state.isKvkk;
        },
        univercityNameChangeHandler(state, action) {
            state.univercityValue = action.payload;
        },
        departmenNameChangeHandler(state, action) {
            state.departmentValue = action.payload;
        },
        nameAndSurnameChangeHandler(state, action) {
            state.nameValue = action.payload.name;
            state.surnameValue = action.payload.surname;
        },
        emailChangeHandler(state, action) {
            state.emailValue = action.payload;
        },
        emailExtensionChangeHandler(state, action) {
            state.emailExtension = action.payload;
        },
        passwordChangeHandler(state, action) {
            state.passwordValue = action.payload;
        },
        passwordStrenghtChangeHandler(state, action) {
            state.passwordStrenght = action.payload;
        },
        isFirstLoadHandler(state, action) {
            state.isFirstLoad = action.payload;
        },
        isRequestPendingHandler(state, action) {
            state.isRequestPending = action.payload;
        },
        isFirstOpenHandler(state, action) {
            state.isFirstOpen = action.payload;
        },
        statusChangeHandler(state,action){
            state.status=action.payload;
        }
    },
});

export default registerSlice;
