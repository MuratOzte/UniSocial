'use client';

import { use } from 'react';
import { useProfileHeader, useUserPosts } from '@/hooks/useProfile';
import Nav from '@/app/components/Nav/Nav';
import ProfilePosts from '@/app/components/Profile/ProfilePosts';
import UserProfileHeader from '@/app/components/User/UserProfile';
import About from '@/app/components/User/About';
import ProfileLinks from '@/app/components/User/Links';

const Page = ({ params }) => {
    const { id: userId } = use(params);

    const { data, error, isValidating, refreshProfileHeader } =
        useProfileHeader(userId);
    const { posts } = useUserPosts();
    console.log(data);
    console.log(posts);
    if (error) return <div>Error: {error.message}</div>;

    if (!posts) {
        return <Loading />;
    }

    return (
        <>
            <Nav />
            <div className="w-full">
                <UserProfileHeader uidata={data.userData} />
            </div>
            <div className="flex justify-between mt-8 mx-8">
                <About userId={userId} />
                <ProfilePosts
                    error={error}
                    isValidating={isValidating}
                    posts={posts}
                    refreshPosts={refreshProfileHeader}
                />
                <ProfileLinks userId={userId} />
            </div>
        </>
    );
};

export default Page;
