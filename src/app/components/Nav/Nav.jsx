'use client';

import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { IoCloseSharp, IoSettingsSharp } from 'react-icons/io5';
import { RiSearchLine } from 'react-icons/ri';
import { TbMessages } from 'react-icons/tb';

import useNav from '@/hooks/useNav';
import Icons from './Icons';

const Nav = () => {
    const {
        isSearchBarFocused,
        searchQuery,
        toggleSearchBar,
        handleSearch,
        clearSearch,
    } = useNav();

    return (
        <nav className="flex items-center justify-between px-12 py-2 bg-[#191a1f] shadow-md">
            <div className="flex items-center h-[80px]">
                <Image
                    src={require('@/assets/logo/logo.png')}
                    alt="UniSocial"
                    width={200}
                    height={80}
                    className="object-cover object-center"
                />
            </div>
            <div className="relative flex items-center w-[35%]">
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
            <div className="flex items-center gap-4">
                <Icons title="Messages" icon={<TbMessages />} />
                <Icons title="Settings" icon={<IoSettingsSharp />} />
                <Icons title="Account" icon={<FaUserCircle />} />
            </div>
        </nav>
    );
};

export default Nav;
