import { timeAgo } from '@/util/timeService';
import React from 'react';

const EventCard = ({ event, onJoin }) => {
    if (!event) return null;
    console.log(event);

    return (
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6 space-x-6 min-w-[450px]">
            {/* Left Side: Event Info */}
            <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">
                    {event.title}
                </h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                    {timeAgo(event.createdAt)}
                </p>
            </div>

            {/* Right Side: Event Image */}
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
            <button
                onClick={() => onJoin(event.id)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
                Join Event
            </button>
        </div>
    );
};

export default EventCard;
