import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import feedSlice from '@/store/Slices/FeedSlice';
import { FiUpload } from 'react-icons/fi';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1f2937',
    color: '#fff',
    boxShadow: 24,
    p: 6,
    textAlign: 'center',
    borderRadius: 4,
};

export default function FileUploadModal({ file, setFile ,preview,setPreview}) {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);

    const handleFileModal = (bool) => {
        dispatch(feedSlice.actions.setIsFileUploadModalOpen(bool));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile); 

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); 
            };
            reader.readAsDataURL(selectedFile); 
        }
    };

    const handleFileDelete = () => {
        setFile(null); 
        setPreview(null); 
    };

    return (
        <div>
            <Modal
                open={feed.isFileUploadModalOpen}
                onClose={() => handleFileModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Upload a File
                    </Typography>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        id="img"
                        className="hidden"
                    />
                    <label htmlFor="img">
                        <div className="flex justify-center items-center cursor-pointer bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 hover:opacity-90 transition-all duration-150">
                            <FiUpload size={16} />
                            <span className="ml-2">Choose a file</span>
                        </div>
                    </label>

                    {preview ? (
                        <Box mt={2}>
                            <img
                                src={preview} 
                                alt="File Preview"
                                className="w-full h-auto max-h-64 object-contain mx-auto"
                            />
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleFileDelete}
                                sx={{ mt: 2 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    ) : (
                        <Typography color="text.secondary">
                            No file selected
                        </Typography> 
                    )}

                    <Button
                        variant="contained"
                        onClick={() => handleFileModal(false)}
                        sx={{ mt: 2, width: '70%' }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}
