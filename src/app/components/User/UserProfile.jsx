import Image from "next/image";
import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { Tooltip } from "@mui/material";
import Loading from "../common/Loading";
import ButtonLoading from "../common/ButtonLoading";

const getRandomGradient = () => {
  const colors = [
    "to-r from-purple-400 via-pink-500 to-red-500",
    "to-r from-green-400 via-blue-500 to-purple-600",
    "to-r from-yellow-400 via-orange-500 to-red-500",
    "to-r from-indigo-500 via-purple-600 to-pink-600",
    "to-r from-teal-400 via-cyan-500 to-blue-600",
    "to-r from-gray-600 via-gray-700 to-black",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const UserProfileHeader = ({ uidata, userId }) => {
  const [gradient, setGradient] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [token, setToken] = useState();
  const [error, setError] = useState();
  console.log(uidata);

  useEffect(() => {
    if (uidata) {
      setIsFollowed(uidata.isFollowing);
    }
  }, [uidata]);
  useEffect(() => {
    setGradient(getRandomGradient());
    setToken(localStorage.getItem("token"));
  }, []);

  const toggleFollow = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/toggle-follow", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followingId: userId }),
      });
      const buffer = await response.json();
      console.log(buffer);

      setIsFollowed((prev) => !prev);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!uidata) {
    return <Loading />;
  }

  return (
    <div className="rounded-md px-8 pt-4">
      <div
        className={`w-full ring-2 ring-gray-200 relative h-60 bg-gradient-to-r ${gradient} flex justify-end items-end p-4 rounded-md `}
      >
        <div className="w-[500px] h-[200px] absolute left-4 top-[75px] rounded-md flex gap-5">
          {uidata.profilePicture ? (
            <Image
              src={uidata.profilePicture}
              alt="Profile Picture"
              width={200}
              height={200}
              className="text-gray-400 bg-white rounded-full shadow-md border-4 border-gray-300"
            />
          ) : (
            <MdAccountCircle
              size={200}
              className="text-gray-400 bg-white rounded-full shadow-md"
            />
          )}
          <div className="flex flex-col justify-center text-white space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              {uidata.name + " " + uidata.surname}
            </h1>
            <h2 className="text-xl font-semibold opacity-90">
              {uidata.department}
            </h2>
            <h3 className="text-lg opacity-80">{uidata.univercity}</h3>
          </div>
        </div>
        <button
          className="absolute bg-green-500 px-4 py-2 rounded-md text-white font-semibold shadow-md bottom-4 right-4 hover:bg-green-600 transition duration-150"
          onClick={toggleFollow}
        >
          {isLoading ? <ButtonLoading /> : isFollowed ? "Takip Et" : "Takipten Çık"}
        </button>
      </div>
    </div>
  );
};

export default UserProfileHeader;
