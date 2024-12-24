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

export const useAbout = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { data, error, isValidating, mutate, isLoading } = useSWR(
        token ? ['http://localhost:3000/api/get-about', token] : null,
        ([url, token]) => fetcher(url, token)
    );
    console.log(data);
    return {
        about: data?.about || {},
        error,
        isValidating,
        isLoading,
        refreshAbout: mutate,
    };
};

export const useLinks = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { data, error, isValidating, mutate, isLoading } = useSWR(
        token ? ['http://localhost:3000/api/get-profile-link', token] : null,
        ([url, token]) => fetcher(url, token)
    );
    return {
        links: data || {},
        error,
        isValidating,
        isLoading,
        refreshLinks: mutate,
    };
}

export const useProfileHeader = () => {
    const [token, setToken] = useState('');
    const location = window.location.href
    console.log(location)


    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);

    const { data, error, isValidating, mutate, isLoading } = useSWR(
        token ? [`http://localhost:3000/api/get-profile-link?userId=${'asdas'}`, token] : null,
        ([url, token]) => fetcher(url, token)
    );
    return {
        links: data || {},
        error,
        isValidating,
        isLoading,
        refreshProfileHeader: mutate,
    };
}
