import { IoEye } from 'react-icons/io5';
import { IoMdEyeOff } from 'react-icons/io';
import { IconButton, InputAdornment } from '@mui/material';

export const EyeEndAdornment = ({
    visible,
    isPasswordVisible,
    visibilityToggleHandler,
}) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={visibilityToggleHandler}>
                {isPasswordVisible && visible && <IoEye />}
                {!isPasswordVisible && visible && <IoMdEyeOff />}
            </IconButton>
        </InputAdornment>
    );
};
