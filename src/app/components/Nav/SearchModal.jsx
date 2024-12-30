import { AnimatePresence, motion } from "framer-motion";
import SearchedUsers from "./SearchedUsers";
import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import ButtonLoading from "../common/ButtonLoading";
const SearchModal = ({ searchQuery }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const SearchUserFetch = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/search-user", {
        method: "POST",
        body: JSON.stringify({
          search: searchQuery,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setIsLoading(false);
      setUsers(data.users);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    SearchUserFetch();
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 400 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-14 right-0 z-50 w-96 bg-main1 shadow-lg rounded-md px-6 overflow-auto overflow-x-hidden"
      >
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 my-4 text-xl bg-main1 h-2/3 justify-center text-gray-200 px-4 py-2 items-center cursor-pointer rounded-md"
          >
            <ButtonLoading size={50}/>
          </motion.div>
        )}
        {users.map((user, index) => (
          <SearchedUsers
            index={index}
            key={user.id}
            userId={user.id}
            name={user.name}
            surname={user.surname}
            profilePicture={user.profilePicture}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
