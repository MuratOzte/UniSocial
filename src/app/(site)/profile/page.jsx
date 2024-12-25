'use client';
import Loading from '@/app/components/common/Loading';
import Nav from '@/app/components/Nav/Nav';
import ProfileAbout from '@/app/components/Profile/ProfileAbout';
import ProfileHeader from '@/app/components/Profile/ProfileHeader';
import ProfileLinks from '@/app/components/Profile/ProfileLinks';
import ProfilePosts from '@/app/components/Profile/ProfilePosts';
import useLeftNav from '@/hooks/useLeftNav';

const Page = () => {
  const { uidata, error, isLoading } = useLeftNav();
if(!uidata){
    return <Loading/>
}
    return (
        <>
            <Nav />
            <div className="w-full">
                <ProfileHeader  
                    uidata={uidata}
                />
            </div>
            <div className="flex justify-between mt-8 mx-8">
                <ProfileAbout />
                <ProfilePosts />
                <ProfileLinks />
            </div>
        </>
    );
};

export default Page;
