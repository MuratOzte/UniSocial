import { useState, useEffect, useCallback } from 'react';

export const useFollow = (userId) => {
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
    }, []);

    const toggleFollow = useCallback(async () => {
        if (!token || !userId) {
            setError('Token or userId is missing');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                'http://localhost:3000/api/set-follower',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ followingId: userId }),
                }
            );

            setIsFollowing(response.data.isFollowing);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [token, userId]);

    return { isFollowing, toggleFollow, loading, error };
};
