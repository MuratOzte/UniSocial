import registerSlice from '@/store/Slices/RegisterSlice';
import {
    Grid,
    CssBaseline,
    Box,
    Typography,
    TextField,
    Button,
} from '@mui/material';
// hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Inputs1 = (props) => {
    const dispatch = useDispatch();
    const enteredNameRedux = useSelector((state) => state.register.nameValue);
    const enteredSurnameRedux = useSelector(
        (state) => state.register.surnameValue
    );
    const isFirstOpen = useSelector((state) => state.register.isFirstOpen);

    // Name statements
    const [enteredName, setEnteredName] = useState(enteredNameRedux);
    // Surname statements
    const [enteredSurname, setEnteredSurname] = useState(enteredSurnameRedux);

    // Button handler
    const buttonHandler = () => {
        dispatch(registerSlice.actions.stepChangeHandler(2));
        dispatch(
            registerSlice.actions.nameAndSurnameChangeHandler({
                name: enteredName,
                surname: enteredSurname,
            })
        );
    };

    useEffect(() => {
        dispatch(
            registerSlice.actions.isFirstOpenHandler({
                first: false,
                second: true,
                third: true,
            })
        );
    }, [dispatch]);

    useEffect(() => {
        console.log(isFirstOpen);
    }, [isFirstOpen]);

    return (
        <Grid item xs={12}>
            <CssBaseline />
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    minWidth: '400px',
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: isFirstOpen ? 0.4 : 0.1, // Shortened delay after first open
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{ userSelect: 'none' }}
                    >
                        Enter your name and surname
                    </Typography>
                </motion.div>
                <Box
                    component="form"
                    onSubmit={props.submitHandler}
                    noValidate
                    className="w-full"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: isFirstOpen ? 0.6 : 0.2, // Shortened delay after first open
                        }}
                        className="w-full"
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="email"
                            autoFocus
                            value={enteredName}
                            onChange={(event) => {
                                setEnteredName(
                                    event.currentTarget.value.trimStart()
                                );
                            }}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: isFirstOpen ? 0.8 : 0.3, // Shortened delay after first open
                        }}
                    >
                        <TextField
                            margin="normal"
                            fullWidth
                            name="Soyad"
                            label="Surname"
                            type="text"
                            id="surname"
                            value={enteredSurname}
                            onChange={(event) => {
                                setEnteredSurname(
                                    event.currentTarget.value.trim()
                                );
                            }}
                        />
                    </motion.div>

                    <Grid container textAlign={'center'} mt={2}>
                        <Grid item xs={12}>
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: isFirstOpen ? 1.0 : 0.4, // Shortened delay after first open
                                }}
                            >
                                <Button
                                    disabled={!enteredName || !enteredSurname}
                                    variant="contained"
                                    onClick={buttonHandler}
                                >
                                    Next Step
                                </Button>
                            </motion.div>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        className="justify-center text-center"
                    ></Grid>
                </Box>
            </Box>
        </Grid>
    );
};

export default Inputs1;
