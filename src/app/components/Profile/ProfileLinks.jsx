import React, { useState, useEffect } from 'react';
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
import { useLinks } from '@/hooks/useProfile';

const ProfileLinks = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { links, refreshLinks, error, isLoading } = useLinks();
    const [localLinks, setLocalLinks] = useState({}); // Başlangıçta boş nesne

    useEffect(() => {
        if (links && typeof links === 'object') {
            setLocalLinks((prevLinks) => {
                if (JSON.stringify(prevLinks) !== JSON.stringify(links)) {
                    return { ...links };
                }
                return prevLinks;
            });
        }
    }, [links]);

    const platformIcons = {
        facebook: <FaFacebook size={20} className="text-blue-600" />,
        instagram: <FaInstagram size={20} className="text-pink-500" />,
        github: <FaGithub size={20} className="text-gray-800" />,
        snapchat: <FaSnapchat size={20} className="text-yellow-500" />,
        twitter: <FaTwitter size={20} className="text-blue-400" />,
        linkedin: <FaLinkedin size={20} className="text-blue-700" />,
        tiktok: <FaTiktok size={20} className="text-black" />,
        youtube: <FaYoutube size={20} className="text-red-600" />,
    };

    const saveLinks = async () => {
        try {
            const response = await fetch('/api/add-profile-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(localLinks),
            });

            if (!response.ok) {
                throw new Error('Failed to update links');
            }

            await refreshLinks();
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating links:', error);
        }
    };

    const capitalizeFirstLetter = (val) =>
        String(val).charAt(0).toUpperCase() + String(val).slice(1);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading links: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Sosyal Medyalarım</h1>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={() => {
                        if (isEditing) {
                            saveLinks();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                >
                    <MdEdit className="text-gray-400" size={24} />
                    <p className="text-gray-400">
                        {isEditing ? 'Kaydet' : 'Düzenle'}
                    </p>
                </div>
            </div>
            <div className="text-gray-700 space-y-4">
                {Object.keys(localLinks || {}).length === 0 && !isEditing ? (
                    <p className="text-gray-500">
                        Henüz sosyal medya linkleriniz eklenmemiş. Düzenle
                        modunu açarak ekleyebilirsiniz.
                    </p>
                ) : (
                    Object.entries(localLinks || {}).map(
                        ([platform, username]) => (
                            <div
                                key={platform}
                                className="flex items-center gap-4"
                            >
                                {platformIcons[platform.toLowerCase()] || (
                                    <span className="text-gray-400">?</span>
                                )}
                                <p>{capitalizeFirstLetter(platform)}</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={username || ''}
                                        onChange={(e) =>
                                            setLocalLinks((prev) => ({
                                                ...prev,
                                                [platform]: e.target.value,
                                            }))
                                        }
                                        className="border rounded px-2 py-1 w-full"
                                    />
                                ) : (
                                    <a
                                        href={username}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500"
                                    >
                                        {username || 'Not provided'}
                                    </a>
                                )}
                            </div>
                        )
                    )
                )}
            </div>

            {isEditing && (
                <button
                    onClick={saveLinks}
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Kaydet
                </button>
            )}
        </div>
    );
};

export default ProfileLinks;
