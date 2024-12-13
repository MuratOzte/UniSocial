import { TbSend } from 'react-icons/tb';
import { FaImage } from 'react-icons/fa';
import { MdOutlineEventNote } from 'react-icons/md';
import { MdEmojiEmotions } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import feedSlice from '@/store/Slices/FeedSlice';
import { sharePostRequest } from '@/util/feedService';
import FileUploadModal from './FileUploadModal';

const Share = () => {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [file, setFile] = useState(null);
    const [base64File, setBase64File] = useState(null);

    const inputValChangeHandler = (e) => {
        dispatch(
            feedSlice.actions.shareMessageChangeHandler(e.currentTarget.value)
        );
    };

    const sharePostHandler = async () => {
        const data = await sharePostRequest(
            token,
            feed.shareMessage,
            base64File
        );
        console.log(data);
    };

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            sharePostHandler();
        }
    };

    const uploadFileModalHandler = () => {
        dispatch(feedSlice.actions.setIsFileUploadModalOpen(true));
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64File(reader.result); 
            };
            reader.readAsDataURL(file); 
        } else {
            setBase64File(null); 
        }
    }, [file]);

    return (
        <div className="w-full max-w-md p-4 h-fit rounded-lg shadow-lg bg-gray-800 text-white mt-4">
            <div className="flex items-center mb-4 relative">
                <Image
                    src={
                        'https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_Q5AaIKQmUOCzd8T27xRaE1xk6hv1larJdXmoCzMxBD7ZMq3A&oe=67557ECD&_nc_sid=5e03e0&_nc_cat=101'
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                />
                <input
                    value={feed.shareMessage}
                    type="text"
                    onKeyDown={keyPressHandler}
                    onChange={inputValChangeHandler}
                    placeholder="Share your thoughts..."
                    className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <TbSend
                    className="ml-2 cursor-pointer"
                    onClick={sharePostHandler}
                    size={24}
                />
            </div>
            <FileUploadModal file={file} setFile={setFile} />

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
        </div>
    );
};

export default Share;
