import { Tooltip } from '@mui/material';
import { PiStudent } from 'react-icons/pi';
import { TbSchool } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';
import PostOptions from './PostOptions';
import { PiStudentBold } from "react-icons/pi";
import { FaPeopleRoof } from "react-icons/fa6";

const PostHeader = ({ post, time, isTeacher }) => {
    const isCommunity = isTeacher === undefined;
       

    return (
        <div className="flex items-center mb-4">
            {!post.author.profilePicture && (
                <VscAccount className="w-8 h-8 rounded-full mr-3" />
            )}
            {post.author.profilePicture && (
                <img
                    src={post.author.profilePicture}
                    alt={`${post.author.name}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                />
            )}

            <div className="w-full">
                <div className="text-sm text-gray-400 flex flex-row items-center justify-between w-full">
                    <div className="flex">
                        <p className="font-semibold">{post.author.name}</p>
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
                    <PostOptions post={post} />
                </div>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default PostHeader;
