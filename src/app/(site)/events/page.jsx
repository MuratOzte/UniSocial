'use client';

import Nav from '@/app/components/Nav/Nav';
import Calendar from '@/app/components/events/calendar';
import ShareEvents from '@/app/components/events/ShareEvents';
import Events from '@/app/components/events/events';
import LeftNav from '@/app/components/feed/left-nav/LeftNav';

const Page = () => {
    const events = ['2024-12-5', '2024-12-10', '2025-1-8'];
    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <LeftNav />
                <div className="flex justify-start flex-col items-center">
                    <ShareEvents />
                    <Events />
                </div>
                <div className="flex flex-col gap-5 mt-4">
                    <Calendar events={events} />
                </div>
            </div>
        </div>
    );
};

export default Page;
