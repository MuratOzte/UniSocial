"use client";
import Loading from "../common/Loading";
import { useCommunities } from "@/hooks/useCommunities";
import { useEffect, useState } from "react";
import WhoToFollowCard from "./WhoToFollowCard";

const WhoToFollowList = () => {
  const { clubs, error, isLoading } = useCommunities();

  useEffect(() => {
    if (clubs.length > 0) {
      setFilteredClubs(clubs);
    }
  }, [clubs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-fit max-w-sm p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Who to follow</h3>

      {filteredClubs &&
        filteredClubs.map((WhoToFollow) => (
          <WhoToFollowCard id={""} avatar={""} name={""} role={""} />
        ))}
    </div>
  );
};

export default WhoToFollowList;
