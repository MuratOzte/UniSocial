import feedSlice from "@/store/Slices/FeedSlice";
import uiSlice from "@/store/Slices/uiSlice";
import { FaImage } from "react-icons/fa6";
import { MdOutlineEventNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import { MdAnnouncement } from "react-icons/md";
import { useEffect, useState } from "react";

const ShareFooter = ({ uploadFileModalHandler }) => {
  const [IsCommintity, setIsCommintity] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const dispatch = useDispatch();
  const ShareModalOpenHandler = () => {
    dispatch(feedSlice.actions.OpenShareModalChangeHandler(true));
  };
  const AnounceModalOpenHandler = () => {
    dispatch(uiSlice.actions.IsAnnouncementModuleOpenedChangeHandler(true));
  };
  useEffect(() => {
    setIsCommintity(localStorage.getItem("isCommuinty"));
    setIsTeacher(localStorage.getItem("isTeacher"));
  }, []);

  return (
    <div className="flex items-center justify-evenly">
      <button
        onClick={uploadFileModalHandler}
        className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        <FaImage className="mr-2" />
        Photo
      </button>
      {IsCommintity && (
        <button
          className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          onClick={ShareModalOpenHandler}
        >
          <MdOutlineEventNote className="mr-2" />
          Event
        </button>
      )}
      {isTeacher && (
        <button
          className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          onClick={AnounceModalOpenHandler}
        >
          <MdAnnouncement className="mr-2" />
          Announcement
        </button>
      )}
    </div>
  );
};

export default ShareFooter;
