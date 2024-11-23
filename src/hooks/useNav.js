import { useState } from 'react';

const useNav = () => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
    const toggleSearchBar = () => setIsSearchBarFocused((prev) => !prev);

    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (e) => setSearchQuery(e.target.value);

    const clearSearch = () => setSearchQuery('');

    return {
        isSearchBarFocused,
        searchQuery,
        toggleSearchBar,
        handleSearch,
        clearSearch,
    };
};

export default useNav;
