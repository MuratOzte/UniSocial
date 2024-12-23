import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';

const SearchedUsers = ({ profilePicture, name, surname }) => {
    if (!profilePicture && !name && !surname) return null;

    return (
        <div>
            {profilePicture ? (
                <Image
                    src={profilePicture}
                    alt={name}
                    width={30}
                    height={30}
                    className="rounded-full"
                />
            ) : (
                <FaUserCircle size={30} />
            )}
            <p>
                {name} {'  '}
                {surname}{' '}
            </p>
        </div>
    );
};

export default SearchedUsers;
