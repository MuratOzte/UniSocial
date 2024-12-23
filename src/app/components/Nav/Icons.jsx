import { Tooltip } from '@mui/material';

const Icons = ({ title, icon, onClick }) => {
    return (
        <Tooltip title={title} arrow placement="bottom" onClick={onClick}>
            <span className="w-12 h-12 flex justify-center items-center p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white cursor-pointer transform transition-all hover:scale-110 hover:rotate-12 duration-300 hover:shadow-lg hover:from-indigo-600 hover:to-blue-600">
                {icon}
            </span>
        </Tooltip>
    );
};

export default Icons;
