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
    const [isCom, setIsCom] = useState(false);
    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setIsCom(localStorage.getItem('isCommunity'));
    }, []);

    if (isCom === 'true') {
        const { data, error, isValidating, isLoading, mutate } = useSWR(
            token
                ? ['http://localhost:3000/api/get-left-bar-info-com', token]
                : null,
            ([url, token]) => fetcher(url, token),
            {
                revalidateOnFocus: false,
                revalidateIfStale: false,
                refreshInterval: 30000,
            }
        );

        console.log(data);

        return {
            uidata: data?.community,
            error,
            isLoading,
            isValidating,
            refreshLeftNav: mutate,
        };
    }

    const { data, error, isValidating, isLoading, mutate } = useSWR(
        token ? ['http://localhost:3000/api/get-left-bar-info', token] : null,
        ([url, token]) => fetcher(url, token),
        {
            revalidateOnFocus: false,
            refreshInterval: 30000,
        }
    );
console.log(data)
    return {
        uidata: data?.userData,
        error,
        isLoading,
        isValidating,
        refreshLeftNav: mutate,
    };
};

export default useLeftNav;
