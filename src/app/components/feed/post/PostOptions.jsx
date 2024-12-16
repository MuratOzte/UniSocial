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
import EditPostModal from './EditPostModal';

export default function PostOptions({ post }) {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        console.log(post)
        dispatch(feedSlice.actions.setSelectedPost({
            id: post.id,
            content: post.content,
            image: post.image,
        }));
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        console.log('Deleting post:', post.id);
        deletePostRequest(localStorage.getItem('token'), post.id);
    };

    const handleEdit = () => {
        dispatch(feedSlice.actions.setIsEditModalOpen(true));
    };


    return (
        <div>
            <CiMenuKebab
                className="ml-auto cursor-pointer"
                onClick={handleClick}
            />
            <EditPostModal post={post} key={post.id} />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
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
