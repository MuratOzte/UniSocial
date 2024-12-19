'use client';
import Nav from '@/app/components/Nav/Nav';
import ProfileAbout from '@/app/components/Profile/ProfileAbout';
import ProfileHeader from '@/app/components/Profile/ProfileHeader';
import ProfilePosts from '@/app/components/Profile/ProfilePosts';

const Page = () => {
    return (
        <>
            <Nav />
            <div className="w-full">
                <ProfileHeader />
            </div>
            <div className="flex">
                <ProfileAbout />
                <ProfilePosts />
            </div>
        </>
    );
};

export default Page;
