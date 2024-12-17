import { timeAgo } from "@/util/timeService";
import { FaThumbsUp } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const CommentModal = ({ showModal, setShowModal , comments }) => {
    const time = timeAgo();
    return (
        showModal && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        setShowModal(false);
                    }
                }}
            >
                <div className="bg-gray-800 text-white w-full max-w-xl p-6 rounded-lg relative">
                    <button
                        onClick={() => setShowModal(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                        {comments.map((comment) => (
                            <div key={comment.id} className="mb-4">
                                <div className="flex items-center mb-2">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt={`${comment.author.name}'s avatar`}
                                        className="w-8 h-8 rounded-full mr-3"
                                    />
                                    <div>
                                        <p className="font-semibold text-sm">
                                            {comment.author.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {timeAgo(comment.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-300 mb-2">
                                    {comment.content}
                                </p>
                                <p className="text-xs text-gray-400 cursor-pointer">
                                    <FaThumbsUp className="inline mr-1" /> Like
                                    ({comment.likes})
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center border-t border-gray-700 pt-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="flex-1 bg-gray-700 text-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="ml-2 text-blue-500 hover:text-blue-400">
                            <IoIosSend size={24} />
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default CommentModal;
