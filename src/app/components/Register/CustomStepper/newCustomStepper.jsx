'use client';
// hooks
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion'; // Import framer-motion
// material UI components
import {
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
} from '@mui/material';
// icons
import { FiLogIn } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { MdSchool } from 'react-icons/md';
import registerSlice from '@/store/Slices/RegisterSlice';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        left: 'calc(-50% + 24px)',
        right: 'calc(50% + 24px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#ccc',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#4583BD',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#ccc',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled(motion.div)(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundColor: '#ccc',
    }),
    ...(ownerState.completed && {
        backgroundColor: '#1976d2',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <MdAccountCircle />,
        2: <MdSchool />,
        3: <FiLogIn />,
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
            initial={{ scale: 0 }} // Initial scale for animation
            animate={{ scale: 1 }} // Scale to 1 for animation
            transition={{ duration: 0.3 }} // Adjust duration as needed
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const CustomStepper = () => {
    const dispatch = useDispatch();
    const activeStep = useSelector((state) => state.register.step);

    return (
        <Stack sx={{ width: '100%' }}>
            <Stepper
                sx={{
                    userSelect: 'none',
                }}
                alternativeLabel
                activeStep={activeStep}
                connector={
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.8,
                        }}
                    >
                        <ColorlibConnector />
                    </motion.div>
                }
            >
                <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: activeStep >= 0 ? 1 : 0,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                        >
                            Öğrenci bilgileri
                        </motion.div>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: activeStep >= 1 ? 1 : 0,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                            }}
                        >
                            Üniversite Bilgileri
                        </motion.div>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: activeStep >= 1 ? 1 : 0,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.4,
                            }}
                        >
                            Giriş Bilgileri
                        </motion.div>
                    </StepLabel>
                </Step>
            </Stepper>
        </Stack>
    );
};

export default CustomStepper;
