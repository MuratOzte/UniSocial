import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useClubs, useEvents } from "@/hooks/useFetchEvents";
import { useDispatch, useSelector } from "react-redux";

const ClubList = () => {
  const dispatch = useDispatch();
  const { clubs = [], isValidating, error } = useClubs();

  
  if (isValidating) {
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
    <div className="p-6 space-y-4">
      {clubs.map((club) => (
        <ClubtCard key={club.id} name={club.name} description={club.description} type={club.type} image={club.image} university={club.university} />
      ))}
    </div>
  );
};

export default ClubList;
