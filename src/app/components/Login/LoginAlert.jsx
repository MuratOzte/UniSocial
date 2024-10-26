import { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

import { IoMdClose } from 'react-icons/io';
import { MdError } from 'react-icons/md';

const LoginAlert = ({ isRequestError, errorText }) => {
    const [open, setOpen] = useState(isRequestError);

    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                    icon={<MdError />}
                    color="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <IoMdClose />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {errorText}
                </Alert>
            </Collapse>
        </Box>
    );
};

export default LoginAlert;
