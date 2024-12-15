import { PiStudent } from 'react-icons/pi';
import { TbSchool } from 'react-icons/tb';
import { VscAccount } from 'react-icons/vsc';

const PostHeader = ({ post, time, isTeacher }) => {
    return (
        <div className="flex items-center mb-4">
            {!post.image && (
                <VscAccount className="w-8 h-8 rounded-full mr-3" />
            )}
            {post.image && (
                <img
                    src={post.image}
                    alt={`${post.author.name}'s avatar`}
                    className="w-12 h-12 rounded-full mr-3"
                />
            )}

            <div>
                <div className="text-sm text-gray-400 flex flex-row items-center">
                    <p className="font-semibold">{post.author.name}</p>
                    {isTeacher ? (
                        <PiStudent className="ml-2" />
                    ) : (
                        <TbSchool className="ml-2" />
                    )}
                </div>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
            <div className="ml-auto text-gray-500 cursor-pointer">...</div>
        </div>
    );
};

export default PostHeader;
