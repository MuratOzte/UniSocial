'use client';

import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import Post from '@/app/components/feed/post/post';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';

const Page = () => {
    return (
        <div>
            <Nav />
            <div className="flex">
                <LeftNav />
                <div>
                    <Share />
                    <Post />
                </div>
                <WhoToFollow />
            </div>
        </div>
    );
};

export default Page;
