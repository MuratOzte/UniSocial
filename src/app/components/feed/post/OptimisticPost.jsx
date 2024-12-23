import { useEffect, useState } from 'react';

import { timeAgo } from '@/util/timeService';
import { useSelector } from 'react-redux';
import Loading from '../../common/Loading';
import CommentModal from './CommentModal';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const OptimisticPost = () => {
    const [showModal, setShowModal] = useState(false);
    const feed = useSelector((state) => state.feed);
    const ui = useSelector((state) => state.ui);

    const post = {
        likedBy: [],
        comments: [],
        image: feed.optimisticPost.image,
        content: feed.optimisticPost.content,
        author: {
            profilePicture: localStorage.getItem('pp'),
            name: localStorage.getItem('name'),
        },
    };

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
            <PostHeader post={post} time={'now'} />

            <p className="mb-4">{post.content}</p>

            {post.image && (
                <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg mb-4"
                />
            )}

            <PostFooter setShowModal={setShowModal} post={post} />
            <CommentModal
                showModal={showModal}
                comments={[]}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default OptimisticPost;
