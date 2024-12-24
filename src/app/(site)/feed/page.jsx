'use client';

import ShareEvents from '@/app/components/events/ShareEvents';
import LeftNav from '@/app/components/common/left-nav/LeftNav';
import NewsSection from '@/app/components/feed/news/news';
import Post from '@/app/components/feed/post/post';
import Posts from '@/app/components/feed/post/posts';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';
import AnnouncementModal from '@/app/components/announcements/AnnouncmentsModule';
import AnnounceList from '@/app/components/announcements/announceList';
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