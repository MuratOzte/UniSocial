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
    console.log(post);

    const isTeacher = post.author.isTeacher;

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
        <div className="w-full bg-main1 text-white p-4 rounded-xl shadow-lg my-4 min-w-96 relative">
            <PostHeader post={post} time={time} isTeacher={isTeacher} />

            <p className="mb-4 text-gray-700">{post.content}</p>

            {post.image && (
                <img
                    src={post.image}
                    alt="Post content"
                    className=" rounded-lg mb-6 shadow-lg w-[550px]"
                />
            )}

            <PostFooter setShowModal={setShowModal} post={post} />
            <div className="w-11/12 h-[1px] bg-gray-200 absolute bottom-[55px] rounded-full mx-auto" />

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
