"use client";
import { timeAgo } from "@/util/timeService";
import Loading from "../common/Loading";
import AnnounceCard from "./announceCard";
import { useAnnouncments } from "@/hooks/useAnnouncements";

const AnnounceList = () => {
  const { announcments, isLoading, error } = useAnnouncments();

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
    <div className="w-full max-w-sm bg-main1 text-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Duyurular</h2>
      {announcments.length < 1 && <p>Herhangi bir duyuru paylaşılmamış</p>}
      {announcments &&
        announcments.map((announcment, index) => (
          <AnnounceCard
            key={"cardas" + index}
            author={announcment.author.name + " " + announcment.author.surname}
            title={announcment.content}
            time={timeAgo(announcment.createdAt)}
            index={index}
          />
        ))}
    </div>
  );
};

export default AnnounceList;
