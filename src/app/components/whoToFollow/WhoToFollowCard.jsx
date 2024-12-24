import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { FaUserCheck } from 'react-icons/fa';
import Image from 'next/image';
import { MdAccountCircle } from 'react-icons/md';

const WhoToFollowCard = ({ id, avatar, name, role }) => {
    const [following, setFollowing] = useState([]);

    const toggleFollow = (id) => {
        setFollowing((prev) =>
            prev.includes(id.toString())
                ? prev.filter((userId) => userId !== id.toString())
                : [...prev, id.toString()]
        );
    };

    return (
        <div>
            <ul>
                <li
                    key={id}
                    className="flex items-center justify-between mb-4 last:mb-0"
                >
                    <div className="flex items-center">
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt={`${name}'s avatar`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                        ) : (
                            <MdAccountCircle className="w-10 h-10 rounded-full mr-3 border-2 border-gray-500" />
                        )}

                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-gray-400">{role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => toggleFollow(id)}
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            following.includes(id.toString())
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                    >
                        {following.includes(id.toString()) ? (
                            <FaUserCheck />
                        ) : (
                            <IoMdAdd size={20} />
                        )}
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default WhoToFollowCard;
