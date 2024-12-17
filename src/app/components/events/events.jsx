import { useEffect, useState } from 'react';
import Event from './events';

const Events = () => {
    const [events, setEvents] = useState(null);

    return (
        events && events.map((event) => <Event key={event.id} event={event} />)
    );
};

export default Events;
