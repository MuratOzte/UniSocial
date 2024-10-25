//icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
//packages
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

export const EyeEndAdornment = (props) => {
    return (
        <InputAdornment position="end">
            <IconButton onClick={props.visibilityToggleHandler}>
                {props.isPasswordVisible && props.visible && <VisibilityIcon />}
                {!props.isPasswordVisible && props.visible && (
                    <VisibilityOffIcon />
                )}
            </IconButton>
        </InputAdornment>
    );
};

export const SuccessAdornment = (props) => {
    const isEmailValid = useSelector((state) => state.login.isEmailValid);

    return (
        <InputAdornment position="end">
            {isEmailValid && <CheckCircleIcon color="success" />}
            {!isEmailValid && <ErrorIcon color="error" />}
        </InputAdornment>
    );
};

export const ErrorAdornment = () => {
    return (
        <Tooltip title={'Lütfen geçerli bir e-posta adresi yazınız'}>
            <InputAdornment position="end">
                <ErrorIcon color="error" />
            </InputAdornment>
        </Tooltip>
    );
};
