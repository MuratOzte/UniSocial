import { CssBaseline, Box, Typography } from '@mui/material';
import UnivercitySelect from '../UnivercitySelect';

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
                <Typography
                    component="h1"
                    variant="h6"
                    sx={{ userSelect: 'none' }}
                >
                    Enter your univercity and department
                </Typography>
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
