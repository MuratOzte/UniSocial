import { FaThumbsUp, FaCommentAlt, FaShare } from 'react-icons/fa';

const PostFooter = ({ setShowModal, post }) => {
    return (
        <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
            <p className="cursor-pointer">
                <FaThumbsUp className="inline mr-1" /> Liked ({post.likes})
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
