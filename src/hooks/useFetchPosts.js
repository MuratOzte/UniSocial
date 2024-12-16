import { useState, useEffect } from 'react';

const useFetchPosts = () => {
    const [posts, setPosts] = useState(null);

    const fetchPosts = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/get-all-posts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchPosts(token);
        }
    }, []);

    return { posts, fetchPosts };
};

export default useFetchPosts;
