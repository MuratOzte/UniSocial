import { timeAgo } from '@/util/timeService';
import { FaThumbsUp } from 'react-icons/fa6';
import { IoIosSend } from 'react-icons/io';

const CommentModal = ({ showModal, setShowModal, comments }) => {
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
                <div className="bg-gray-900 text-white w-full max-w-xl p-6 rounded-lg shadow-xl relative">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-100 transition-colors duration-200"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
                        Comments
                    </h2>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="flex flex-col bg-gray-800 p-4 rounded-lg shadow-lg hover:opacity-95 transition-all duration-150"
                            >
                                <div className="flex items-center mb-3">
                                    <img
                                        src={
                                            comment.author.profilePicture ||
                                            'https://via.placeholder.com/40'
                                        }
                                        alt={`${comment.author.name}'s avatar`}
                                        className="w-10 h-10 rounded-full border-2 border-gray-700 mr-3"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-medium text-sm text-gray-100">
                                            {comment.author.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {timeAgo(comment.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mb-2 ml-1">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center border-t border-gray-700 pt-4 mt-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 bg-gray-800 text-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button className="ml-3 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-400 transition-colors">
                            <IoIosSend size={20} />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CommentModal;
