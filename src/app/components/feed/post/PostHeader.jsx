import { PiStudent } from 'react-icons/pi';
import { TbSchool } from 'react-icons/tb';
import { IoBookSharp } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import { Tooltip } from '@mui/material';
import { CiMenuKebab } from 'react-icons/ci';
import PostOptions from './PostOptions';

const PostHeader = ({ post, time, isTeacher }) => {
    console.log('denee', post, time, isTeacher);
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
                        {isTeacher ? (
                            <Tooltip title="Teacher" arrow>
                                <IoBookSharp className="ml-2" />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Student" arrow>
                                <PiStudent className="ml-2" />
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
