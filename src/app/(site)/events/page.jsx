'use client';

import Nav from '@/app/components/Nav/Nav';
import Calendar from '@/app/components/events/calendar';
import ShareEvents from '@/app/components/events/ShareEvents';
import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import EventsList from '@/app/components/events/EventsList';

const Page = () => {
    const events = ['2024-12-5', '2024-12-10', '2025-1-8'];

    const eventData = {
        title: "Tech Conference 2024",
        description: "A conference for technology enthusiasts.",
        date: "2024-09-15",
        time: "10:00 AM - 5:00 PM",
        location: "Convention Center, New York",
        eventType: "Conference",
        price: "$50",
        file: null, 
      };
    
    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <LeftNav />
                <div className="flex justify-start flex-col items-center">
                    <ShareEvents />
                    <EventsList />
                </div>
                <div className="flex flex-col gap-5 mt-4">
                    <Calendar events={events} />
                </div>
            </div>
        </div>
    );
};

export default Page;
