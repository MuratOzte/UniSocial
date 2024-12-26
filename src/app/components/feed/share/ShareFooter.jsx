import feedSlice from '@/store/Slices/FeedSlice';
import uiSlice from '@/store/Slices/uiSlice';
import { FaImage } from 'react-icons/fa6';
import { MdOutlineEventNote } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { MdAnnouncement } from 'react-icons/md';
import { useEffect, useState } from 'react';

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
        setIsCommintity(localStorage.getItem('isCommuinty'));
        setIsTeacher(localStorage.getItem('isTeacher'));
    }, []);

    return (
        <div className="flex items-center justify-evenly relative">
            <div className="w-full h-[1px] bg-gray-300 absolute -top-2 rounded-full" />
            <button
                onClick={uploadFileModalHandler}
                className="flex items-center px-4 py-2 mt-2 text-maintext font-semibold"
            >
                <FaImage className="mr-2 " size={24} color="green" />
                Photo
            </button>
            {IsCommintity && (
                <button
                    className="flex items-center px-4 py-2 mt-2 text-maintext font-semibold"
                    onClick={ShareModalOpenHandler}
                >
                    <MdOutlineEventNote className="mr-2" color='blue' size={24} />
                    Event
                </button>
            )}
            {isTeacher && (
                <button
                    className="flex items-center px-4 py-2 mt-2 text-maintext font-semibold"
                    onClick={AnounceModalOpenHandler}
                >
                    <MdAnnouncement className="mr-2" color='purple' size={24} />
                    Announcement
                </button>
            )}
        </div>
    );
};

export default ShareFooter;
