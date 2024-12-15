import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions, MdOutlineEventNote } from "react-icons/md";

const ShareFooter = ({ uploadFileModalHandler }) => {
    return (
        <div className="flex items-center justify-evenly">
            <button
                onClick={uploadFileModalHandler}
                className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
                <FaImage className="mr-2" />
                Photo/Video
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                <MdOutlineEventNote className="mr-2" />
                Event
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                <MdEmojiEmotions className="mr-2" />
                Activity
            </button>
        </div>
    );
};

export default ShareFooter;
