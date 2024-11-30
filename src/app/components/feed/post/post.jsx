import { useState, useEffect } from 'react';
import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import CommentModal from './CommentModal';

const Post = ({ post }) => {
    const [showModal, setShowModal] = useState(false);

    const comments = [
        {
            id: 1,
            name: 'Samuel Bishop',
            text: 'Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.',
            time: '5 hours ago',
            likes: 3,
        },
        {
            id: 2,
            name: 'Dennis Barrett',
            text: 'See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.',
            time: '2 hours ago',
            likes: 5,
        },
        {
            id: 3,
            name: 'Lori Ferguson',
            text: 'Wishing calling is warrant settled was lucky.',
            time: '15 minutes ago',
            likes: 0,
        },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div className="w-full max-w-lg bg-gray-800 text-white p-4 rounded-lg shadow-lg my-8">
            <div className="flex items-center mb-4">
                <img
                    src={post.avatar}
                    alt={`${post.name}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                    <p className="font-semibold">{post.name}</p>
                    <p className="text-sm text-gray-400">{post.role}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <div className="ml-auto text-gray-500 cursor-pointer">...</div>
            </div>

            <p className="mb-4">{post.text}</p>

            <img
                src={post.image}
                alt="Post content"
                className="w-full rounded-lg mb-4"
            />

            <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
                <p className="cursor-pointer">
                    <FaThumbsUp className="inline mr-1" /> Liked ({post.likes})
                </p>
                <p
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <FaCommentAlt className="inline mr-1" /> Comments (
                    {post.comments})
                </p>
                <p className="cursor-pointer">
                    <FaShare className="inline mr-1" /> Share ({post.shares})
                </p>
            </div>
            <CommentModal
                showModal={showModal}
                comments={comments}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default Post;
