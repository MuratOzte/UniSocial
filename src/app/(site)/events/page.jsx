'use client';

import Calendar from '@/app/components/common/calendar';
import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import NewsSection from '@/app/components/feed/news/news';
import Posts from '@/app/components/feed/post/posts';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';
import ShareEvents from '@/app/components/common/ShareEvents';

const Page = () => {
    const events = ['2024-12-5', '2024-12-10', '2025-1-8'];
    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <div >
                    <LeftNav />
                </div>
                <div className="flex justify-start flex-col items-center bg-red-500 w-1/2 mt-8 mx-16">
                    <ShareEvents />
                </div>
                <div className="flex flex-col gap-5 mt-4 justify-items-end">
                    <Calendar events={events} />
                </div>
            </div>
        </div>
    );
};

export default Page;
