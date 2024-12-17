import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3000/api/get-all-events',
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                setEvents(data.events);
            } catch (error) {
                console.error('Error fetching events: ', error);
            }
        };
        fetchEvents();
    }, []);

    const handleJoin = (id) => {
        console.log(`Event ${id} joined!`);
    };

    return (
        <div className="p-6 space-y-4">
            {events.map((event) => (
                <EventCard key={event.id} event={event} onJoin={handleJoin} />
            ))}
        </div>
    );
};

export default EventsList;
