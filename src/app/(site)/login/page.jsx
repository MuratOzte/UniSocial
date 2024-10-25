'use client';

//packages
import {
    Divider,
    Button,
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Link from 'next/link';
//components
import {
    LoginEmailInput,
    LoginPasswordInput,
    ForgottenPasswordModal,
    LoginAlert,
} from '@/app/components/Login/index';
//functions
import { loginRequest } from '@/util/authService';
import loginSlice from '@/store/Slices/LoginSlice';
import Loading from '@/app/components/common/Loading';
import AuthBackground from '@/app/components/common/authBackground';

const LoginPage = () => {
    const dispatch = useDispatch();
    //Error text state
    const [errorText, setErrorText] = useState('');
    //login button loading state
    const [isRequestPending, setIsRequestPending] = useState(false);
    const [isRequestError, setIsRequestError] = useState(false);

    //is credentials invalid
    const isEmailValid = useSelector((state) => state.login.isEmailValid);
    const isPasswordValid = useSelector((state) => state.login.isPasswordValid);

    const enteredEmail = useSelector((state) => state.login.emailValue);
    const enteredPassword = useSelector((state) => state.login.passwordValue);

    const [isEmailShake, setIsEmailShake] = useState(false);
    const [isPasswordShake, setIsPasswordShake] = useState(false);

    //forgotten password statements
    const isModalOpen = useSelector((state) => state.login.isModalOpen);
    const forgotPasswordHandler = () => {
        dispatch(loginSlice.actions.modalToggleHandler());
    };

    //submit redux statementss
    const submitHandler = async (event) => {
        try {
            event.preventDefault();
            if (!isEmailValid) {
                setIsEmailShake(true);
                setTimeout(() => {
                    setIsEmailShake(false);
                }, 500);
            }
            if (!isPasswordValid) {
                setIsPasswordShake(true);
                setTimeout(() => {
                    setIsPasswordShake(false);
                }, 500);
            } else {
                setIsRequestError(false);
                setIsRequestPending(true);
                const data = await loginRequest(enteredEmail, enteredPassword);
                localStorage.setItem('token', data.token);

                dispatch(loginSlice.actions.resetAllData());
                setIsRequestPending(false);
                setIsRequestError(false);
                return;
            }
        } catch (error) {
            console.log(error.message);
            setIsRequestPending(false);
            setIsRequestError(true);
            setErrorText(error.message);
        }
    };

    return (
        <>
            {isModalOpen && <ForgottenPasswordModal open={isModalOpen} />}
            <AuthBackground />
            <Container
                component="main"
                maxWidth="xs"
                className="bg-slate-500 shadow-xl rounded-md p-3"
                sx={{
                    backgroundColor:'#fff'
                }}
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className="bg-fff w-full h-full"
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={submitHandler}
                        noValidate
                        sx={{ mt: 1 }}
                        className="flex justify-center flex-col items-center"
                    >
                        {/* {login Inputs} */}

                        <LoginEmailInput isEmailShake={isEmailShake} />
                        <LoginPasswordInput isPasswordShake={isPasswordShake} />

                        <Button
                            variant="contained"
                            className="px-12 w-3/5 my-4"
                        >
                            <Loading />
                        </Button>
                        {isRequestError && (
                            <LoginAlert
                                errorText={errorText}
                                isRequestError={isRequestError}
                            />
                        )}
                        <Grid container className="justify-center text-center">
                            <Grid item xs={12}>
                                <Button
                                    disableRipple
                                    onClick={forgotPasswordHandler}
                                    size="medium"
                                    sx={{
                                        textTransform: 'capitalize',
                                        ':hover': {
                                            bgcolor: 'transparent',
                                        },
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Divider
                                sx={{
                                    bgcolor: '#e3e5e8',
                                    px: 25,
                                    py: 0.05,
                                    my: 1,
                                }}
                            />
                            <Grid item marginY={2}>
                                <Link href={'/register'}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#42b72a',
                                            pt: '4',
                                            ':hover': {
                                                bgcolor: '#2D8D1A',
                                            },
                                        }}
                                    >
                                        Create an account
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default LoginPage;
