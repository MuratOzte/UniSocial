import { CssBaseline, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import UnivercitySelect from '../UnivercitySelect';
import BasicSelect from '../StatusSelect';

const Inputs2 = (props) => {
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

                <Box component="form" onSubmit={props.submitHandler} noValidate>
                    <UnivercitySelect
                        activeStepDecrementHandler={
                            props.activeStepDecrementHandler
                        }
                        activeStepIncrementHandler={
                            props.activeStepIncrementHandler
                        }
                    />
                </Box>
            </Box>
        </>
    );
};

export default Inputs2;
