import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "@/store/Slices/uiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function AnnouncementModal() {
  const dispatch = useDispatch();
  const [isEmpty, setIsEmpty] = React.useState(false);
  const IsAnnouncementModuleOpened = useSelector(
    (state) => state.ui.IsAnnouncementModuleOpened
  );
  const [announcement, setAnnouncement] = React.useState("");

  const handleClose = () => {
    dispatch(uiSlice.actions.IsAnnouncementModuleOpenedChangeHandler(false));
    setAnnouncement("");
  };

  const handleAnnouncementChange = (event) => {
    const InputVal = event.target.value;
    setAnnouncement(InputVal);
    if (InputVal) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  };

  const handleSendAnnouncement = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/add-news", {
        method: "POST",
        body: JSON.stringify({
          content: announcement,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      handleClose();
    } catch (error) {
        handleClose();
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={IsAnnouncementModuleOpened}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            color="primary"
            fontWeight="bold"
          >
            Yeni Duyuru
          </Typography>
          <TextField
            id="announcement-text"
            label="Duyuru Metni"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={announcement}
            onChange={handleAnnouncementChange}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendAnnouncement}
              disabled={!isEmpty}
              sx={{ px: 4, py: 1 }}
            >
              Gönder
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              sx={{
                px: 4,
                py: 1,
                borderColor: "grey.400",
                color: "grey.700",
                "&:hover": {
                  borderColor: "grey.600",
                  color: "grey.900",
                },
              }}
            >
              İptal
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
