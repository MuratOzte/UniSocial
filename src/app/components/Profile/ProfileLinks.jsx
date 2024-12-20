import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import {
    FaFacebook,
    FaInstagram,
    FaGithub,
    FaSnapchat,
    FaTwitter,
    FaLinkedin,
    FaTiktok,
    FaYoutube,
} from 'react-icons/fa';
import {
    IoCloseCircleOutline,
    IoArrowUndoCircleOutline,
} from 'react-icons/io5';

const ProfileLinks = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [links, setLinks] = useState({
        facebook: 'murat.ozturk',
        instagram: 'murat.ozturk',
        snapchat: 'murat.ozturk',
        github: 'muratOzte',
        twitter: 'muratOzte',
        linkedin: 'muratOzte',
        tiktok: 'muratOzte',
        youtube: 'muratOzte',
    });
    const [hiddenLinks, setHiddenLinks] = useState([]);

    const handleInputChange = (platform, value) => {
        setLinks((prev) => ({
            ...prev,
            [platform]: value,
        }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const removeHiddenLink = (platform) => {
        setHiddenLinks((prev) => prev.filter((link) => link !== platform));
    };

    const hideLink = (platform) => {
        setHiddenLinks((prev) => [...prev, platform]);
    };

    const isHidden = (platform) => hiddenLinks.includes(platform);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Sosyal Medyalarım</h1>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={toggleEdit}
                >
                    <MdEdit className="text-gray-400" size={24} />
                    <p className="text-gray-400">
                        {isEditing ? 'Kaydet' : 'Düzenle'}
                    </p>
                </div>
            </div>
            <div className="text-gray-700 space-y-4">
                {Object.entries(links).map(([platform, username]) => {
                    if (isHidden(platform) && !isEditing) {
                        return null; 
                    }

                    return (
                        <div
                            key={platform}
                            className="flex items-center gap-4 relative"
                        >
                            {platform === 'facebook' && (
                                <FaFacebook size={24} color="blue" />
                            )}
                            {platform === 'instagram' && (
                                <FaInstagram size={24} color="red" />
                            )}
                            {platform === 'snapchat' && (
                                <FaSnapchat
                                    size={24}
                                    className="text-yellow-500"
                                />
                            )}
                            {platform === 'github' && <FaGithub size={24} />}
                            {platform === 'twitter' && (
                                <FaTwitter size={24} color="blue" />
                            )}
                            {platform === 'linkedin' && (
                                <FaLinkedin size={24} color="blue" />
                            )}
                            {platform === 'tiktok' && (
                                <FaTiktok size={24} color="black" />
                            )}
                            {platform === 'youtube' && (
                                <FaYoutube size={24} color="red" />
                            )}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        handleInputChange(
                                            platform,
                                            e.target.value
                                        )
                                    }
                                    style={{
                                        textDecoration: isHidden(platform)
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                />
                            ) : (
                                <p>{username}</p>
                            )}
                            {isEditing &&
                                (isHidden(platform) ? (
                                    <IoArrowUndoCircleOutline
                                        size={24}
                                        className="text-green-500 cursor-pointer absolute right-0"
                                        onClick={() =>
                                            removeHiddenLink(platform)
                                        }
                                    />
                                ) : (
                                    <IoCloseCircleOutline
                                        size={24}
                                        className="text-gray-400 cursor-pointer absolute right-0"
                                        onClick={() => hideLink(platform)}
                                    />
                                ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileLinks;
