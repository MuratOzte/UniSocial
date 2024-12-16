import { useEffect, useState } from 'react';
import useFetchPosts from '@/hooks/useFetchPosts';
import Post from './post';
import Loading from '../../common/Loading';

const Posts = () => {
    const { posts, fetchPosts } = useFetchPosts();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchPosts(token);
        }
    }, []);

    return posts ? (
        posts.map((post) => <Post key={post.id} post={post} />)
    ) : (
        <div className="absolute w-full h-screen bg-black opacity-50 flex justify-center items-center z-50 overflow-hidden scale-150">
            <Loading />
        </div>
    );
};

export default Posts;
