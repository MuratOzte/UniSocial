import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, keyframes } from '@mui/material';
import { EyeEndAdornment } from './Adornments';
import loginSlice from '@/store/Slices/LoginSlice';

const spin = keyframes`
    25% {
        transform: translateX(5px)
    }
    50% {
        transform: translateX(-5px)
    }
    75% {
        transform: translateX(5px)
    }
    100% {
        transform: translateX(-5px)
    }
`;

const LoginPasswordInput = ({ isPasswordShake }) => {
    const dispatch = useDispatch();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [enteredPassword, setEnteredPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const isPasswordEntered = useSelector(
        (state) => state.login.isPasswordEntered
    );

    const passwordBlurHandler = (event) => {
        dispatch(loginSlice.actions.passwordChanger(event.currentTarget.value));
        dispatch(loginSlice.actions.isPasswordEntered());
    };
    const visibilityToggleHandler = () => {
        if (isPasswordEntered) {
            setIsPasswordVisible(false);
        }
        setIsPasswordVisible(!isPasswordVisible);
        passwordType === 'password'
            ? setPasswordType('text')
            : setPasswordType('password');
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.currentTarget.value);
        dispatch(loginSlice.actions.passwordChanger(event.currentTarget.value));
        dispatch(loginSlice.actions.isPasswordEntered());
        dispatch(loginSlice.actions.isPasswordValid(event.currentTarget.value));
    };

    return (
        <TextField
            required
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={passwordType}
            id="password"
            autoComplete="current-password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={enteredPassword}
            error={isPasswordShake}
            sx={{
                animation: isPasswordShake ? `${spin} 0.3s 4 ease` : '',
            }}
            InputProps={{
                endAdornment: (
                    <EyeEndAdornment
                        isPasswordVisible={isPasswordVisible}
                        visibilityToggleHandler={visibilityToggleHandler}
                        visible={isPasswordEntered}
                    />
                ),
            }}
        />
    );
};

export default LoginPasswordInput;
