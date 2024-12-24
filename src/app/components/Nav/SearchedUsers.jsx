import { motion } from "framer-motion";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Loading from "../common/Loading";
import { useRouter } from "next/navigation";

const SearchedUsers = ({ profilePicture, name, surname, index,userId}) => {
    const router=useRouter();
  if (!profilePicture && !name && !surname) return null;
  const GoToUserPage=()=>{
    router.replace(`/user/${userId}`)
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="flex gap-4 my-4 text-xl bg-gray-500 text-gray-200 px-4 py-2 items-center cursor-pointer rounded-md"
      onClick={GoToUserPage}
    >
      {profilePicture ? (
        <Image
          src={profilePicture}
          alt={name}
          width={50}
          height={50}
          className="rounded-full border border-gray-300"
        />
      ) : (
        <FaUserCircle size={50} />
      )}
      <p>
        {name} {"  "}
        {surname}{" "}
      </p>
    </motion.div>
  );
};

export default SearchedUsers;
