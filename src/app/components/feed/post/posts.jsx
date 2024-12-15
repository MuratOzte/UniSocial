import { useEffect, useState } from 'react';
import Post from './post';

const Posts = () => {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const getAllPostsRequest = async (token) => {
                const response = await fetch(
                    'http://localhost:3000/api/get-all-posts',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                return data;
            };

            try {
                const response = await getAllPostsRequest(
                    localStorage.getItem('token')
                );
                setPosts(response.posts);
                console.log(response.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, []);

    return posts && posts.map((post) => <Post key={post.id} post={post} />);
};

export default Posts;
