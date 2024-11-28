import { IoHomeOutline } from 'react-icons/io5';
import { FaMasksTheater } from 'react-icons/fa6';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineEventNote } from 'react-icons/md';

const buttons = [
    {
        icon: <IoHomeOutline />,
        text: 'Home',
    },
    {
        icon: <FaMasksTheater />,
        text: 'Clubs',
    },
    {
        icon: <MdOutlineEventNote />,
        text: 'Events',
    },
    {
        icon: <FaPeopleGroup />,
        text: 'Contacts',
    },
];

const Buttons = () => {
    return (
        <div className="flex flex-col bg-gray-800 pt-4 pb-2 rounded-bl-md rounded-br-md">
            <div className="w-[300px] h-[1px] bg-gray-400 my-3 mt-0 mx-6" />{' '}
            {buttons.map((button, index) => (
                <div
                    key={index}
                    className="relative flex items-center justify-start w-[350px] h-12 p-4 bg-gray-800 cursor-pointer group hover:text-white px-6 text-gray-300"
                >
                    <div className="text-xl mr-4 z-50">{button.icon}</div>
                    <p className="text-lg font-medium z-50 leading-tight px-2">
                        {button.text}
                    </p>

                    <div className="absolute left-0 bottom-0 w-0 h-12 bg-blue-500 transition-all group-hover:w-full"></div>
                </div>
            ))}
        </div>
    );
};

export default Buttons;
