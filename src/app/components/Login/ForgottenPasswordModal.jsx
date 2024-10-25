//packages
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
//components
import CustomizedSwitches from './SmsEmailSwitch';
//functions
import TelephoneInput from './TelephoneInput';
import loginSlice from '@/store/Slices/LoginSlice';

const ForgottenPasswordModal = ({ submitHandler }) => {
    const dispatch = useDispatch();
    const isModalOpen = useSelector((state) => state.login.isModalOpen);
    const isSms = useSelector((state) => state.login.isSms);
    const enteredTel = useSelector((state) => state.login.telNo);
    const enteredEmail = useSelector((state) => state.login.emailValue);

    //email change statements
    const [email, setEmail] = useState(enteredEmail);
    const emailChangeHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    //modal close function
    const closeBtnHandler = () => {
        dispatch(loginSlice.actions.modalToggleHandler());
    };

    //form submit function
    const submitBtnHandler = () => {
        isSms ? console.log(enteredTel) : console.log(email);
        dispatch(loginSlice.actions.modalToggleHandler());
    };

    return (
        <Dialog open={isModalOpen} onClose={closeBtnHandler}>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You can reset your password using your university email or
                    phone number.
                </DialogContentText>
                <CustomizedSwitches />
                {!isSms && (
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Enter your university e-mail"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={emailChangeHandler}
                    />
                )}
                {isSms && <TelephoneInput submitHandler={submitHandler} />}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeBtnHandler}>Close</Button>
                <Button onClick={submitBtnHandler}>Agree</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ForgottenPasswordModal;
