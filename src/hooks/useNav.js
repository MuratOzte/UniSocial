import { useEffect, useState } from 'react';

const useNav = () => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const [isModalOpened, setIsModalOpened] = useState(false);

    const toggleSearchBar = () => {
        setIsSearchBarFocused((prev) => !prev);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const clearSearch = () => setSearchQuery('');

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setIsModalOpened(true);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 0) {
            setIsModalOpened(true);
        } else {
            setIsModalOpened(false);
        }
    }, [searchQuery]);

    return {
        isModalOpened,
        isSearchBarFocused,
        searchQuery,
        setIsModalOpened,
        toggleSearchBar,
        handleSearch,
        clearSearch,
        handleEnter,
    };
};

export default useNav;
