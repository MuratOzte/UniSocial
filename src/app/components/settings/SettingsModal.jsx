import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useDispatch, useSelector } from 'react-redux';
import uiSlice from '@/store/Slices/uiSlice';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
};

export default function SettingsModal() {
    const dispatch = useDispatch();
    const isSetingsModalOpened = useSelector(
        (state) => state.ui.IsSettingsModalOpened
    );

    const [ProfilePic, setProfilePic] = useState('');
    const [usrName, setUsrName] = useState('');
    const [usrEmail, setUsrEmail] = useState('');

    React.useEffect(() => {
        setProfilePic(localStorage.getItem('pp'));
        setUsrName(localStorage.getItem('name'));
        setUsrEmail(localStorage.getItem('email'));
    }, []);

    const [formData, setFormData] = useState({
        name: usrName,
        email: usrEmail,
        photo: null || ProfilePic, 
        preview: '', 
        newPassword: '', 
        confirmPassword: '', 
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
                    photo: reader.result, // Fotoğrafın base64 formatındaki verisi
                    preview: URL.createObjectURL(file), // Önizleme için URL oluştur
                });
            };
            reader.readAsDataURL(file); // Base64 formatına çevir
        }
    };

    const handleSubmit = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert('Yeni şifreler eşleşmiyor!');
            return;
        }

        const token = localStorage.getItem('token');

        const response = await fetch(
            'http://localhost:3000/api/update-user-info',
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.newPassword,
                    profilePicture: formData.photo, // Base64 formatındaki fotoğraf
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        console.log(data);

        handleClose();
    };

    return (
        <Modal
            open={isSetingsModalOpened}
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <Avatar
                        src={formData.preview || ProfilePic || ''}
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
                    sx={{ py: 1.5, fontWeight: 'bold' }}
                >
                    Kaydet
                </Button>
            </Box>
        </Modal>
    );
}
