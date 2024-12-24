import React, { useState, useEffect } from 'react';
import {
    IoCloseCircleOutline,
    IoArrowUndoCircleOutline,
} from 'react-icons/io5';
import { AiOutlineEdit, AiOutlineSave } from 'react-icons/ai';
import {
    MdOutlineDescription,
    MdLocationOn,
    MdDateRange,
    MdPerson,
    MdTheaters,
    MdPhone,
    MdEmail,
} from 'react-icons/md';
import Loading from '../common/Loading';
import { useAbout } from '@/hooks/useProfile';

const ProfileAbout = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [aboutInfo, setAboutInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { about, refreshAbout } = useAbout();

    useEffect(() => {
        if (about && Object.keys(about).length > 0) {
            setAboutInfo(about);
        }
    }, [about]);

    const handleEditToggle = async () => {
        if (isEditing) {
            try {
                setIsLoading(true);
                const response = await fetch('/api/update-about', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                    body: JSON.stringify(aboutInfo),
                });

                const data = await response.json();

                if (!response.ok) {
                    console.error('Error updating profile:', data.message);
                } else {
                    await refreshAbout();
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            } finally {
                setIsLoading(false);
            }
        }
        setIsEditing(!isEditing);
    };

    const handleFieldChange = (field, value) => {
        setAboutInfo((prev) => ({ ...prev, [field]: value }));
    };

    const icons = {
        description: (
            <MdOutlineDescription size={20} className="mr-2 text-gray-800" />
        ),
        location: <MdLocationOn size={20} className="mr-2 text-blue-500" />,
        birthDate: <MdDateRange size={20} className="mr-2 text-pink-500" />,
        gender: <MdPerson size={20} className="mr-2 text-gray-600" />,
        hobbies: <MdTheaters size={20} className="mr-2 text-purple-500" />,
        telno: <MdPhone size={20} className="mr-2 text-green-500" />,
        email: <MdEmail size={20} className="mr-2 text-orange-500" />,
    };

    const renderField = (field, label, type = 'text') => (
        <div className="mb-4 flex items-center w-full">
            {icons[field]}
            <div className="w-full flex gap-2">
                <label className="block font-semibold text-gray-700 h-fit">
                    {label}:
                </label>
                {isEditing ? (
                    <input
                        type={type}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={aboutInfo[field] || ''}
                        onChange={(e) =>
                            handleFieldChange(field, e.target.value)
                        }
                    />
                ) : (
                    <span className="">
                        {aboutInfo[field] || 'Not provided'}
                    </span>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-[350px] h-fit mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">About Me</h2>
                <button
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    onClick={handleEditToggle}
                >
                    {isLoading ? (
                        <Loading />
                    ) : isEditing ? (
                        <AiOutlineSave size={20} />
                    ) : (
                        <AiOutlineEdit size={20} />
                    )}
                    <span className="ml-2">{isEditing ? 'Save' : 'Edit'}</span>
                </button>
            </div>
            {renderField('description', 'Description')}
            {renderField('location', 'Location')}
            {renderField('birthDate', 'Birthdate', 'date')}
            {renderField('gender', 'Gender')}
            {renderField('hobbies', 'Hobbies')}
            {renderField('telno', 'Phone', 'tel')}
            {renderField('email', 'Email', 'email')}
        </div>
    );
};

export default ProfileAbout;
