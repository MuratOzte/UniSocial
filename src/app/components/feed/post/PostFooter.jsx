import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const PostFooter = ({ setShowModal, post }) => {
    const [likesCount, setLikesCount] = useState(post.likedBy.length);
    const [hasLiked, setHasLiked] = useState(
        post.likedBy.includes(localStorage.getItem('userId'))
    );
    const handleLike = async () => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/add-post-like',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify({
                        postId: post.id,
                    }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setHasLiked(!hasLiked);
                setLikesCount(data.post.likedBy.length); 
            } else {
                console.error('Failed to update like:', data.message);
            }
        } catch (error) {
            console.error('Error in handleLike:', error);
        }
    };

    return (
        <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
            <p
                className={`cursor-pointer ${hasLiked ? 'text-blue-500' : ''}`}
                onClick={handleLike}
            >
                <FaThumbsUp className="inline mr-1" />{' '}
                {hasLiked ? 'Liked' : 'Like'} ({likesCount})
            </p>
            <p className="cursor-pointer" onClick={() => setShowModal(true)}>
                <FaCommentAlt className="inline mr-1" /> Comments (
                {post.comments.length})
            </p>
            <p className="cursor-pointer">
                <FaShare className="inline mr-1" /> Share
            </p>
        </div>
    );
};

export default PostFooter;
