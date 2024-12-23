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

export const usePosts = (token) => {
    const { data, error, isValidating, mutate, isLoading } = useSWR(
        token ? ['http://localhost:3000/api/get-all-posts', token] : null,
        ([url, token]) => fetcher(url, token),
        {
            revalidateOnMount: false,
            revalidateOnFocus: false,
            revalidateIfStale: false,
            refreshInterval: 10000,
        }
    );

    return {
        posts: data?.posts || [],
        error,
        isValidating: isLoading,
        refreshPosts: mutate,
    };
};
