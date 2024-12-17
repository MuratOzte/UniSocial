'use client';

import Calendar from '@/app/components/common/calendar';
import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import NewsSection from '@/app/components/feed/news/news';
import Posts from '@/app/components/feed/post/posts';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';
import ShareEvents from '@/app/components/common/ShareEvents';
import Events from '@/app/components/events/events';

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
