"use client";

import { use } from "react";
import { useProfileHeader, useUserPosts } from "@/hooks/useProfile";
import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import Nav from "@/app/components/Nav/Nav";
import ProfilePosts from "@/app/components/Profile/ProfilePosts";

const Page = ({ params }) => {
  const { id: userId } = use(params);

  const {data,error,isValidating,refreshProfileHeader} = useProfileHeader(userId);
  const {posts}=useUserPosts()
  console.log(data);
  console.log(posts)
  if (error) return <div>Error: {error.message}</div>;

  if(!posts){
    return <Loading/>
  }
  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <Nav />
      <div className="w-full">
        <ProfileHeader uidata={data.userData} />

      </div>
      <div className="flex justify-between mt-8 mx-8">
        <ProfilePosts
        error={error}
        isValidating={isValidating}
        posts={posts}
        refreshPosts={refreshProfileHeader}
        />
      </div>
    </>
  );
};

export default Page;
