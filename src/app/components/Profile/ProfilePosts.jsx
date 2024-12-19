import { useProfilePosts } from '@/hooks/useProfilePosts';
import Loading from '../common/Loading';
import Post from './post';

const ProfilePosts = () => {
    const { error, isValidating, posts, refreshPosts } = useProfilePosts();

    return (
        <div>
            {error && <div className="error">Failed to fetch posts</div>}
            {posts.length === 0 && !isValidating && <div>No posts found</div>}
            {!posts && <Loading />}
            {posts.map((post) => (
                <Post key={post.id} post={post} refreshPosts={refreshPosts} />
            ))}
        </div>
    );
};

export default ProfilePosts;
