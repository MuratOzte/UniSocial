import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

const WhoToFollow = () => {
    const [following, setFollowing] = useState([]);

    const users = [
        { id: 1, name: "Frances Guerrero", role: "News anchor", avatar: "https://via.placeholder.com/40" },
        { id: 2, name: "Lori Ferguson", role: "Web Developer", avatar: "https://via.placeholder.com/40" },
        { id: 3, name: "Samuel Bishop", role: "News anchor", avatar: "https://via.placeholder.com/40" },
        { id: 4, name: "Dennis Barrett", role: "Web Developer", avatar: "https://via.placeholder.com/40" },
        { id: 5, name: "Judy Nguyen", role: "News anchor", avatar: "https://via.placeholder.com/40" },
    ];

    const toggleFollow = (id) => {
        setFollowing((prev) =>
            prev.includes(id.toString())
                ? prev.filter((userId) => userId !== id.toString())
                : [...prev, id.toString()]
        );
    };

    return (
        <div className="w-full h-fit max-w-sm p-4 bg-gray-800 text-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Who to follow</h3>
            <ul>
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="flex items-center justify-between mb-4 last:mb-0"
                    >
                        <div className="flex items-center">
                            <img
                                src={user.avatar}
                                alt={`${user.name}'s avatar`}
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => toggleFollow(user.id)}
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                following.includes(user.id.toString())
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-700 text-white hover:bg-gray-600"
                            }`}
                        >
                            {following.includes(user.id.toString()) ? (
                                <FaUserCheck />
                            ) : (
                                <IoMdAdd size={20}/>
                            )}
                        </button>
                    </li>
                ))}
            </ul>
            <button className="mt-4 w-full py-2 text-blue-500 font-medium hover:underline">
                View more
            </button>
        </div>
    );
};

export default WhoToFollow;
