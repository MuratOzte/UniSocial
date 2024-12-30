import { useProfileAboutLink } from '@/hooks/useProfile';
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaSnapchat,
    FaTiktok,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa';

import Loading from '@/app/components/common/Loading'

const ProfileLinks = ({ userId }) => {
    const { links, isLoading, error } = useProfileAboutLink(userId);

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

    const capitalizeFirstLetter = (val) =>
        String(val).charAt(0).toUpperCase() + String(val).slice(1);

    if (isLoading) {
        return <Loading />
    }

    if (error) {
        return <div>Error loading links: {error.message}</div>;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="mb-4">
                <h1 className="text-3xl font-semibold">Sosyal Medyalarım</h1>
            </div>
            <div className="text-gray-700 space-y-4">
                {Object.keys(links).length === 0 ||
                Object.keys(links) == null ? (
                    <p className="text-gray-500">
                        Henüz sosyal medya linkleriniz eklenmemiş.
                    </p>
                ) : (
                    Object.entries(links).map(([platform, username]) => (
                        <div
                            key={platform}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-2">
                                {platformIcons[platform.toLowerCase()] || (
                                    <span className="text-gray-400">?</span>
                                )}
                                <p>{capitalizeFirstLetter(platform)}</p>
                            </div>
                            {username ? (
                                <a
                                    href={username}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                >
                                    {username}
                                </a>
                            ) : (
                                <p className="text-gray-500">Henüz eklenmedi</p>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProfileLinks;
