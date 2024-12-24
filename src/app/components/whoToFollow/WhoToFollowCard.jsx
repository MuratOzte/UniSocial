import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";

const WhoToFollowCard = ({ id, avatar, name, role }) => {
  const [following, setFollowing] = useState([]);

  const users = [
    {
      id: 1,
      name: "Frances Guerrero",
      role: "News anchor",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Lori Ferguson",
      role: "Web Developer",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Samuel Bishop",
      role: "News anchor",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "Dennis Barrett",
      role: "Web Developer",
      avatar: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      name: "Judy Nguyen",
      role: "News anchor",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const toggleFollow = (id) => {
    setFollowing((prev) =>
      prev.includes(id.toString())
        ? prev.filter((userId) => userId !== id.toString())
        : [...prev, id.toString()]
    );
  };

  return (
    <div>
      <ul>
        <li
          key={id}
          className="flex items-center justify-between mb-4 last:mb-0"
        >
          <div className="flex items-center">
            <img
              src={avatar}
              alt={`${name}'s avatar`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-400">{user.role}</p>
            </div>
          </div>
          <button
            onClick={() => toggleFollow(id)}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              following.includes(id.toString())
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {following.includes(id.toString()) ? (
              <FaUserCheck />
            ) : (
              <IoMdAdd size={20} />
            )}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WhoToFollowCard;
