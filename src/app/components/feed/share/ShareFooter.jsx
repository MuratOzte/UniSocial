import feedSlice from "@/store/Slices/FeedSlice";
import uiSlice from "@/store/Slices/uiSlice";
import { FaImage } from "react-icons/fa6";
import {  MdOutlineEventNote } from "react-icons/md";
import { useDispatch } from "react-redux";
import { MdAnnouncement } from "react-icons/md";

const ShareFooter = ({ uploadFileModalHandler }) => {
  const dispatch = useDispatch();
  const ShareModalOpenHandler = () => {
    dispatch(feedSlice.actions.OpenShareModalChangeHandler(true));
  };
  const AnounceModalOpenHandler = () => {
    dispatch(uiSlice.actions.IsAnnouncementModuleOpenedChangeHandler(true));
  };
  return (
    <div className="flex items-center justify-evenly">
      <button
        onClick={uploadFileModalHandler}
        className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
      >
        <FaImage className="mr-2" />
        Photo/Video
      </button>
      <button
        className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        onClick={ShareModalOpenHandler}
      >
        <MdOutlineEventNote className="mr-2" />
        Event
      </button>
      <button
        className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
        onClick={AnounceModalOpenHandler}
      >
        <MdAnnouncement className="mr-2" />
        Announcement
      </button>
    </div>
  );
};

export default ShareFooter;
