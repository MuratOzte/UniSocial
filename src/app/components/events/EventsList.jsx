import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Loading from '../common/Loading';

const EventsList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); 

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
                setLoading(false); 
            } catch (error) {
                console.error('Error fetching events: ', error);
                setLoading(false); 
            }
        };
        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className='flex justify-center items-center mt-16' >
                <Loading />
            </div>
        );
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
