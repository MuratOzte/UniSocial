'use client';
import ProfileAbout from '@/app/components/Profile/ProfileAbout';
import ProfileHeader from '@/app/components/Profile/ProfileHeader';

const Page = () => {
    return (
        <>
            <div className="w-full">
                <ProfileHeader />
            </div>
            <div>
                <ProfileAbout />
            </div>
        </>
    );
};

export default Page;
