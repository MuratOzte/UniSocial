"use client";
import Loading from "@/app/components/common/Loading";
import Nav from "@/app/components/Nav/Nav";
import ProfileAbout from "@/app/components/Profile/ProfileAbout";
import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import ProfileLinks from "@/app/components/Profile/ProfileLinks";
import ProfilePosts from "@/app/components/Profile/ProfilePosts";
import useLeftNav from "@/hooks/useLeftNav";
import { useProfilePosts } from "@/hooks/useProfilePosts";

const Page = () => {
  const { error, isValidating, posts, refreshPosts } = useProfilePosts();
  const { uidata} = useLeftNav();
  if(!posts){
    return <Loading/>
  }
  if (!uidata) {
    return <Loading />;
  }
  return (
    <>
      <Nav />
      <div className="w-full">
        <ProfileHeader uidata={uidata} />
      </div>
      <div className="flex justify-between mt-8 mx-8">
        <ProfileAbout />
        <ProfilePosts
        error={error}
        isValidating={isValidating}
        posts={posts}
        refreshPosts={refreshPosts}
         />
        <ProfileLinks />
      </div>
    </>
  );
};

export default Page;
