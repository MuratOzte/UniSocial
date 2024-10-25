//icons
import { MdVisibility } from 'react-icons/md';
import { MdVisibilityOff } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import { MdError } from 'react-icons/md';
//packages
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

export const EyeEndAdornment = ({
    visibilityToggleHandler,
    isPasswordVisible,
    visible,
}) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={visibilityToggleHandler}>
                {isPasswordVisible && visible && <MdVisibility />}
                {!isPasswordVisible && visible && (
                    <MdVisibilityOff />
                )}
            </IconButton>
        </InputAdornment>
    );
};

export const SuccessAdornment = () => {
    const isEmailValid = useSelector((state) => state.login.isEmailValid);

    return (
        <InputAdornment position="end">
            {isEmailValid && <FaCircleCheck color='green'/>}
            {!isEmailValid && <MdError color="red" />}
        </InputAdornment>
    );
};

export const ErrorAdornment = () => {
    return (
        <Tooltip title={'Lütfen geçerli bir e-posta adresi yazınız'}>
            <InputAdornment position="end">
                <MdError color="red" />
            </InputAdornment>
        </Tooltip>
    );
};
