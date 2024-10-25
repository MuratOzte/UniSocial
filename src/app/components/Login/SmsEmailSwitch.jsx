import {
    Grid,
    styled,
    FormGroup,
    FormControlLabel,
    Switch,
    Typography,
} from '@mui/material';
//hooks
import { useDispatch, useSelector } from 'react-redux';
//functions
import loginSlice from '@/store/Slices/LoginSlice';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(5px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('https://img.icons8.com/material-outlined/24/chat.png')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                //switch track color
                backgroundColor: '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        //button color
        backgroundColor: 'white',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('https://img.icons8.com/material-outlined/24/new-post.png')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function CustomizedSwitches() {
    const dispatch = useDispatch();
    const isSms = useSelector((state) => state.login.isSms);

    const switchHandler = () => {
        dispatch(loginSlice.actions.smsOrEmailToggleHandler());
    };

    return (
        <FormGroup>
            <Grid container>
                <Grid item xs={6} display={'flex'} justifyContent={'right'}>
                    <FormControlLabel
                        control={<MaterialUISwitch sx={{ my: 2 }} />}
                        onClick={switchHandler}
                        checked={isSms}
                    />
                </Grid>
                <Grid
                    item
                    xs={6}
                    display={'flex'}
                    justifyContent={'left'}
                    alignItems={'center'}
                >
                    <Typography>
                        {isSms
                            ? 'Reset my password via SMS'
                            : 'Reset my password with student email'}
                    </Typography>
                </Grid>
            </Grid>
        </FormGroup>
    );
}
