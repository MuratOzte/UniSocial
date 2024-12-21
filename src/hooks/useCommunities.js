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

export const useEvents = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { data, error, isValidating, mutate, isLoading } = useSWR(
        token ? ['http://localhost:3000/api/get-all-communities', token] : null,
        ([url, token]) => fetcher(url, token)
    );

    return {
        communities: data?.communities || [],
        error,
        isValidating,
        isLoading,
        refreshCommunities: mutate,
    };
};
