//packages
import { Alert, TextField } from '@mui/material';
import InputMask from 'react-input-mask';
//functions
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import loginSlice from '@/store/Slices/LoginSlice';

const TelephoneInput = () => {
    const dispatch = useDispatch();
    const [enteredTel, setEnteredTel] = useState('');
    const [isInvalidTel, setIsInvalidTel] = useState(false);

    const textChangeHandler = (event) => {
        setEnteredTel(event.target.value);
    };

    const textBlurHandler = () => {
        dispatch(loginSlice.actions.telNoChanger(enteredTel));
    };

    return (
        <>
            {isInvalidTel && (
                <Alert severity="error">
                    Telefon numaranızın 10 haneli olması gerekmektedir , lütfen
                    başına 0 koymadan deneyiniz
                </Alert>
            )}
            {
                <InputMask
                    mask="999 999 99 99"
                    maskChar=""
                    onChange={textChangeHandler}
                    onBlur={textBlurHandler}
                    value={enteredTel}
                >
                    {() => (
                        <TextField
                            fullWidth
                            autoFocus
                            variant='standard'
                            margin="dense"
                            id="telephone"
                            label="Enter your telephone number"
                        />
                    )}
                </InputMask>
            }
        </>
    );
};

export default TelephoneInput;
