import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import uiSlice from '@/store/Slices/uiSlice';
import { useEffect, useState } from 'react';

const fetcher = async (url, token) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch left bar info');
    }

    return response.json();
};

const useLeftNav = () => {
    const [token, setToken] = useState('');
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    }, []);
    const { data, error, isValidating, isLoading, mutate } = useSWR(
        token ? ['http://localhost:3000/api/get-left-bar-info', token] : null,
        ([url, token]) => fetcher(url, token)
    );
    const dispatch = useDispatch();
    console.log('data',data)

    if (data) {
        dispatch(
            uiSlice.actions.setUser({
                name: data.userData.name,
                avatar: data.userData.profilePicture,
            })
        );
    }

    return {
        uidata: data?.userData,
        error,
        isLoading,
        isValidating,
        refreshLeftNav: mutate,
    };
};

export default useLeftNav;
