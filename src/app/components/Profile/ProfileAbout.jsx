import { useState } from 'react';
import {
    FaBirthdayCake,
    FaBookOpen,
    FaMale,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from 'react-icons/fa';
import { MdOutgoingMail, MdEdit } from 'react-icons/md';
import {
    IoArrowUndoCircleOutline,
    IoCloseCircleOutline,
} from 'react-icons/io5';
import { BsGenderAmbiguous } from "react-icons/bs";

const ProfileAbout = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [aboutInfo, setAboutInfo] = useState({
        location: 'İstanbul',
        birthday: '12.12.1990',
        gender: 'Erkek',
        hobbies: 'Kitap Okumak, Sinema, Seyahat',
        phone: '0123 123 12 12',
        email: 'admin@admin',
    });

    const [hiddenFields, setHiddenFields] = useState([]);

    const handleInputChange = (field, value) => {
        setAboutInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const removeHiddenField = (field) => {
        setHiddenFields((prev) => prev.filter((item) => item !== field));
    };

    const hideField = (field) => {
        setHiddenFields((prev) => [...prev, field]);
    };

    const isHidden = (field) => hiddenFields.includes(field);

    return (
        <div className="p-6 bg-white shadow-md rounded-lg w-[400px] h-fit mt-12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-semibold">Hakkımda</h1>
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
                {isEditing ? (
                    <>
                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('location') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaMapMarkerAlt
                                className="text-green-500"
                                size={24}
                            />
                            <span className="font-semibold">Yaşadığı Yer:</span>
                            <input
                                type="text"
                                value={aboutInfo.location}
                                onChange={(e) =>
                                    handleInputChange(
                                        'location',
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('location') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() =>
                                        removeHiddenField('location')
                                    }
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('location')}
                                />
                            )}
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('birthday') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaBirthdayCake
                                className="text-pink-500"
                                size={24}
                            />
                            <span className="font-semibold">Doğum Tarihi:</span>
                            <input
                                type="text"
                                value={aboutInfo.birthday}
                                onChange={(e) =>
                                    handleInputChange(
                                        'birthday',
                                        e.target.value
                                    )
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('birthday') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() =>
                                        removeHiddenField('birthday')
                                    }
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('birthday')}
                                />
                            )}
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('gender') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >   
                        
                            <BsGenderAmbiguous  className="text-blue-500" size={24} />
                            <span className="font-semibold">Cinsiyet:</span>
                            <input
                                type="text"
                                value={aboutInfo.gender}
                                onChange={(e) =>
                                    handleInputChange('gender', e.target.value)
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('gender') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() => removeHiddenField('gender')}
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('gender')}
                                />
                            )}
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('hobbies') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaBookOpen className="text-orange-500" size={24} />
                            <span className="font-semibold">Hobiler:</span>
                            <input
                                type="text"
                                value={aboutInfo.hobbies}
                                onChange={(e) =>
                                    handleInputChange('hobbies', e.target.value)
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('hobbies') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() => removeHiddenField('hobbies')}
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('hobbies')}
                                />
                            )}
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('phone') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaPhoneAlt className="text-teal-500" size={24} />
                            <span className="font-semibold">Telefon:</span>
                            <input
                                type="text"
                                value={aboutInfo.phone}
                                onChange={(e) =>
                                    handleInputChange('phone', e.target.value)
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('phone') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() => removeHiddenField('phone')}
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('phone')}
                                />
                            )}
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2 relative"
                            style={{
                                display:
                                    isHidden('email') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <MdOutgoingMail
                                className="text-red-500"
                                size={24}
                            />
                            <span className="font-semibold">E-posta:</span>
                            <input
                                type="text"
                                value={aboutInfo.email}
                                onChange={(e) =>
                                    handleInputChange('email', e.target.value)
                                }
                                className="border border-gray-300 rounded px-2 py-1 w-full"
                            />
                            {isHidden('email') ? (
                                <IoArrowUndoCircleOutline
                                    size={24}
                                    className="text-green-500 cursor-pointer absolute right-0"
                                    onClick={() => removeHiddenField('email')}
                                />
                            ) : (
                                <IoCloseCircleOutline
                                    size={24}
                                    className="text-gray-400 cursor-pointer absolute right-0"
                                    onClick={() => hideField('email')}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-medium text-gray-900">
                            Ben yazılım yaparım, kitap okurum, film izlerim,
                            erkeklerle gezerim
                        </h2>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('location') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaMapMarkerAlt
                                className="text-green-500"
                                size={24}
                            />
                            <span className="font-semibold">Yaşadığı Yer:</span>
                            <span>{aboutInfo.location}</span>
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('birthday') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaBirthdayCake
                                className="text-pink-500"
                                size={24}
                            />
                            <span className="font-semibold">Doğum Tarihi:</span>
                            <span>{aboutInfo.birthday}</span>
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('gender') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaMale className="text-blue-500" size={24} />
                            <span className="font-semibold">Cinsiyet:</span>
                            <span>{aboutInfo.gender}</span>
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('hobbies') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaBookOpen className="text-orange-500" size={24} />
                            <span className="font-semibold">Hobiler:</span>
                            <span>{aboutInfo.hobbies}</span>
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('phone') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <FaPhoneAlt className="text-teal-500" size={24} />
                            <span className="font-semibold">Telefon:</span>
                            <span>{aboutInfo.phone}</span>
                        </div>

                        <div
                            className="flex items-center text-sm space-x-2"
                            style={{
                                display:
                                    isHidden('email') && !isEditing
                                        ? 'none'
                                        : 'flex',
                            }}
                        >
                            <MdOutgoingMail
                                className="text-red-500"
                                size={24}
                            />
                            <span className="font-semibold">E-posta:</span>
                            <span>{aboutInfo.email}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileAbout;
