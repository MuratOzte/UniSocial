import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Loading from '../common/Loading';
import { useEvents } from '@/hooks/useFetchEvents';

const EventsList = () => {
    const { events, isValidating, error } = useEvents();

    if (!events) {
        return (
            <div className="flex justify-center items-center mt-16">
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-6 space-y-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
};

export default EventsList;
