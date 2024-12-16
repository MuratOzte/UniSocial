import { useEffect, useState } from 'react';
import Event from './events';

const Events = () => {
    const [events, setEvents] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const getAllPostsRequest = async (token) => {
                const response = await fetch(
                    'http://localhost:3000/api/get-all-events',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data);
                return data;
            };

            try {
                const response = await getAllPostsRequest(
                    localStorage.getItem('token')
                );
                setEvents(response.events);
                console.log(response.events);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchData();
    }, []);

    return events && events.map((event) => <Event key={event.id} event={event} />);
};

export default Events;
