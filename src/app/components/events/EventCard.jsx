import { timeAgo } from '@/util/timeService';
import React from 'react';

const EventCard = ({ event }) => {
    if (!event) return null;

    const communityName = event.community
        ? event.community.name
        : 'Unknown Community';
    const communityProfilePicture = event.community
        ? event.community.profilePicture
        : '';

    const handleJoin = () => {
        console.log(event.id);
        //emrebura join-event apisine istek atcan bodyde eventId:event.id olmalı token olmalı
    };

    return (
        <div className="flex items-center bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 space-x-6 min-w-[450px]">
            <div className="flex-1 flex flex-col gap-5 w-full">
                <div className="flex justify-between w-full">
                    <h3 className="text-xl font-semibold text-gray-800">
                        {event.title}
                    </h3>

                    <div className="flex items-end gap-2">
                        <p className="text-sm text-gray-600">
                            {event.date} - {event.time} | {event.location}
                        </p>
                        <p className="text-sm text-gray-600">
                            Price: {event.price}{' '}
                            {event.price > 0 ? '₺' : 'Free'}
                        </p>
                    </div>
                </div>
                <p className="text-sm text-gray-700">
                    Community: {communityName}
                </p>
                <p className="text-sm text-gray-700">{event.description}</p>

                <div className="flex justify-between">
                    <p className="text-sm text-gray-600 mt-2">
                        {timeAgo(event.createdAt)}
                    </p>
                    <button
                        onClick={handleJoin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-32"
                    >
                        Join
                    </button>
                </div>
            </div>

            {event.image && (
                <div className="flex-shrink-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-48 h-32 object-cover rounded-lg border border-gray-300"
                    />
                </div>
            )}
        </div>
    );
};

export default EventCard;
