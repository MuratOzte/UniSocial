'use client';

// packages
import {
    Divider,
    Button,
    CssBaseline,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Link from 'next/link';
// components
import {
    LoginEmailInput,
    LoginPasswordInput,
    ForgottenPasswordModal,
    LoginAlert,
} from '@/app/components/Login/index';
// functions
import { loginRequest } from '@/util/authService';
import loginSlice from '@/store/Slices/LoginSlice';
import Loading from '@/app/components/common/Loading';
import AuthBackground from '@/app/components/common/authBackground';

const LoginPage = () => {
    const dispatch = useDispatch();
    // Error and loading state
    const [errorText, setErrorText] = useState('');
    const [isRequestPending, setIsRequestPending] = useState(false);
    const [isRequestError, setIsRequestError] = useState(false);

    const isEmailValid = useSelector((state) => state.login.isEmailValid);
    const isPasswordValid = useSelector((state) => state.login.isPasswordValid);
    const enteredEmail = useSelector((state) => state.login.emailValue);
    const enteredPassword = useSelector((state) => state.login.passwordValue);

    const [isEmailShake, setIsEmailShake] = useState(false);
    const [isPasswordShake, setIsPasswordShake] = useState(false);
    const isModalOpen = useSelector((state) => state.login.isModalOpen);

    const forgotPasswordHandler = () => {
        dispatch(loginSlice.actions.modalToggleHandler());
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (!isEmailValid) {
            setIsEmailShake(true);
            setTimeout(() => setIsEmailShake(false), 500);
        }
        if (!isPasswordValid) {
            setIsPasswordShake(true);
            setTimeout(() => setIsPasswordShake(false), 500);
        } else {
            try {
                setIsRequestPending(true);
                const data = await loginRequest(enteredEmail, enteredPassword);
                localStorage.setItem('token', data.token);
                dispatch(loginSlice.actions.resetAllData());
                setIsRequestPending(false);
            } catch (error) {
                console.log(error.message);
                setIsRequestPending(false);
                setIsRequestError(true);
                setErrorText(error.message);
            }
        }
    };

    return (
        <div className="w-full h-screen overflow-hidden">
            {isModalOpen && <ForgottenPasswordModal open={isModalOpen} />}
            <AuthBackground />
            <Container
                component="main"
                maxWidth="xs"
                className="relative z-10 h-screen"
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 16,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                        minWidth: 500,
                        maxWidth: 600,
                        paddingX: 10,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white',
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={submitHandler}
                        noValidate
                        className="flex flex-col items-center mt-4"
                    >
                        <LoginEmailInput isEmailShake={isEmailShake} />
                        <LoginPasswordInput isPasswordShake={isPasswordShake} />
                        <Button
                            variant="contained"
                            className="px-12 w-full"
                            type="submit"
                            sx={{
                                marginY: 4,
                            }}
                        >
                            {isRequestPending ? <Loading /> : 'Sign In'}
                        </Button>
                        {isRequestError && (
                            <LoginAlert
                                errorText={errorText}
                                isRequestError={isRequestError}
                            />
                        )}
                        <Grid
                            container
                            justifyContent="center"
                            className="text-center"
                        >
                            <Grid item xs={12}>
                                <Button
                                    disableRipple
                                    onClick={forgotPasswordHandler}
                                    sx={{
                                        textTransform: 'capitalize',
                                        color: 'primary.main',
                                        ':hover': { bgcolor: 'transparent' },
                                    }}
                                >
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Divider
                                sx={{
                                    width: '100%',
                                    my: 2,
                                    bgcolor: 'grey-300',
                                }}
                            />
                            <Grid item xs={12} mt={2}>
                                <Link href={'/register'}>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#42b72a',
                                            ':hover': { bgcolor: '#2D8D1A' },
                                        }}
                                        fullWidth
                                    >
                                        Create an account
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
