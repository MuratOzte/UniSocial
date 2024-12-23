import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

const SearchedUsers = ({ profilePicture, name, surname }) => {
    if (!profilePicture && !name && !surname) return null;

    return (
        <div className='flex gap-4 my-4 text-xl bg-gray-500 text-gray-200 px-4 py-2 items-center cursor-pointer rounded-md' >
            {profilePicture ? (
                <Image
                    src={profilePicture}
                    alt={name}
                    width={50}
                    height={50}
                    className="rounded-full border border-gray-300"
                />
            ) : (
                <FaUserCircle size={50} />
            )}
            <p>
                {name} {'  '}
                {surname}{' '}
            </p>
        </div>
    );
};

export default SearchedUsers;
