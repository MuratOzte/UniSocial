import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    p: 4,
};

export default function ShareEvents() {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        eventType: '',
        price: 12,
        file: null,
    });

    const [fileName, setFileName] = React.useState(''); // Dosya adını tutar

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == 'price') {
            setFormData({
                ...formData,
                [name]: parseInt(value),
            });
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    React.useEffect(() => {
        console.log(formData.date);
    }, [formData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // İlk dosyayı al
        if (file) {
            setFormData({
                ...formData,
                file: file,
            });
            setFileName(file.name); // Dosya adını ayarla
        }
    };

    const handleSubmit = async () => {
        console.log('Form Data:', formData);
        try {
            const response = await fetch(
                'http://localhost:3000/api/create-event',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: formData.title,
                        description: formData.description,
                        time: formData.time,
                        date: formData.date,
                        location: formData.location,
                        eventType: formData.eventType,
                        price: formData.price,
                    }),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        handleClose();
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                    backgroundColor: '#1976D2',
                    color: '#fff',
                    borderRadius: '8px',
                    '&:hover': { backgroundColor: '#135ba1' },
                }}
            >
                Share Event
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
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{ color: '#1976D2', fontWeight: 'bold' }}
                    >
                        Share an Event
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField
                            label="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="Time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                        />
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                        />
                        <FormControl fullWidth>
                            <InputLabel id="event-type-label">
                                Event Type
                            </InputLabel>
                            <Select
                                labelId="event-type-label"
                                id="eventType"
                                name="eventType"
                                label="Event Type"
                                value={formData.eventType}
                                onChange={handleChange}
                            >
                                <MenuItem value="social">Social</MenuItem>
                                <MenuItem value="academic">Academic</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Dosya Yükleme Alanı */}
                        <Box>
                            <input
                                type="file"
                                id="file-upload"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    variant="outlined"
                                    component="span"
                                    sx={{
                                        color: '#1976D2',
                                        borderColor: '#1976D2',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            borderColor: '#135ba1',
                                            color: '#135ba1',
                                        },
                                    }}
                                >
                                    Upload File
                                </Button>
                            </label>
                            {fileName && (
                                <Typography
                                    variant="body2"
                                    sx={{ mt: 1, color: '#555' }}
                                >
                                    Selected File: {fileName}
                                </Typography>
                            )}
                        </Box>

                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                mt: 2,
                                backgroundColor: '#1976D2',
                                color: '#fff',
                                borderRadius: '8px',
                                '&:hover': { backgroundColor: '#135ba1' },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
