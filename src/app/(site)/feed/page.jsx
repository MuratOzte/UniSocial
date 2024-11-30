'use client';

import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import NewsSection from '@/app/components/feed/news/news';
import Post from '@/app/components/feed/post/post';
import Posts from '@/app/components/feed/post/posts';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';

const Page = () => {
    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <LeftNav />
                <div className='flex justify-center flex-col items-center' >
                    <Share />
                    <Posts />
                </div>
                <div>
                    <WhoToFollow />
                    <NewsSection />
                </div>
            </div>
        </div>
    );
};

export default Page;
