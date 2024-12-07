import { CssBaseline, Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import UnivercitySelect from '../UnivercitySelect';
import { useDispatch, useSelector } from 'react-redux';
import registerSlice from '@/store/Slices/RegisterSlice';

const Inputs2 = (props) => {
    const dispatch=useDispatch();
    const register=useSelector((state)=>state.register);
    
    const stepChangeHandler=(page)=>{
        dispatch(registerSlice.actions.stepChangeHandler(page));
    }

    
    return (
        <>
            <CssBaseline />
            <Box
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        sx={{ userSelect: 'none' }}
                    >
                        Enter your university and department
                    </Typography>
                </motion.div>
                <Box
                sx={{
                    my: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ transition: 0.5, delay: 0.7 }}
                >
                    <Button
                        variant="contained"
                        onClick={() => {
                            stepChangeHandler(1);
                        }}
                    >
                        Previous step
                    </Button>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ transition: 0.5, delay: 0.8 }}
                >


                    <Button
                        variant="contained"
                        onClick={() => {
                            stepChangeHandler(3);
                        }}
                        disabled={false}
                    >
                        Next Step
                    </Button>
                </motion.div>
            </Box>
 
            </Box>
        </>
    );
};

export default Inputs2;
