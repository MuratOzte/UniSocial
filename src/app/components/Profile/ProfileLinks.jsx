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

const ProfileLinks = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [links, setLinks] = useState({
        facebook: '',
        instagram: '',
        github: '',
        snapchat: '',
        twitter: '',
        linkedin: '',
        tiktok: '',
        youtube: '',
    });
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const res = await fetch('/api/get-profile-link', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch links');
                }

                const data = await res.json();
                setLinks(data.links || {});
            } catch (error) {
                console.error('Error fetching links:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, []);

    const saveLinks = async () => {
        try {
            const res = await fetch('/api/add-profile-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(links),
            });

            if (!res.ok) {
                throw new Error('Failed to update links');
            }

            const data = await res.json();
            console.log('Updated links:', data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating links:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Sosyal Medyalarım</h1>
                <div
                    className="flex justify-center items-center gap-1 cursor-pointer"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <MdEdit className="text-gray-400" size={24} />
                    <p className="text-gray-400">
                        {isEditing ? 'Kaydet' : 'Düzenle'}
                    </p>
                </div>
            </div>
            <div className="text-gray-700 space-y-4">
                {Object.keys(links).length === 0 && !isEditing ? (
                    <p className="text-gray-500">
                        Henüz sosyal medya linkleriniz eklenmemiş. Düzenle
                        modunu açarak ekleyebilirsiniz.
                    </p>
                ) : (
                    Object.entries(links).map(([platform, username]) => (
                        <div key={platform} className="flex items-center gap-4">
                            {(
                                <>
                                    {platformIcons[platform.toLowerCase()]}
                                    <p>{capitalizeFirstLetter(platform)}</p>
                                </>
                            ) || <span className="text-gray-400">?</span>}
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={username || ''}
                                    onChange={(e) =>
                                        setLinks((prev) => ({
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
                                    {username}
                                </a>
                            )}
                        </div>
                    ))
                )}
            </div>
            {isEditing && (
                <button
                    onClick={saveLinks}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Kaydet
                </button>
            )}
        </div>
    );
};

export default ProfileLinks;
