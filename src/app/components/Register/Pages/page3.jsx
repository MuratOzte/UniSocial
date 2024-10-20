//packages
import {
    Grid,
    Box,
    Typography,
    Button,
    TextField,
    FormControlLabel,
    Switch,
    Divider,
} from '@mui/material';
// import LoadingButton from '@mui/lab/LoadingButton';
//components
// import PasswordStrengthBar from '../PasswordStrengthBar';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
//functions
import { EyeEndAdornment } from '../Adornments/EyeEndAdornment';
//data
import data from '@/app/data/uniData.json';
import PasswordStrengthBar from '../PasswordStrenghtbar';
import registerSlice from '@/store/Slices/RegisterSlice';

// const emailRegex =
//     /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const Inputs3 = (props) => {
    const dispatch = useDispatch();
    const isRequestPending = useSelector(
        (state) => state.register.isRequestPending
    );
    const emailRedux = useSelector((state) => state.register.emailValue);
    const passwordRedux = useSelector((state) => state.register.passwordValue);
    const passwordStrenght = useSelector(
        (state) => state.register.passwordStrenght
    );
    const selectedUnivercity = useSelector(
        (state) => state.register.univercityValue
    );
    let emailExtension;
    data.forEach((e) => {
        if (selectedUnivercity === e.universities[0].name) {
            emailExtension = e.universities[0].email;
        }
    });

    //kvkk actions
    const isKvkk = useSelector((state) => state.register.isKvkk);
    const kvkkHandler = () => {
        dispatch(registerSlice.actions.kvkkToggleHandler());
    };

    //email functions
    const [enteredEmail, setEnteredEmail] = useState(emailRedux);
    const [isEmailEntered, setIsEmailEntered] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.currentTarget.value);
        dispatch(registerSlice.actions.emailChangeHandler(event.currentTarget.value));
        dispatch(registerSlice.actions.emailExtensionChangeHandler(emailExtension));
        // let emailValidation = emailRegex.test(event.currentTarget.value);
        let emailValidation = enteredEmail > 5 ? true : false;
        setIsEmailValid(emailValidation);
    };
    const emailBlurHandler = () => {
        enteredEmail ? setIsEmailEntered(true) : setIsEmailEntered(true);
    };

    //password functions
    const [enteredPassword, setEnteredPassword] = useState(passwordRedux);
    const [isPasswordEntered, setIsPasswordEntered] = useState(false);
    const [isStrenghtBarOpen, setIsStrenghtBarOpen] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.currentTarget.value);
        event.currentTarget.value
            ? setIsStrenghtBarOpen(true)
            : setIsStrenghtBarOpen(false);
    };

    useEffect(() => {
        dispatch(registerSlice.actions.passwordChangeHandler(enteredPassword));
    }, [enteredPassword]);

    const passwordBlurHandler = () => {
        enteredPassword
            ? setIsPasswordEntered(true)
            : setIsPasswordEntered(true);
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

    //is form valid
    const [isFormValid, setIsFormValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    useEffect(() => {
        if (passwordStrenght >= 25) {
            setIsPasswordValid(true);
        } else {
            setIsPasswordValid(false);
        }
    }, [passwordStrenght]);

    useEffect(() => {
        // let emailValidation = emailRegex.test(enteredEmail);
        let emailValidation = enteredEmail > 5 ? true : false;
        setIsEmailValid(emailValidation);

        if (isPasswordValid && isEmailValid) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
        if (!enteredEmail || !enteredPassword) {
            setIsFormValid(false);
        }
    }, [enteredEmail, enteredPassword, isPasswordValid, isEmailValid]);

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ userSelect: 'none' }}
                >
                    E-posta ve Yeni şifrenizi giriniz
                </Typography>
                <Box component="form" onSubmit={props.submitHandler} noValidate>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="uniEmail"
                        autoComplete="email"
                        value={enteredEmail}
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        error={isEmailEntered && !isEmailValid}
                        InputProps={{
                            endAdornment: (
                                <>
                                    <Divider
                                        orientation="vertical"
                                        variant="fullWidth"
                                        sx={{
                                            bgcolor: '#e3e5e8',
                                            py: 3.5,
                                        }}
                                    />
                                    <Typography sx={{ ml: 1.5, mr: 0.5 }}>
                                        {emailExtension}
                                    </Typography>
                                </>
                            ),
                        }}
                        autoFocus
                    />

                    <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Enter New Password"
                        type={passwordType}
                        id="surname"
                        error={!isPasswordValid && isPasswordEntered}
                        onChange={passwordChangeHandler}
                        onBlur={passwordBlurHandler}
                        value={enteredPassword}
                        InputProps={{
                            endAdornment: (
                                <EyeEndAdornment
                                    isPasswordVisible={isPasswordVisible}
                                    visibilityToggleHandler={
                                        visibilityToggleHandler
                                    }
                                    visible={enteredPassword}
                                />
                            ),
                        }}
                    />

                    <PasswordStrengthBar
                        password={enteredPassword}
                        isStrenghtBarOpen={isStrenghtBarOpen}
                    />
                    <FormControlLabel
                        required
                        control={<Switch />}
                        label={
                            <Typography fontSize={15} color={'GrayText'}>
                                I read KVKK form and i agree
                            </Typography>
                        }
                        sx={{ userSelect: 'none' }}
                        onClick={kvkkHandler}
                        checked={isKvkk}
                    />
                    <Grid container textAlign={'center'} mt={1.5}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                onClick={props.activeStepDecrementHandler}
                            >
                                Previous Step
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={props.formSubmit}
                                disabled={!isFormValid}
                                role="progressbar"
                                loading={isRequestPending}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Inputs3;
