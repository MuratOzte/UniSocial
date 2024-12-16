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
import { motion } from 'framer-motion';
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
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();

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
                router.replace('/feed');
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
                className="relative z-10 h-screen flex justify-center py-0"
            >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignContent: 'center',
                        alignItems: 'center',
                        padding: 4,
                        paddingX: 10,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: 'white',
                        width: '50%',
                        height: '80vh',
                    }}
                >
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ duration: 0.5 }}
                        className="relative h-[120px] flex justify-center items-center text-center origin-left overflow-hidden"
                    >
                        <Image
                            src={logo}
                            alt="logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </motion.div>
                    <Box
                        component="form"
                        onSubmit={submitHandler}
                        noValidate
                        className="flex flex-col items-center mt-2 w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full"
                        >
                            <LoginEmailInput isEmailShake={isEmailShake} />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="w-full"
                        >
                            <LoginPasswordInput
                                isPasswordShake={isPasswordShake}
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, width: '50%' }}
                            animate={{ opacity: 1, width: '100%' }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                        >
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
                        </motion.div>
                        {isRequestError && (
                            <LoginAlert
                                errorText={errorText}
                                isRequestError={isRequestError}
                            />
                        )}
                        <div></div>
                        <Grid
                            container
                            justifyContent="center"
                            className="text-center flex flex-col"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <Grid item xs={12}>
                                    <Button
                                        disableRipple
                                        onClick={forgotPasswordHandler}
                                        sx={{
                                            textTransform: 'capitalize',
                                            color: 'primary.main',
                                            ':hover': {
                                                bgcolor: 'transparent',
                                            },
                                        }}
                                    >
                                        Forgot password?
                                    </Button>
                                </Grid>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 1 }}
                            >
                                <Divider
                                    sx={{
                                        width: '100%',
                                        my: 2,
                                        bgcolor: 'grey-300',
                                    }}
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.2 }}
                            >
                                <Grid item xs={12} mt={2}>
                                    <Link href={'/register'}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                bgcolor: '#42b72a',
                                                ':hover': {
                                                    bgcolor: '#2D8D1A',
                                                },
                                            }}
                                            fullWidth
                                        >
                                            Create an account
                                        </Button>
                                    </Link>
                                </Grid>
                            </motion.div>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
