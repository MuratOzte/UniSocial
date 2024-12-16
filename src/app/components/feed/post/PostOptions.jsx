import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CiMenuKebab } from 'react-icons/ci';
import { FaTrash } from 'react-icons/fa';
import { TbEdit } from 'react-icons/tb';
import { deletePostRequest } from '@/util/feedService';
import { useDispatch } from 'react-redux';
import feedSlice from '@/store/Slices/FeedSlice';

export default function PostOptions({ postId }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        console.log('Deleting post:', postId);
        deletePostRequest(localStorage.getItem('token'), postId);
    };

    const handleEdit = () => {
        console.log('Editing post:', postId);
        dispatch(feedSlice.actions.setIsEditModalOpen(true));
    };

    return (
        <div>
            <CiMenuKebab
                className="ml-auto cursor-pointer"
                onClick={handleClick}
            />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={handleDelete.bind(this)}
                    className="text-red-500"
                >
                    <FaTrash className="mr-2" color="red" />
                    <p className="text-red-500">Delete</p>
                </MenuItem>
                <MenuItem onClick={handleEdit.bind(this)}>
                    <TbEdit className="mr-2" />
                    Edit
                </MenuItem>
            </Menu>
        </div>
    );
}
