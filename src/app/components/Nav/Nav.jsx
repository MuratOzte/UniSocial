'use client';

import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { TbMessages } from 'react-icons/tb';

import Icons from './Icons';

const Nav = () => {
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
            <div className="flex items-center gap-4">
                <Icons title="Messages" icon={<TbMessages size={20} />} />
                <Icons title="Settings" icon={<IoSettingsSharp size={20} />} />
                <Icons title="Account" icon={<FaUserCircle size={20} />} />
            </div>
        </nav>
    );
};

export default Nav;
