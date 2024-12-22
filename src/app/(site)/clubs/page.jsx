'use client';

import Nav from '@/app/components/Nav/Nav';
import Calendar from '@/app/components/events/calendar';
import ShareEvents from '@/app/components/events/ShareEvents';
import LeftNav from '@/app/components/common/left-nav/LeftNav';
import EventsList from '@/app/components/events/EventsList';
import ClubCard from '@/app/components/clubs/clubsCard';
import ClubList from '@/app/components/clubs/clubsList';
import JoinedCommunities from '@/app/components/clubs/joinedCommunites';

const Page = () => {
    

    return (
        <div>
            <Nav />
            <div className="flex justify-between px-8">
                <LeftNav />
                <div className="flex justify-start flex-col items-center">
                    <ClubList />
                </div>
                <div className="flex flex-col gap-5 mt-4">
                    <JoinedCommunities/>
                </div>
            </div>
        </div>
    );
};

export default Page;
