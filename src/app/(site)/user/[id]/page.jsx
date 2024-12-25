"use client";

import { use } from "react";
import { useProfileHeader } from "@/hooks/useProfile";
import ProfileHeader from "@/app/components/Profile/ProfileHeader";
import Nav from "@/app/components/Nav/Nav";

const Page = ({ params }) => {
  const { id: userId } = use(params);

  const { data, isLoading, error } = useProfileHeader(userId);
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Nav />
      <div className="w-full">
        <ProfileHeader uidata={data.userData} />
      </div>
      <div className="flex justify-between mt-8 mx-8"></div>
    </>
  );
};

export default Page;
