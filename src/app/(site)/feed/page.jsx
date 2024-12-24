'use client';

import Nav from '@/app/components/Nav/Nav';
import AnnouncementModal from '@/app/components/announcements/AnnouncmentsModule';
import AnnounceList from '@/app/components/announcements/announceList';
import LeftNav from '@/app/components/common/left-nav/LeftNav';
import ShareEvents from '@/app/components/events/ShareEvents';
import Posts from '@/app/components/feed/post/posts';
import Share from '@/app/components/feed/share/Share';
import WhoToFollowList from '@/app/components/whoToFollow/WhoToFollowList';

const Page = () => {
    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <LeftNav />
                <div className='flex justify-start flex-col items-center' >
                    <Share />
                    <ShareEvents/>
                    <Posts />
                    <AnnouncementModal/>
                </div>
                <div className='flex flex-col gap-5 mt-4' >
                    <WhoToFollowList/>
                    <AnnounceList/>
                </div>
            </div>
        </div>
    );
};

export default Page;