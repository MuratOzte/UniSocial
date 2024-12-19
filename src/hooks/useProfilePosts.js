import { useEffect, useState } from 'react';
import useSWR from 'swr';

const fetcher = async (url, token) => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

export const useProfilePosts = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { data, error, isValidating, mutate } = useSWR(
        token ? ['http://localhost:3000/api/get-my-posts', token] : null,
        ([url, token]) => fetcher(url, token),
        {
            revalidateOnMount: true,
            refreshInterval: 30000,
        }
    );

    return {
        posts: data?.posts || [],
        error,
        isValidating,
        refreshPosts: mutate,
    };
};
