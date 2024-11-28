import { useState, useEffect } from 'react';
import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';

const Post = () => {
    const [showModal, setShowModal] = useState(false);

    const post = {
        user: {
            name: 'Surat Turat',
            role: 'Karadeniz Teknik Üniversitesinde Profesör',
            avatar: 'https://via.placeholder.com/40',
        },
        time: '2 hours ago',
        text: "I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.",
        image: 'https://via.placeholder.com/600x400',
        stats: {
            likes: 56,
            comments: 12,
            shares: 3,
        },
    };

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

    // Modal dışına tıklayınca kapanma ve Esc ile kapanma
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.body.style.overflow = 'hidden'; // Scroll devre dışı bırak
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto'; // Scroll yeniden aktif
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div className="w-full max-w-lg bg-gray-800 text-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
                <img
                    src={post.user.avatar}
                    alt={`${post.user.name}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                    <p className="font-semibold">{post.user.name}</p>
                    <p className="text-sm text-gray-400">{post.user.role}</p>
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
                    <FaThumbsUp className="inline mr-1" /> Liked (
                    {post.stats.likes})
                </p>
                <p
                    className="cursor-pointer"
                    onClick={() => setShowModal(true)}
                >
                    <FaCommentAlt className="inline mr-1" /> Comments (
                    {post.stats.comments})
                </p>
                <p className="cursor-pointer">
                    <FaShare className="inline mr-1" /> Share (
                    {post.stats.shares})
                </p>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={(e) => {
                        // Modal dışına tıklayınca kapanma
                        if (e.target === e.currentTarget) {
                            setShowModal(false);
                        }
                    }}
                >
                    <div className="bg-gray-800 text-white w-full max-w-md p-6 rounded-lg relative">
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
                                            alt={`${comment.name}'s avatar`}
                                            className="w-8 h-8 rounded-full mr-3"
                                        />
                                        <div>
                                            <p className="font-semibold text-sm">
                                                {comment.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {comment.time}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-2">
                                        {comment.text}
                                    </p>
                                    <p className="text-xs text-gray-400 cursor-pointer">
                                        <FaThumbsUp className="inline mr-1" />{' '}
                                        Like ({comment.likes})
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
            )}
        </div>
    );
};

export default Post;
