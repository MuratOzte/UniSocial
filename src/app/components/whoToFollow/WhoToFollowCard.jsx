import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import Image from "next/image";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useProfileHeader } from "@/hooks/useProfile";
import { useWhoToFollow } from "@/hooks/useWhoToFollow";

const WhoToFollowCard = ({ id, avatar, name, role, userId }) => {
  const router = useRouter();
  const [following, setFollowing] = useState(false);

  const VisitUser = () => {
    router.replace(`/user/${userId}`);
  };

  const { refreshWhotoFollow } = useWhoToFollow();

  const FollowButton = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/toggle-follow", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followingId: userId }),
      });
      const buffer = await response.json();
      console.log(buffer);

      setFollowing((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <ul>
        <li
          key={id}
          className="flex items-center justify-between mb-4 last:mb-0"
        >
          <div className="flex items-center">
            {avatar ? (
              <Image
                src={avatar}
                alt={`${name}'s avatar`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
            ) : (
              <MdAccountCircle className="w-10 h-10 rounded-full mr-3  text-blue-400" />
            )}

            <div
              onClick={VisitUser}
              className="cursor-pointer hover:text-gray-800 transition-all duration-150"
            >
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-400">{role}</p>
            </div>
          </div>
          <button
            onClick={FollowButton}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              following
                ? "bg-blue-500 text-white"
                : "bg-gray-400 text-white hover:bg-gray-500 transition-all duration-150"
            }`}
          >
            {following ? <FaUserCheck /> : <IoMdAdd size={20} />}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WhoToFollowCard;
