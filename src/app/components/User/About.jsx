import React from 'react';
import {
    MdOutlineDescription,
    MdLocationOn,
    MdDateRange,
    MdPerson,
    MdTheaters,
    MdPhone,
    MdEmail,
} from 'react-icons/md';
import { useAbout, useProfileAboutLink } from '@/hooks/useProfile';

const About = ({ userId }) => {
    const { about } = useProfileAboutLink(userId);
    console.log(about);

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

    const renderField = (field, label) => (
        <div className="mb-4 flex items-center w-full">
            {icons[field]}
            <div className="w-full flex justify-between">
                <label className="block font-semibold text-gray-700 h-fit">
                    {label}:
                </label>
                <span className="">{about[field] || 'Not provided'}</span>
            </div>
        </div>
    );

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-[350px] h-fit mt-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">About Me</h2>
            </div>
            {renderField('description', 'Description')}
            {renderField('location', 'Location')}
            {renderField('birthDate', 'Birthdate')}
            {renderField('gender', 'Gender')}
            {renderField('hobbies', 'Hobbies')}
            {renderField('telno', 'Phone')}
            {renderField('email', 'Email')}
        </div>
    );
};

export default ProfileAboutView;
