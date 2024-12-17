import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import feedSlice, { fetchPosts } from '@/store/Slices/FeedSlice';
import { FiUpload } from 'react-icons/fi';
import Loading from '../../common/Loading';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: '#1f2937',
    color: '#fff',
    boxShadow: 24,
    p: 6,
    textAlign: 'center',
    borderRadius: 4,
    zIndex: 1300,
};

export default function EditPostModal({ post }) {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);

    const [isLoading, setIsLoading] = useState(false);

    const handleModalClose = () => {
        dispatch(feedSlice.actions.setIsEditModalOpen(false));
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Image = reader.result;
            console.log('Base64 Image:', base64Image);
            dispatch(
                feedSlice.actions.setSelectedPost({
                    ...post,
                    image: base64Image,
                })
            );
        };
        reader.readAsDataURL(selectedFile);
    };

    const setContent = (event) => {
        const content = event.target.value;
        dispatch(
            feedSlice.actions.setSelectedPost({
                ...feed.selectedPost, 
                content, 
            })
        );
    };

    const handleSaveChanges = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/update-user-post`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify({
                        content: feed.selectedPost.content,
                        image: feed.selectedPost.image,
                        postId: feed.selectedPost.id,
                    }),
                }
            );
            setIsLoading(false);
            dispatch(fetchPosts(localStorage.getItem('token')));
            console.log(response.body);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }

        handleModalClose();
    };

    return (
        <Modal
            open={feed.isEditModalOpen}
            onClose={handleModalClose}
            aria-labelledby="edit-modal-title"
            aria-describedby="edit-modal-description"
        >
            <Box sx={style}>
                <Typography id="edit-modal-title" variant="h6" component="h2">
                    Edit Post
                </Typography>
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 flex items-center justify-center z-50">
                        <Loading />
                    </div>
                )}

                <textarea
                    onChange={setContent}
                    value={feed.selectedPost.content}
                    className="w-full bg-gray-700 text-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 placeholder:text-gray-500 hover:opacity-90 transition-all duration-150"
                    placeholder="New Content"
                />

                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    id="edit-img"
                    className="hidden"
                />
                <label htmlFor="edit-img">
                    <div className="flex justify-center items-center cursor-pointer bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 hover:opacity-90 transition-all duration-150 w-full">
                        <FiUpload size={16} />
                        <span className="ml-2">Choose an image</span>
                    </div>
                </label>

                <button
                    className="w-full bg-blue-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 hover:opacity-90 transition-all duration-150"
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </button>
                <button
                    className="w-full bg-red-500 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 my-4 hover:opacity-90 transition-all duration-150"
                    onClick={handleModalClose}
                >
                    Cancel
                </button>
            </Box>
        </Modal>
    );
}
