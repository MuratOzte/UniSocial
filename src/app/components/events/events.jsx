import { useEffect, useState } from 'react';
import Event from './events';

const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch(
                'http://localhost:3000/api/get-all-events',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const buffer = await response.json();
            console.log(buffer);
        };
        fetchEvents();
    }, []);

    return (
        events && events.map((event) => <Event key={event.id} event={event} />)
    );
};

export default Events;
