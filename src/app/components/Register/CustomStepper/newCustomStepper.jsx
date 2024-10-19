//hooks
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
//material ui components
import {
    Stack,
    Stepper,
    Step,
    StepLabel,
    StepConnector,
    stepConnectorClasses,
} from '@mui/material';
//icons
import { FiLogIn } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { MdSchool } from 'react-icons/md';

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
    //connector between icons
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

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
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
    //next step
    ...(ownerState.active && {
        backgroundColor: '#ccc',
    }),
    // completed step
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
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ['Öğrenci bilgileri', 'Üniversite Bilgileri', 'Giriş Bilgileri'];

const CustomStepper = () => {
    const dispatch = useDispatch();
    const activeStep = useSelector((state) => state.register.step);
    const maxStep = useSelector((state) => state.register.maxStep);

    const stepHandler = (index) => {
        if (maxStep > index) {
            dispatch(registerActions.stepChangeHandler(index + 1));
        } else {
            return;
        }
    };

    //wait for page loading
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        window.addEventListener('load', () => {
            setLoaded(true);
        });
        return () => {
            window.removeEventListener('load', () => {
                setLoaded(true);
            });
        };
    }, []);

    return (
        <Stack sx={{ width: '100%' }}>
            <Stepper
                sx={{
                    userSelect: 'none',
                }}
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
            >
                <Step key={'Student Informations'}>
                    <StepLabel
                        onClick={stepHandler.bind(null, 0)}
                        StepIconComponent={ColorlibStepIcon}
                    >
                        {'Student Informations'}
                    </StepLabel>
                </Step>
                <Step key={'University Informations'}>
                    <StepLabel
                        onClick={stepHandler.bind(null, 1)}
                        StepIconComponent={ColorlibStepIcon}
                    >
                        {'University Informations'}
                    </StepLabel>
                </Step>
                <Step key={'Login Informations'}>
                    <StepLabel
                        onClick={stepHandler.bind(null, 2)}
                        StepIconComponent={ColorlibStepIcon}
                    >
                        {'Login Informations'}
                    </StepLabel>
                </Step>
            </Stepper>
        </Stack>
    );
};

export default CustomStepper;
