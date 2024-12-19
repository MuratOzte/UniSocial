'use client';
import { usePosts } from '@/hooks/useFetchPosts';
import Post from './post';
import Loading from '../../common/Loading';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OptimisticPost from './OptimisticPost';

const Posts = () => {
    const feed = useSelector((state) => state.feed);

    const [token, setToken] = useState('');
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);
    const { posts, error, isValidating } = usePosts(token);

    if (isValidating && !posts.length) {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return posts.length > 0 ? (
        <>
            {
                feed.optimisticPost.isVisible && (
                    <OptimisticPost />
                )
            }
            {posts.map((post) => <Post key={post.id} post={post} />)}
        </>
    ) : (
        <div>No posts available</div>
    );
};

export default Posts;
