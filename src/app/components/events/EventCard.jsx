import { timeAgo } from '@/util/timeService';
import React from 'react';

const EventCard = ({ event, onJoin }) => {
    if (!event) return null;

    const communityName = event.community
        ? event.community.name
        : 'Unknown Community';
    const communityProfilePicture = event.community
        ? event.community.profilePicture
        : '';

    return (
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-x-6 min-w-[450px]">
            <div className="flex-1 flex flex-col gap-5 w-full">
                {/* Title and Right Section (Time, Price, Community) */}
                <div className="flex justify-between w-full">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {event.title}
                    </h3>

                    {/* Time, Price, and Community Name Section */}
                    <div className="flex items-end gap-2">
                        <p className="text-sm text-gray-500">
                            {event.date} - {event.time} | {event.location}
                        </p>
                        <p className="text-sm text-gray-500">
                            Price: {event.price}{' '}
                            {event.price > 0 ? '₺' : 'Free'}
                        </p>
                    </div>
                </div>
                <p className="text-sm text-gray-600">
                    Community: {communityName}
                </p>
                {/* Event Description */}
                <p className="text-sm text-gray-600">{event.description}</p>

                {/* Time Ago (Created At) */}
                <div className='flex justify-between' >
                    <p className="text-sm text-gray-500 mt-2">
                        {timeAgo(event.createdAt)}
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-32">
                        Join
                    </button>
                </div>
            </div>

            {/* Event Image */}
            {event.image && (
                <div className="flex-shrink-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-48 h-32 object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Join Button */}
        </div>
    );
};

export default EventCard;
