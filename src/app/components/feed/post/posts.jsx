import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '@/store/Slices/FeedSlice';
import Post from './post';
import Loading from '../../common/Loading';

const Posts = () => {
    const dispatch = useDispatch();
    const { posts, status, error } = useSelector((state) => state.feed);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(fetchPosts(token));
        }
    }, [dispatch]);

    if (status === 'loading') {
        return (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <Loading />
            </div>
        );
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
    ) : (
        <div>No posts available</div>
    );
};

export default Posts;
