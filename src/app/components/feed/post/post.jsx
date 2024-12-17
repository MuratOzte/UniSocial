import { useEffect, useState } from 'react';

import { timeAgo } from '@/util/timeService';
import { useSelector } from 'react-redux';
import Loading from '../../common/Loading';
import CommentModal from './CommentModal';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Post = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const feed = useSelector((state) => state.feed);
    const isPostLoading = feed.loadingPosts[post.id];

    const time = timeAgo(post.createdAt);
    const isTeacher = post.author.isTeacher;

    console.log(post);

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

    if (isPostLoading) {
        return (
            <div className="w-full min-h-[160px] max-w-lg bg-gray-800 text-white p-4 rounded-lg shadow-lg my-8 flex justify-center items-center">
                <Loading />
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg bg-gray-800 text-white p-4 rounded-lg shadow-lg my-8">
            <PostHeader post={post} time={time} isTeacher={isTeacher} />

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
                comments={post.comments}
                setShowModal={setShowModal}
                postId={post.id}
            />
        </div>
    );
};

export default Post;
