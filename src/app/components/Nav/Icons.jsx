import { Tooltip } from '@mui/material';

const Icons = ({ title, icon }) => {
    return (
        <Tooltip title={title} arrow>
            <span className='w-10 h-10 flex justify-center items-center p-2 bg-blue-200 rounded-md text-indigo-800 cursor-pointer hover:scale-105 duration-200 transition-all hover:bg-blue-300' >{icon}</span>
        </Tooltip>
    );
};

export default Icons;
