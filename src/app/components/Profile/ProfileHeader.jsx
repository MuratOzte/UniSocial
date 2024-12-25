import Image from "next/image";
import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Tooltip } from "@mui/material";
import useLeftNav from "@/hooks/useLeftNav";
import Loading from "../common/Loading";

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

const ProfileHeader = () => {
  const { uidata, error, isLoading } = useLeftNav();
  console.log(uidata);
  const [gradient, setGradient] = useState("");

  useEffect(() => {
    setGradient(getRandomGradient());
  }, []);

  if (!uidata) {
    return <Loading />;
  }
  return (
    <div className="rounded-md px-8 pt-4">
      <div
        className={`w-full ring-2 ring-gray-200 relative h-60 bg-gradient-to-r ${gradient} flex justify-end items-end p-4 rounded-md`}
      >
        <div className="w-[500px] h-[200px] absolute left-4 top-[75px] rounded-md flex gap-5">
          {uidata.profilePicture ? (
            <Image
              src={uidata.profilePicture}
              width={200}
              height={20}
              className="text-gray-400 bg-white rounded-full shadow-md border-4 border-gray-300 "
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
        <div className="flex gap-6 justify-center items-center bg-white p-2 rounded-md mt-4 shadow-md">
          <Tooltip title="Facebook" arrow placement="bottom">
            <FaFacebook
              size={40}
              className="text-blue-500 cursor-pointer hover:text-blue-700 transition-all"
            />
          </Tooltip>
          <Tooltip title="Instagram" arrow placement="bottom">
            <AiFillInstagram
              size={45}
              className="text-red-500 cursor-pointer hover:text-red-700 transition-all"
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
