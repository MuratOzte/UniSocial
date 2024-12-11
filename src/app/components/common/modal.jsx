import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OTPInput from '../Register/common/EmailCheckInput/EmailCheckInput';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  bgcolor: 'primary.main',
  color: 'white',
  '&:hover': {
    bgcolor: 'primary.dark',
  },
  textTransform: 'none',
  borderRadius: 2,
  px: 3,
  py: 1.5,
};

export default function EnhancedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const register = useSelector((state) => state.register);

  return (
    <div>
      <Button onClick={handleOpen} sx={buttonStyle}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            textAlign="center"
            gutterBottom
            color="primary.main"
          >
            Verification Required
          </Typography>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}
          >
            Please enter the code sent to <strong>{register.emailValue}</strong>
          </Typography>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <OTPInput />
          </Box>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button onClick={handleClose} variant="outlined" sx={{ textTransform: 'none' }}>
              Cancel
            </Button>
            <Button
              onClick={() => console.log('Verify button clicked')}
              variant="contained"
              sx={{ textTransform: 'none' }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}