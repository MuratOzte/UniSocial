import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useDispatch, useSelector } from "react-redux";
import uiSlice from "@/store/Slices/uiSlice";
import { useState } from "react";

import { motion } from "framer-motion";
import ButtonLoading from "../common/ButtonLoading";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function SettingsModal() {
  const dispatch = useDispatch();
  const isSetingsModalOpened = useSelector(
    (state) => state.ui.IsSettingsModalOpened
  );

  const [ProfilePic, setProfilePic] = useState(
    localStorage.getItem("pp") || ""
  );
  const [usrName, setUsrName] = useState(localStorage.getItem("name") || "");
  const [usrEmail, setUsrEmail] = useState(localStorage.getItem("email") || "");
  const [loading,setLoading] = useState(false);

  React.useEffect(() => {
    setProfilePic(localStorage.getItem("pp"));
    setUsrName(localStorage.getItem("name"));
    setUsrEmail(localStorage.getItem("email"));
  }, []);

  React.useEffect(() => {
    console.log(ProfilePic, usrName, usrEmail);
  }, [ProfilePic, usrName, usrEmail]);

  const [formData, setFormData] = useState({
    name: usrName,
    email: usrEmail,
    photo: null || ProfilePic,
    preview: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleClose = () =>
    dispatch(uiSlice.actions.IsSettingsModalOpenedChangeHandler(false));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          photo: reader.result,
          preview: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    }
    setLoading(true)
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("isCommunity"));

    const response = await fetch("http://localhost:3000/api/update-user-info", {
      method: "PUT",
      body: JSON.stringify({
        type:
          localStorage.getItem("isCommunity") == "true" ? "community" : "user",
        name: formData.name,
        email: formData.email,
        password: formData.newPassword,
        profilePicture: formData.photo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    setLoading(false)
    handleClose();
  };

  const isButtonDisabled = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.newPassword ||
      !formData.confirmPassword ||
      formData.newPassword !== formData.confirmPassword
    ) {
      return true;
    }

    return false;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            fontWeight="bold"
            textAlign="center"
          >
            Kullanıcı Bilgilerini Güncelle
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={formData.preview || ProfilePic || ""}
              alt="Profile Picture"
              sx={{ width: 100, height: 100, mb: 2 }}
            />
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              Fotoğraf yüklemek için tıklayın
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Ad"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="E-posta"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Yeni Şifre"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Yeni Şifre (Tekrar)"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={isButtonDisabled()}
            sx={{ py: 1.5, fontWeight: "bold" }}
          >
            {
                loading ? <ButtonLoading /> : 'Kaydet'
            }
          </Button>
        </Box>
      </Modal>
    </motion.div>
  );
}
