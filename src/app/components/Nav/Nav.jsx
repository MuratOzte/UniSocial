'use client';

import Image from 'next/image';
import { RxAvatar } from 'react-icons/rx';
import { RiSearchLine } from 'react-icons/ri';
import { IoCloseSharp } from 'react-icons/io5';

import useNav from '@/hooks/useNav';

const Nav = () => {
    const {
        isSearchBarFocused,
        searchQuery,
        toggleSearchBar,
        handleSearch,
        clearSearch,
    } = useNav();

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
            {/* Logo */}
            <div className="flex items-center h-[80px]">
                <Image
                    src={require('@/assets/logo/logo.png')}
                    alt="UniSocial"
                    width={200}
                    height={80}
                    className="object-cover object-center"
                />
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center w-1/4">
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
                    onChange={handleSearch}
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

            {/* User Info */}
            <div className="flex items-center space-x-4">
                <RxAvatar className="w-10 h-10 text-gray-500 bg-gray-100 rounded-full p-1" />
                <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">
                        John Doe
                    </span>
                    <span className="text-sm text-gray-500">
                        Computer Science, ABC University
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
