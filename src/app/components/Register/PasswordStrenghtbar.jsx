import LinearProgress from '@mui/material/LinearProgress';
import { Grid } from '@mui/material';
import { IoShieldCheckmark } from 'react-icons/io5';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import registerSlice from '@/store/Slices/RegisterSlice';

const PasswordStrengthBar = ({ password, isStrenghtBarOpen }) => {
    const dispatch = useDispatch();

    const calculateStrength = (password) => {
        const length = password.length;
        let score = 0;

        if (length > 0) {
            score += 10;
        }
        if (length >= 8) {
            score += 25;
        }

        if (
            /(?=.*?[!"#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])/.test(
                password
            )
        ) {
            score += 10;
        }

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
            score += 15;
        }

        if (/\d/.test(password)) {
            score += 20;
        }

        if (/[^a-zA-Z\d]/.test(password)) {
            score += 20;
        }

        return score;
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength < 25) {
            return 'red';
        } else if (strength < 50) {
            return 'yellow';
        } else if (strength < 75) {
            return 'blue';
        } else {
            return 'green';
        }
    };

    const passwordStrength = calculateStrength(password);
    const strengthColor = getPasswordStrengthColor(passwordStrength);

    useEffect(() => {
        dispatch(
            registerSlice.actions.passwordStrenghtChangeHandler(passwordStrength)
        );
    }, [passwordStrength]);

    return (
        <div>
            <Grid container display={'flex'} alignItems={'center'}>
                <Grid
                    item
                    xs={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <IoShieldCheckmark color={strengthColor} />
                </Grid>
                <Grid item xs={11}>
                    <LinearProgress
                        color={strengthColor}
                        variant="determinate"
                        value={passwordStrength}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            bgcolor: strengthColor,
                        }}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default PasswordStrengthBar;
