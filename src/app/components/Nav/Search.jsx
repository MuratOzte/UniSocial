import useNav from '@/hooks/useNav';
import { IoCloseSharp } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import { useEffect } from 'react';
import SearchModal from './SearchModal';

const Search = ({}) => {
    const {
        clearSearch,
        handleSearch,
        isSearchBarFocused,
        searchQuery,
        toggleSearchBar,
        isModalOpened,
        setIsModalOpened,
        handleEnter,
    } = useNav();

    return (
        <div className="relative flex items-center w-2/3 min-w-[400px]">
            {isModalOpened && <SearchModal />}
            <RiSearchLine
                className={`absolute left-2 ${
                    !isSearchBarFocused ? 'text-gray-600' : 'text-blue-500'
                }`}
                size={24}
            />
            <input
                onFocus={toggleSearchBar}
                onBlur={toggleSearchBar}
                value={searchQuery}
                onKeyDown={handleEnter}
                onChange={(e) => {
                    handleSearch(e);
                }}
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-50 text-gray-800"
            />
            {searchQuery && (
                <IoCloseSharp
                    className="absolute right-2 text-gray-600 cursor-pointer hover:text-gray-800"
                    size={20}
                    onClick={clearSearch}
                />
            )}
        </div>
    );
};

export default Search;
