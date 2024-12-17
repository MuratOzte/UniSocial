import { useState, useEffect } from 'react';
import { IoIosSend } from 'react-icons/io';

import CommentModal from './CommentModal';
import EditPostModal from './EditPostModal';
import { timeAgo } from '@/util/timeService';
import { VscAccount } from 'react-icons/vsc';
import { PiStudent } from 'react-icons/pi';
import { TbSchool } from 'react-icons/tb';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';

const Event = ({ event }) => {
    const [showModal, setShowModal] = useState(false);
    const time = timeAgo(event.createdAt);
    const isTeacher = event.author.isTeacher;
    console.log(time);

    const comments = [
        {
            id: 1,
            name: 'Samuel Bishop',
            text: 'Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.',
            time: '5 hours ago',
            likes: 3,
        },
        {
            id: 2,
            name: 'Dennis Barrett',
            text: 'See resolved goodness felicity shy civility domestic had but Drawings offended yet answered Jennings perceive.',
            time: '2 hours ago',
            likes: 5,
        },
        {
            id: 3,
            name: 'Lori Ferguson',
            text: 'Wishing calling is warrant settled was lucky.',
            time: '15 minutes ago',
            likes: 0,
        },
    ];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowModal(false);
            }
        };

        if (showModal) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [showModal]);

    return (
        <div className="w-full max-w-lg bg-gray-800 text-white p-4 rounded-lg shadow-lg my-8">
            <PostHeader event={event} time={time} isTeacher={isTeacher} />

            <p className="mb-4">{event.content}</p>

            {event.image && (
                <img
                    src={event.image}
                    alt="Post content"
                    className="w-full rounded-lg mb-4"
                />
            )}

            <PostFooter setShowModal={setShowModal} event={event} />
            <CommentModal
                showModal={showModal}
                comments={comments}
                setShowModal={setShowModal}
            />
        </div>
    );
};

export default Event;
