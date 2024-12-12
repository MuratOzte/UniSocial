import { TbSend } from 'react-icons/tb';
import { FaImage } from 'react-icons/fa';
import { MdOutlineEventNote } from 'react-icons/md';
import { MdEmojiEmotions } from 'react-icons/md';
import { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import feedSlice from '@/store/Slices/FeedSlice';

const Share = () => {
    const dispatch=useDispatch();
    const feed=useSelector((state)=>state.feed);

    const inputValChangeHandler=(e)=>{

        dispatch(feedSlice.actions.shareMessageChangeHandler(e.currentTarget.value));
    }
    

    return (
        <div className="w-full max-w-md p-4 h-fit rounded-lg shadow-lg bg-gray-800 text-white mt-4">
            <div className="flex items-center mb-4 relative">
                <Image
                    src={
                        'https://media-ist1-1.cdn.whatsapp.net/v/t61.24694-24/397884028_1042568196864685_3091923269807243330_n.jpg?ccb=11-4&oh=01_Q5AaIKQmUOCzd8T27xRaE1xk6hv1larJdXmoCzMxBD7ZMq3A&oe=67557ECD&_nc_sid=5e03e0&_nc_cat=101'
                    }
                    alt='avatar'
                    width={50}
                    height={50}
                    className="rounded-full mr-4"
                />
                <input
                    value={feed.shareMessage}
                    type="text"
                    onChange={inputValChangeHandler}
                    placeholder="Share your thoughts..."
                    className="flex-1 bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <TbSend className="ml-2 cursor-pointer" size={24} />
            </div>

            <div className="flex items-center justify-evenly">
                <button className="flex items-center px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600">
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
