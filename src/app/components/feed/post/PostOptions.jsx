import { usePosts } from '@/hooks/useFetchPosts';
import feedSlice from '@/store/Slices/FeedSlice';
import { deletePostRequest } from '@/util/feedService';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { FaTrash } from 'react-icons/fa';
import { SlOptionsVertical } from "react-icons/sl";
import { TbEdit } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import EditPostModal from './EditPostModal';

export default function PostOptions({ post }) {
    const dispatch = useDispatch();
    const [parentElement, setParentElement] = React.useState(null);

    const [token, setToken] = React.useState('');
    React.useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);
    const { refreshPosts } = usePosts(token);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        dispatch(
            feedSlice.actions.setSelectedPost({
                id: post.id,
                content: post.content,
                image: post.image,
            })
        );
        const buffer = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement;
        setParentElement(buffer);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e) => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        console.log('Deleting post:', post.id);
        parentElement.style.display = 'none';
        dispatch(
            feedSlice.actions.setPostLoading({ id: post.id, isLoading: true })
        );

        try {
            await deletePostRequest(localStorage.getItem('token'), post.id);
            refreshPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
        } finally {
            dispatch(
                feedSlice.actions.setPostLoading({
                    id: post.id,
                    isLoading: false,
                })
            );
        }
    };

    const handleEdit = () => {
        dispatch(feedSlice.actions.setIsEditModalOpen(true));
    };

    return (
        <div>
            <SlOptionsVertical
                className="ml-auto cursor-pointer text-gray-700"
                onClick={handleClick}
                size={20}

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
