import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OTPInput from "../Register/common/EmailCheckInput/EmailCheckInput";
import { useDispatch, useSelector } from "react-redux";
import registerSlice from "@/store/Slices/RegisterSlice";
import { SendMailtoCheck } from "@/util/authService";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function EnhancedModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    dispatch(registerSlice.actions.emailCheckModalChangeHandler(false));
  };
  const handleClose = () => {
    dispatch(registerSlice.actions.emailCheckModalChangeHandler(false));
  };

  const register = useSelector((state) => state.register);

  const CheckTakenMailCode = async () => {
    console.log("a", register.mailCode, "b", register.takenMailCode);
    if (register.mailCode == register.takenMailCode) {
      dispatch(registerSlice.actions.isTrueChangeHandler(true));
      console.log('true')
    } else {
      dispatch(registerSlice.actions.isTrueChangeHandler(false));
      console.log("deneme")
    }

  };

  return (
    <div>
      <Modal
        /*open için parametre reduxtan alınır*/
        open={register.emailCheckModal}
        onClose={!register.emailCheckModal}
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
            sx={{ mt: 2, textAlign: "center", color: "text.secondary" }}
          >
            Please enter the code sent to{" "}
            <strong>
              {register.emailValue}
              {register.emailExtension}
            </strong>
          </Typography>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <OTPInput />
          </Box>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={CheckTakenMailCode}
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
