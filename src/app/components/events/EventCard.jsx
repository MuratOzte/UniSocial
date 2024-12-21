import { timeAgo } from '@/util/timeService';
import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import { AiOutlineCheck } from 'react-icons/ai';

const EventCard = ({ event }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isJoined, setIsJoined] = useState(false);

    const userId = localStorage.getItem('userId');

    if (!event) return null;

    const communityName = event.community
        ? event.community.name
        : 'Unknown Community';

    useEffect(() => {
        if (event?.participants) {
            setIsJoined(event.participants.some((e) => e.userId === userId));
        }
    }, [event, userId]);

    const handleJoin = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                'http://localhost:3000/api/join-event',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        eventId: event.id,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) throw new Error('Failed to join the event');

            const data = await response.json();
            console.log(data);

            setIsJoined(true);
        } catch (error) {
            console.error('Error joining the event:', error.message);
        } finally {
            setIsLoading(false);
        }
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
                <div className="flex justify-between">
                    <p className="text-sm text-gray-700">
                        Community: {communityName}
                    </p>
                    <p className="text-sm text-gray-700">
                        Type: {event.eventType}
                    </p>
                </div>
                <p className="text-sm text-gray-700">{event.description}</p>
                {event.image && (
                    <div className="flex-shrink-0">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="rounded-lg border border-gray-300"
                        />
                    </div>
                )}

                <div className="flex justify-between">
                    <p className="text-sm text-gray-600 mt-2">
                        {timeAgo(event.createdAt)}
                    </p>
                    <button
                        onClick={handleJoin}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-32 flex justify-center h-10 items-center"
                        disabled={isJoined}
                    >
                        {isJoined ? (
                            <AiOutlineCheck size={24} />
                        ) : isLoading ? (
                            <Loading />
                        ) : (
                            'JOIN'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
