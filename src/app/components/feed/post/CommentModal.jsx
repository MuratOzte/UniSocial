import { fetchPosts } from '@/store/Slices/FeedSlice';
import { timeAgo } from '@/util/timeService';
import { useEffect, useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import Loading from '../../common/Loading';
import { usePosts } from '@/hooks/useFetchPosts';
import { TbSend } from "react-icons/tb";
import ButtonLoading from '../../common/ButtonLoading';

const CommentModal = ({ showModal, setShowModal, comments, postId }) => {
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { refreshPosts } = usePosts(token);

    const handleInputComment = (e) => {
        setComment(e.target.value);
    };

    const handleKeyboardAction = (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    };

    const handleAddComment = async () => {
        if (comment.trim() === '') return;
        setIsLoading(true);
        try {
            const response = await fetch(
                'http://localhost:3000/api/add-comment',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify({
                        content: comment,
                        postId,
                        authorType:
                            localStorage.getItem('isCommunity') == 'true'
                                ? 'COMMUNITY'
                                : 'USER',
                    }),
                }
            );
            const buffer = await response.json();
            refreshPosts();
            console.log(buffer);
            setComment('');
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        showModal && (
            <div
                className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowModal(false);
                    }
                }}
            >
                <div className="bg-main1 w-full max-w-xl p-6 rounded-lg shadow-xl relative">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-2 right-2 text-gray-700 transition-colors duration-200"
                    >
                        ✕
                    </button>

                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2 text-gray-700 text-center">
                        Comments
                    </h2>

                    <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-4">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="flex flex-col bg-main2 p-4 rounded-lg shadow-md"
                                >
                                    <div className="flex items-center mb-3">
                                        <img
                                            src={
                                                comment.author.profilePicture ||
                                                'https://via.placeholder.com/40'
                                            }
                                            alt={`${comment.author.name}'s avatar`}
                                            className="w-10 h-10 rounded-full  mr-3"
                                        />
                                        <div className="flex flex-col">
                                            <p className="font-medium text-md text-gray-800">
                                                {comment.author.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {timeAgo(comment.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2 ml-1">
                                        {comment.content}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center bg-main1 p-6 rounded-lg shadow-md">
                                <p className="text-gray-400 text-sm">
                                    No comments yet. Be the first to comment!
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center border-t border-gray-200 pt-4 mt-4">
                        <input
                            type="text"
                            onChange={handleInputComment}
                            value={comment}
                            onKeyDown={handleKeyboardAction}
                            placeholder="Add a comment..."
                            className="flex-1 bg-main3
                             text-gray-800 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-lg"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleAddComment}
                            className="ml-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-400 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ButtonLoading/>
                            ) : (
                                <TbSend size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CommentModal;
