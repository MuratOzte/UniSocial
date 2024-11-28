'use client'

import LeftNav from '@/app/components/feed/left-nav/LeftNav';
import Share from '@/app/components/feed/share/Share';
import WhoToFollow from '@/app/components/feed/wtfollow/wtFollow';
import Nav from '@/app/components/Nav/Nav';

const Page = () => {
    return (
        <div>
            <Nav />
            <div className='flex' >
                <LeftNav />
                <Share />
                <WhoToFollow />
            </div>
        </div>
    );
};

export default Page;
