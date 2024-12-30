import { Tooltip } from "@mui/material";
import { PiStudent } from "react-icons/pi";
import { TbSchool } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import PostOptions from "./PostOptions";
import { PiStudentBold } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

const PostHeader = ({ post, time, isTeacher, isOptimistic }) => {
  const isCommunity = isTeacher === undefined;

  return (
    <div className="flex items-center mb-4 w-full">
      <Link href={"user/" + post.author.id} className="flex">
        {post.author.profilePicture && !isOptimistic ? (
          <Image
            className="w-10 h-10 rounded-full mr-3 bg-gray-500 border-2 border-gray-400 "
            alt={"pp"}
            src={post.author.profilePicture}
            width={60}
            height={60}
          />
        ) : (
          <VscAccount className="w-12 h-8 rounded-full mr-3 bg-gray-500 border-2 border-gray-400 " />
        )}

        <div className="w-full relative">
          <div className="text-sm text-gray-400 flex flex-row items-center justify-between w-full">
            <div className="flex justify-center items-center">
              <p className="font-semibold text-gray-700 text-lg">
                {post.author.name}
              </p>
              {isTeacher && (
                <Tooltip title="Teacher" arrow>
                  <TbSchool className="text-lg text-blue-500 ml-1" />
                </Tooltip>
              )}
              {!isTeacher && !isCommunity && (
                <Tooltip title="Student" arrow>
                  <PiStudent className="text-lg text-blue-500 ml-1" />
                </Tooltip>
              )}
              {isCommunity && (
                <Tooltip title="Community" arrow>
                  <FaPeopleRoof className="text-lg text-blue-500 ml-1" />
                </Tooltip>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-800">{time}</p>
        </div>
      </Link>
      <div className="absolute right-12 top-5" >{post.isYourPost && <PostOptions post={post} />}</div>
    </div>
  );
};

export default PostHeader;
